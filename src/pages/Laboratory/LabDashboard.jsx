import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space, Tooltip, Empty } from 'antd';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Typography, Card, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import { Visibility, Edit, CloudUpload, Search } from '@mui/icons-material';
import { fetchlab } from '../../backend/slice/lab_mangment/fetchAll';
import { ExportFile, resetUploadState } from '../../backend/slice/lab_mangment/upload';
import { resetStatusState } from '../../backend/slice/lab_mangment/updatestatus'; // استيراد أكشن الريسيت لحالة التحديث

const AnalysisDetailsModal = lazy(() => import('./AnalysisDetailsModal'));
const StatusUpdateModal = lazy(() => import('./StatusUpdateModal'));

const LabDashboard = () => {
  const dispatch = useDispatch();
  
  const { data, isLoading, error } = useSelector((state) => state.fetchlab);
  const uploadState = useSelector((state) => state.ExportFile) || { isLoading: false, success: false, error: null };
  const statusState = useSelector((state) => state.Editestatus) || { isLoading: false, success: false, error: null }; // جلب حالة التحديث

  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const labMintColor = '#1B5E20';

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchlab({
        test_type: filterType,
        status: filterStatus,
        date: filterDate,
        search: searchQuery
      }));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [filterType, filterStatus, filterDate, searchQuery, dispatch]);

  // مراقبة نجاح أو فشل الرفع السريع وتحديث الحالة لفتح السناك بار بالرسالة المناسبة
  useEffect(() => {
    if (uploadState.success || uploadState.error || statusState.success || statusState.error) {
      setSnackbarOpen(true);
    }
  }, [uploadState.success, uploadState.error, statusState.success, statusState.error]);

  // دالة تُستدعى بعد نجاح التحديث لإعادة جلب السجلات من السيرفر
  const handleStatusUpdate = () => {
    dispatch(fetchlab({ test_type: filterType, status: filterStatus, date: filterDate, search: searchQuery }));
  };

  const handleFileChange = (e, analysisId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('result_file', file);
    formData.append('notes', 'تم رفع النتيجة بنجاح');

    dispatch(ExportFile({ id: analysisId, formData })).then(() => {
      dispatch(fetchlab({ test_type: filterType, status: filterStatus, date: filterDate, search: searchQuery }));
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    dispatch(resetUploadState());
    dispatch(resetStatusState()); // تصفير ستيت التحديث عند إغلاق التنبيه
  };

  const columns = [
    { title: 'رقم التحليل', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'اسم المريض', dataIndex: 'patient', key: 'patient', align: 'center', render: (patient) => patient?.full_name || 'غير معروف' },
    { title: 'اسم التحليل', dataIndex: 'test_name', key: 'test_name', align: 'center' },
    { title: 'نوع التحليل', dataIndex: 'test_type', key: 'test_type', align: 'center' },
    { title: 'التاريخ', dataIndex: 'ordered_at', key: 'ordered_at', align: 'center', render: (date) => date ? date.split('T')[0] : 'غير محدد' },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        let color = 'orange';
        let statusText = status;
        if (status === 'completed' || status === 'Completed') { color = 'green'; statusText = 'مكتمل'; }
        else if (status === 'pending') { color = 'blue'; statusText = 'قيد الانتظار'; }
        else if (status === 'In progress' || status === 'processing') { color = 'purple'; statusText = 'قيد التحليل'; }
        else if (status === 'cancelled') { color = 'red'; statusText = 'ملغي'; }
        return <Tag color={color} style={{ fontSize: '13px', padding: '2px 8px' }}>{statusText}</Tag>;
      },
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="عرض التفاصيل">
            <Button 
              size="small" 
              onClick={() => { setSelectedAnalysis(record); setOpenDetails(true); }}
              style={{ minWidth: 'auto', padding: 6, border: `1px solid ${labMintColor}`, borderRadius: '6px' }}
            >
              <Visibility fontSize="small" style={{ color: labMintColor }} />
            </Button>
          </Tooltip>
          <Tooltip title="تحديث الحالة">
            <Button 
              size="small" 
              onClick={() => { setSelectedAnalysis(record); setOpenUpdateStatus(true); }}
              style={{ minWidth: 'auto', padding: 6, border: `1px solid ${labMintColor}`, borderRadius: '6px' }}
            >
              <Edit fontSize="small" style={{ color: labMintColor }} />
            </Button>
          </Tooltip>
          
          <Tooltip title="رفع النتيجة">
            <Button 
              size="small" 
              component="label"
              style={{ minWidth: 'auto', padding: 6, border: `1px solid ${labMintColor}`, borderRadius: '6px' }}
            >
              <CloudUpload fontSize="small" style={{ color: labMintColor }} />
              <input type="file" hidden onChange={(e) => handleFileChange(e, record.id)} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Box p={3} dir="rtl">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" style={{ fontFamily: 'inherit', color: labMintColor }}>
          لوحة تحكم قسم المختبر والتحاليل
        </Typography>
        {(uploadState.isLoading || statusState.isLoading) && (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={20} style={{ color: labMintColor }} />
            <Typography variant="caption">جاري معالجة طلبك بالسيرفر...</Typography>
          </Box>
        )}
      </Box>

      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* قسم الفلاتر العلوي */}
      <Card variant="outlined" style={{ padding: 20, marginBottom: 25, borderRadius: '8px' }}>
         {/* ... (مكونات الفلاتر السابقة الخاصة بك تظل هنا كما هي) ... */}
      </Card>

      <style>{`
        .ant-table-wrapper .ant-table-thead > tr > th {
          background-color: ${labMintColor} !important;
          color: white !important;
          font-weight: bold !important;
          text-align: center !important;
        }
        .ant-table-wrapper .ant-table-tbody > tr > td {
          font-family: inherit !important;
        }
      `}</style>

      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={5} minHeight="200px">
          <CircularProgress style={{ color: labMintColor, marginBottom: 15 }} />
          <Typography variant="body1" color="textSecondary">جاري تحميل التحاليل المخبرية...</Typography>
        </Box>
      ) : !data || data.length === 0 ? (
        <Card variant="outlined" style={{ padding: 40, borderRadius: '8px', textAlign: 'center' }}>
          <Empty description="لا توجد طلبات تحاليل تطابق الفلاتر المحددة حالياً" />
        </Card>
      ) : (
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey={(record) => record.id || Math.random().toString()} 
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}

      {/* شريط الإشعارات المشترك لمعالجة الرسايل التنبيهية */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        {uploadState.success || statusState.success ? (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {statusState.success ? "تم تحديث حالة التحليل الطبي بنجاح!" : "تم رفع نتيجة التحليل بنجاح وتحديث السجلات!"}
          </Alert>
        ) : uploadState.error || statusState.error ? (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {statusState.error || uploadState.error}
          </Alert>
        ) : null}
      </Snackbar>

      <Suspense fallback={<Box display="flex" justifyContent="center" p={3}><CircularProgress style={{ color: labMintColor }} /></Box>}>
        {openDetails && (
          <AnalysisDetailsModal 
            open={openDetails} 
            onClose={() => setOpenDetails(false)} 
            data={selectedAnalysis} 
          />
        )}
        {openUpdateStatus && (
          <StatusUpdateModal 
            open={openUpdateStatus} 
            onClose={() => setOpenUpdateStatus(false)} 
            data={selectedAnalysis} 
            onUpdate={handleStatusUpdate} 
          />
        )}
      </Suspense>
    </Box>
  );
};

export default LabDashboard;
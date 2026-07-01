import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space, Tooltip, Empty } from 'antd';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Typography, Card, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import { Visibility, Edit, CloudUpload, Search } from '@mui/icons-material';
import { fetchlab } from '../../backend/slice/lab_mangment/fetchAll';
import { ExportFile, resetUploadState } from '../../backend/slice/lab_mangment/upload'; // استيراد السلايس الجديد

// استدعاء المودالات بطريقة التحميل الكسول
const AnalysisDetailsModal = lazy(() => import('./AnalysisDetailsModal'));
const StatusUpdateModal = lazy(() => import('./StatusUpdateModal'));

const LabDashboard = () => {
  const dispatch = useDispatch();
  
  // جلب حالات جلب البيانات
  const { data, isLoading, error } = useSelector((state) => state.fetchlab);
  
  // جلب حالات رفع التحاليل من السلايس الجديد
  const uploadState = useSelector((state) => state.ExportFile) || { isLoading: false, success: false, error: null };

  // حالات الفلاتر محلياً
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // لون الثيم النعناعي المخبري الموحد
  const labMintColor = '#1B5E20';

  // استدعاء الـ API عند تغيير الفلاتر أو البحث
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

  // مراقبة عمليات نجاح أو فشل الرفع لفتح الـ Snackbar التنبيهي
  useEffect(() => {
    if (uploadState.success || uploadState.error) {
      setSnackbarOpen(true);
    }
  }, [uploadState.success, uploadState.error]);

  const handleStatusUpdate = (id, newStatus) => {
    dispatch(fetchlab({ test_type: filterType, status: filterStatus, date: filterDate, search: searchQuery }));
  };

  // دالة معالجة اختيار الملف ورفعه ديناميكياً للتحليل المحدد
  const handleFileChange = (e, analysisId) => {
    const file = e.target.files[0];
    if (!file) return;

    // تجهيز الـ FormData بناءً على الـ Postman
    const formData = new FormData();
    formData.append('result_file', file);
    formData.append('notes', 'نتيجة الأشعة سليمة'); // يمكنك جعلها ديناميكية إن أردت

    // إرسال الطلب للسيرفر مع الـ ID المناسب
    dispatch(ExportFile({ id: analysisId, formData })).then(() => {
      // إعادة تحديث الجدول بعد الرفع الناجح
      dispatch(fetchlab({ test_type: filterType, status: filterStatus, date: filterDate, search: searchQuery }));
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    dispatch(resetUploadState()); // تصفير الحالة بعد إغلاق التنبيه
  };

  const columns = [
    { title: 'رقم التحليل', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'اسم المريض', dataIndex: 'patient_name', key: 'patient_name', align: 'center', render: (text, record) => record.patient?.name || text || 'غير معروف' },
    { title: 'نوع التحليل', dataIndex: 'test_type', key: 'test_type', align: 'center' },
    { title: 'التاريخ', dataIndex: 'created_at', key: 'created_at', align: 'center', render: (date) => date ? date.split('T')[0] : '' },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        let color = 'orange';
        let statusText = status;
        if (status === 'completed' || status === 'مكتمل') { color = 'green'; statusText = 'مكتمل'; }
        if (status === 'pending' || status === 'قيد الانتظار') { color = 'blue'; statusText = 'قيد الانتظار'; }
        if (status === 'cancelled' || status === 'ملغي') { color = 'red'; statusText = 'ملغي'; }
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
          
          {/* زر رفع مخصص لكل سطر بالجدول ليرسل الـ ID تلقائياً */}
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
      {/* رأس الصفحة */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" style={{ fontFamily: 'inherit', color: labMintColor }}>
          لوحة تحكم قسم المختبر والتحاليل
        </Typography>
        {uploadState.isLoading && (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={20} style={{ color: labMintColor }} />
            <Typography variant="caption">جاري رفع الملف للسيرفر...</Typography>
          </Box>
        )}
      </Box>

      {/* شريط الأخطاء العامة */}
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* قسم الفلاتر العلوي والبحث */}
      <Card variant="outlined" style={{ padding: 20, marginBottom: 25, borderRadius: '8px' }}>
        <Grid container spacing={3} alignItems="center">
          
          {/* حقل البحث العام */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="ابحث هنا (مثال: صدر)..."
              label="البحث العام"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search style={{ color: labMintColor, marginLeft: 8 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: searchQuery ? labMintColor : 'rgba(0, 0, 0, 0.23)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                '& .MuiInputLabel-root': { color: searchQuery ? labMintColor : 'inherit' },
                '& .MuiInputLabel-root.Mui-focused': { color: labMintColor }
              }}
            />
          </Grid>

          {/* الفلترة حسب نوع التحليل */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel style={{ color: filterType ? labMintColor : 'inherit' }} sx={{ '&.Mui-focused': { color: labMintColor } }}>
                الفلترة حسب النوع
              </InputLabel>
              <Select
                value={filterType}
                label="الفلترة حسب النوع"
                onChange={(e) => setFilterType(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: filterType ? labMintColor : 'rgba(0, 0, 0, 0.23)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                }}
              >
                <MenuItem value="">الكل</MenuItem>
                <MenuItem value="cbc">Cbc (تعداد دم)</MenuItem>
                <MenuItem value="xray">X-Ray (أشعة سينية)</MenuItem>
                <MenuItem value="liver">وظائف كبد</MenuItem>
                <MenuItem value="sugar">سكر عشوائي</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* الفلترة حسب الحالة */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel style={{ color: filterStatus ? labMintColor : 'inherit' }} sx={{ '&.Mui-focused': { color: labMintColor } }}>
                الحالة
              </InputLabel>
              <Select
                value={filterStatus}
                label="الحالة"
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: filterStatus ? labMintColor : 'rgba(0, 0, 0, 0.23)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                }}
              >
                <MenuItem value="">الكل</MenuItem>
                <MenuItem value="pending">قيد الانتظار</MenuItem>
                <MenuItem value="processing">قيد التحليل</MenuItem>
                <MenuItem value="completed">مكتمل</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* الفلترة حسب التاريخ */}
          <Grid item xs={12} sm={3}>
            <TextField
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label="تاريخ التحليل"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: filterDate ? labMintColor : 'rgba(0, 0, 0, 0.23)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                '& .MuiInputLabel-root': { color: filterDate ? labMintColor : 'inherit' },
                '& .MuiInputLabel-root.Mui-focused': { color: labMintColor }
              }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* تصميم جدول Ant Design */}
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

      {/* عرض التحميل أو البيانات */}
      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={5} minHeight="200px">
          <CircularProgress style={{ color: labMintColor, marginBottom: 15 }} />
          <Typography variant="body1" color="textSecondary">جاري تحميل التحاليل المخبرية...</Typography>
        </Box>
      ) : data.length === 0 ? (
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

      {/* تنبيهات النجاح والفشل للرفع السريع */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        {uploadState.success ? (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            تم رفع نتيجة التحليل بنجاح وتحديث السجلات المخبرية!
          </Alert>
        ) : uploadState.error ? (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {uploadState.error}
          </Alert>
        ) : null}
      </Snackbar>

      {/* التحميل الكسول للمودالات */}
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
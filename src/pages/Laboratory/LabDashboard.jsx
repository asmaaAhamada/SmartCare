import React, { useState, lazy, Suspense } from 'react';
import { Table, Tag, Space, Tooltip } from 'antd';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Typography, Card, Box, CircularProgress } from '@mui/material';
import { Visibility, Edit, CloudUpload } from '@mui/icons-material';

// استدعاء المودالات بطريقة التحميل الكسول
const AnalysisDetailsModal = lazy(() => import('./AnalysisDetailsModal'));
const StatusUpdateModal = lazy(() => import('./StatusUpdateModal'));

const initialData = [
  { id: '1', patientName: 'أحمد مصطفى', type: 'Cbc (تعداد دم)', date: '2026-06-28', status: 'قيد الانتظار', notes: 'يرجى التركيز على نسبة الهيموغلوبين.' },
  { id: '2', patientName: 'سارة العلي', type: 'وظائف كبد', date: '2026-06-29', status: 'قيد التحليل', notes: '' },
  { id: '3', patientName: 'محمد خالد', type: 'سكر عشوائي', date: '2026-06-25', status: 'مكتمل', notes: 'النتيجة طبيعية وضمن المعدل.' },
];

const LabDashboard = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);

  // لون الثيم النعناعي المخبري الموحد
  const labMintColor = '#1B5E20';

  const handleFilter = (type, status, date) => {
    let result = data;
    if (type) result = result.filter(item => item.type.includes(type));
    if (status) result = result.filter(item => item.status === status);
    if (date) result = result.filter(item => item.date === date);
    setFilteredData(result);
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updated = data.map(item => item.id === id ? { ...item, status: newStatus } : item);
    setData(updated);
    setFilteredData(updated);
  };

  const columns = [
    { title: 'رقم التحليل', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'اسم المريض', dataIndex: 'patientName', key: 'patientName', align: 'center' },
    { title: 'نوع التحليل', dataIndex: 'type', key: 'type', align: 'center' },
    { title: 'التاريخ', dataIndex: 'date', key: 'date', align: 'center' },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        let color = 'orange';
        if (status === 'مكتمل') color = 'green';
        if (status === 'قيد الانتظار') color = 'blue';
        if (status === 'ملغي') color = 'red';
        return <Tag color={color} style={{ fontSize: '13px', padding: '2px 8px' }}>{status}</Tag>;
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
              {/* تعديل لون العين ليتماشى مع الثيم */}
              <Visibility fontSize="small" style={{ color: labMintColor }} />
            </Button>
          </Tooltip>
          <Tooltip title="تحديث الحالة">
            <Button 
              size="small" 
              onClick={() => { setSelectedAnalysis(record); setOpenUpdateStatus(true); }}
              style={{ minWidth: 'auto', padding: 6, border: `1px solid ${labMintColor}`, borderRadius: '6px' }}
            >
              {/* تفتيح وتوضيح لون القلم تماماً بلون الثيم الواضح */}
              <Edit fontSize="small" style={{ color: labMintColor }} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Box p={3} dir="rtl">
      {/* رأس الصفحة باللون النعناعي */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" style={{ fontFamily: 'inherit', color: labMintColor }}>
          لوحة تحكم قسم المختبر والتحاليل
        </Typography>
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          style={{ backgroundColor: labMintColor, fontFamily: 'inherit', fontWeight: 'bold' }}
          component="label"
        >
          رفع نتيجة تحليل جديدة
          <input type="file" hidden onChange={(e) => alert(`تم اختيار الملف: ${e.target.files[0].name}`)} />
        </Button>
      </Box>

      {/* قسم الفلاتر العلوي مع تعديل البوردر والفوكس ليأخذ اللون النعناعي */}
      <Card variant="outlined" style={{ padding: 20, marginBottom: 25, borderRadius: '8px' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel style={{ color: filterType ? labMintColor : 'inherit' }}>الفلترة حسب النوع</InputLabel>
              <Select
                value={filterType}
                label="الفلترة حسب النوع"
                onChange={(e) => { setFilterType(e.target.value); handleFilter(e.target.value, filterStatus, filterDate); }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: filterType ? labMintColor : 'rgba(0, 0, 0, 0.23)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                }}
              >
                <MenuItem value="">الكل</MenuItem>
                <MenuItem value="Cbc">Cbc (تعداد دم)</MenuItem>
                <MenuItem value="وظائف كبد">وظائف كبد</MenuItem>
                <MenuItem value="سكر">سكر عشوائي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel style={{ color: filterStatus ? labMintColor : 'inherit' }}>الحالة</InputLabel>
              <Select
                value={filterStatus}
                label="الحالة"
                onChange={(e) => { setFilterStatus(e.target.value); handleFilter(filterType, e.target.value, filterDate); }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: filterStatus ? labMintColor : 'rgba(0, 0, 0, 0.23)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                }}
              >
                <MenuItem value="">الكل</MenuItem>
                <MenuItem value="قيد الانتظار">قيد الانتظار</MenuItem>
                <MenuItem value="قيد التحليل">قيد التحليل</MenuItem>
                <MenuItem value="مكتمل">مكتمل</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label="تاريخ التحليل"
              value={filterDate}
              onChange={(e) => { setFilterDate(e.target.value); handleFilter(filterType, filterStatus, e.target.value); }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: filterDate ? labMintColor : 'rgba(0, 0, 0, 0.23)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labMintColor },
                '& .MuiInputLabel-root.Mui-focused': { color: labMintColor }
              }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* حقن ستايل CSS مخصص لتلوين هيدر جدول Ant Design باللون النعناعي */}
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

      {/* جدول البيانات */}
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
        bordered
      />

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
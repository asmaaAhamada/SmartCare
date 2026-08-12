import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Box, Typography, Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Table } from 'antd';
import Swal from 'sweetalert2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventBusyIcon from '@mui/icons-material/EventBusy'; 
import AddIcon from '@mui/icons-material/Add'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPPOETMENT } from '../../backend/slice/reseption/apoettment_fetch';

const CreateAppointmentModal = lazy(() => import('./sub-components/CreateAppointmentModal'));

export default function ReceptionAppointments() {
  const dispatch = useDispatch();
  
  const { data: appointmentsData, isLoading } = useSelector((state) => state.fetchAPPOETMENT);
  console.log("Current Data in Component:", appointmentsData);

  const [filterDate, setFilterDate] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    dispatch(fetchAPPOETMENT({
      date: filterDate,
      doctor: filterDoctor,
      status: filterStatus
    }));
  }, [dispatch, filterDate, filterDoctor, filterStatus]);

  useEffect(() => {
    if (isLoading) {
      Swal.fire({
        title: 'جاري جلب البيانات...',
        html: 'يرجى الانتظار لحين تجهيز القوائم الحالية.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    } else {
      Swal.close();
    }
    return () => Swal.close();
  }, [isLoading]);

  // تعديل الوصول للمصفوفة لتدعم التغييرين (إذا كانت المصفوفة قادمة مباشرة أو متداخلة)
  const tableDataSource = Array.isArray(appointmentsData) 
    ? appointmentsData 
    : (appointmentsData?.announcements || []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const handleStatusChangeSubmit = () => {
    setIsEditModalOpen(false);
    Swal.fire({
      title: 'تم التحديث بنجاح! 🎉',
      text: `تم تغيير الحالة بنجاح بسبب: ${reason}`,
      icon: 'success',
      confirmButtonColor: '#E65100'
    });
  };

  // الأعمدة المتوافقة مع الـ JSON المرسل للإعلانات
  const columns = [
    { title: 'رقم الإعلان', dataIndex: 'id', key: 'id' },
    { title: 'العنوان', dataIndex: 'title', key: 'title' },
    { title: 'المحتوى', dataIndex: 'content', key: 'content' },
    { title: 'تاريخ البدء', dataIndex: 'starts_at', key: 'starts_at' },
    { title: 'تاريخ الانتهاء', dataIndex: 'ends_at', key: 'ends_at' },
    { 
      title: 'الحالة', 
      dataIndex: 'is_active', 
      key: 'is_active',
      render: (isActive) => {
        let color = isActive ? 'green' : 'red';
        let text = isActive ? 'نشط' : 'غير نشط';
        return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
      }
    },
    {
      title: 'الإجراءات الوظيفية',
      key: 'actions',
      render: (_, record) => (
        <Button variant="outlined" color="warning" onClick={() => { setSelectedAppt(record); setIsEditModalOpen(true); }}>
          تعديل الحالة ⚙️
        </Button>
      )
    }
  ];

  return (
    <Box p={3} sx={{ direction: 'rtl' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="#E65100">
          <CalendarMonthIcon sx={{ ml: 2, fontSize: '24px', verticalAlign: 'middle' }} />
          إدارة الإعلانات والجداول اليومية
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={<AddIcon sx={{ mr: -0.5, ml: 0.5 }} />} 
          sx={{ bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' }, fontFamily: "'Cairo', sans-serif" }} 
          onClick={() => setIsCreateOpen(true)}
        >
          إضافة جديد
        </Button>
      </Box>

      {/* قسم الفلاتر */}
      <Box display="flex" gap={2} mb={3} bgcolor="#FFF8E1" p={2} borderRadius={2} flexWrap="wrap">
        <TextField 
          type="date" 
          label="تصفية بالتاريخ" 
          InputLabelProps={{ shrink: true }} 
          size="small" 
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <TextField 
          label="البحث في العناوين" 
          size="small" 
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>الحالة</InputLabel>
          <Select
            value={filterStatus}
            label="الحالة"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value=""><em>الكل</em></MenuItem>
            <MenuItem value="active">نشط</MenuItem>
            <MenuItem value="inactive">غير نشط</MenuItem>
          </Select>
        </FormControl>
        {(filterDate || filterDoctor || filterStatus) && (
          <Button size="small" color="error" onClick={() => { setFilterDate(''); setFilterDoctor(''); setFilterStatus(''); }}>
            تصفير الفلاتر 🔄
          </Button>
        )}
      </Box>

      {/* جدول Ant Design */}
      <Table 
        dataSource={tableDataSource} 
        columns={columns} 
        rowKey={(record, index) => record.id || index}
        components={{
          header: {
            cell: (props) => (
              <th 
                {...props} 
                style={{ 
                  ...props.style, 
                  backgroundColor: '#FFF3E0', 
                  color: '#E65100',          
                  fontWeight: 'bold',
                  textAlign: 'right'
                }} 
              />
            ),
          },
        }}
        locale={{
          emptyText: (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
              <EventBusyIcon sx={{ fontSize: 60, color: '#FFB74D', mb: 1 }} />
              <Typography variant="h6" fontWeight="bold" color="#E65100">لا توجد بيانات مطابقة</Typography>
              <Typography variant="body2" color="textSecondary">القائمة فارغة تماماً بناءً على المعايير المدخلة حالياً.</Typography>
            </Box>
          )
        }}
      />

      {/* مودال تعديل الحالة */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 3 }}>
          <Typography variant="h6" mb={2} color="#E65100">تعديل الإجراء: {selectedAppt?.title}</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>الحالة الجديدة</InputLabel>
            <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <MenuItem value="active">تفعيل الإعلان ✅</MenuItem>
              <MenuItem value="inactive">تعطيل الإعلان ❌</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth multiline rows={3} label="السبب أو تفاصيل إضافية" value={reason} onChange={(e) => setReason(e.target.value)} sx={{ mb: 3 }} />
          <Button variant="contained" fullWidth sx={{ bgcolor: '#E65100' }} onClick={handleStatusChangeSubmit}>حفظ الإجراء</Button>
        </Box>
      </Modal>

      <Suspense fallback={<div>جاري تحميل الشاشة...</div>}>
        {isCreateOpen && <CreateAppointmentModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />}
      </Suspense>
    </Box>
  );
}
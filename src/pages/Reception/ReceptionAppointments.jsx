import React, { useState, lazy, Suspense } from 'react';
import { Box, Typography, Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Table } from 'antd';
import Swal from 'sweetalert2';

// استدعاء كمبوننت إضافة الموعد كلوزي لودينغ
const CreateAppointmentModal = lazy(() => import('./sub-components/CreateAppointmentModal'));

export default function ReceptionAppointments() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const appointmentsData = [
    { key: '1', id: 101, patient: 'أحمد علي', doctor: 'د. سامر السمور', date: '2026-07-06', time: '10:00 ص', status: 'confirmed' },
    { key: '2', id: 102, patient: 'رنا يوسف', doctor: 'د. مروة الشام', date: '2026-07-06', time: '11:30 ص', status: 'pending' },
  ];

  const handleStatusChangeSubmit = () => {
    setIsEditModalOpen(false);
    Swal.fire({
      title: 'تم التحديث بنجاح! 🎉',
      text: `تم تغيير حالة موعد المريض إلى (${newStatus}) بسبب: ${reason}`,
      icon: 'success',
      confirmButtonColor: '#E65100'
    });
  };

  const columns = [
    { title: 'رقم الموعد', dataIndex: 'id', key: 'id' },
    { title: 'المريض', dataIndex: 'patient', key: 'patient' },
    { title: 'الطبيب', dataIndex: 'doctor', key: 'doctor' },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
    { title: 'الوقت', dataIndex: 'time', key: 'time' },
    { 
      title: 'الحالة', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => <span style={{ color: status === 'confirmed' ? 'green' : 'orange' }}>{status}</span>
    },
    {
      title: 'الإجراءات الوظيفية',
      key: 'actions',
      render: (_, record) => (
        <Button variant="outlined" color="warning" onClick={() => { setSelectedAppt(record); setIsEditModalOpen(true); }}>
          تعديل الحالة مع السبب ⚙️
        </Button>
      )
    }
  ];

  return (
    <Box p={3} sx={{ direction: 'rtl' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="#E65100">📅 رادارات وجداول المواعيد اللطيفة</Typography>
        <Button variant="contained" sx={{ bgcolor: '#E65100' }} onClick={() => setIsCreateOpen(true)}>حجز موعد جديد ➕</Button>
      </Box>

      {/* فلاتر البحث والفرز الصيفية */}
      <Box display="flex" gap={2} mb={3} bgcolor="#FFF8E1" p={2} borderRadius={2}>
        <TextField type="date" label="تصفية بالتاريخ" InputLabelProps={{ shrink: true }} size="small" />
        <TextField label="تصفية باسم الطبيب" size="small" />
        <TextField label="تصفية بالحالة" size="small" />
      </Box>

      <Table dataSource={appointmentsData} columns={columns} />

      {/* مودال تعديل الحالة والسبب */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bg: 'white', bgcolor: 'background.paper', boxDashboard: 24, p: 4, borderRadius: 3 }}>
          <Typography variant="h6" mb={2} color="#E65100">تحديث حالة موعد: {selectedAppt?.patient}</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>الحالة الجديدة</InputLabel>
            <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <MenuItem value="confirmed">تأكيد الموعد ✅</MenuItem>
              <MenuItem value="cancelled">إلغاء الموعد ❌</MenuItem>
              <MenuItem value="completed">اكتملت الزيارة 🩺</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth multiline rows={3} label="توضيح سبب التغيير بشفافية" value={reason} onChange={(e) => setReason(e.target.value)} sx={{ mb: 3 }} />
          <Button variant="contained" fullWidth sx={{ bgcolor: '#E65100' }} onClick={handleStatusChangeSubmit}>حفظ الإجراء</Button>
        </Box>
      </Modal>

      {/* فتح كمبوننت إنشاء الموعد كـ Lazy Loading */}
      <Suspense fallback={<div>جاري تحميل شاشة الحجز المشرقة...</div>}>
        {isCreateOpen && <CreateAppointmentModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />}
      </Suspense>
    </Box>
  );
}
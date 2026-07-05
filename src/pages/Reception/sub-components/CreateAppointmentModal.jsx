import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Swal from 'sweetalert2';

export default function CreateAppointmentModal({ open, onClose }) {
  // داتا أولية مطابقة للـ Request Body في البوستمان
  const [formData, setFormData] = useState({
    patient_id: 32, // افتراضي للتجربة
    doctor_id: 10,
    appointment_date: '2026-07-06',
    appointment_time: '10:00',
    type: 'in_person'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(); // إغلاق المودال
    
    // إشعار نجاح مبهج يعكس روح الاستعلامات السعيدة
    Swal.fire({
      title: 'تم حجز الموعد بنجاح! 🎉',
      text: `المريض جاهز ومنتظر في الموعد المحدد يوم ${formData.appointment_date}`,
      icon: 'success',
      confirmButtonColor: '#E65100'
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 450, bgcolor: 'background.paper', boxShaddow: 24, p: 4, borderRadius: 3, direction: 'rtl'
      }}>
        <Typography variant="h6" fontWeight="bold" color="#E65100" mb={3}>
          📝 تذكرة حجز موعد جديد (استقبال سريع)
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="معرف المريض (Patient ID)"
            type="number"
            value={formData.patient_id}
            onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
            sx={{ mb: 2 }}
            required
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>اختر الطبيب المعالج</InputLabel>
            <Select
              value={formData.doctor_id}
              label="اختر الطبيب المعالج"
              onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
            >
              <MenuItem value={10}>د. سامر السمور (أطفال)</MenuItem>
              <MenuItem value={11}>د. مروة الشام (جلدية)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="date"
            label="تاريخ الموعد المشرق"
            InputLabelProps={{ shrink: true }}
            value={formData.appointment_date}
            onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            type="time"
            label="توقيت الزيارة"
            InputLabelProps={{ shrink: true }}
            value={formData.appointment_time}
            onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
            sx={{ mb: 2 }}
            required
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>نوع المقابلة</InputLabel>
            <Select
              value={formData.type}
              label="نوع المقابلة"
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <MenuItem value="in_person">حضور شخصي في العيادة 🏥</MenuItem>
              <MenuItem value="video">استشارة فيديو عن بعد 📹</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" gap={2}>
            <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' } }}>
              تأكيد الحجز والإدراج
            </Button>
            <Button variant="outlined" color="inherit" fullWidth onClick={onClose}>
              إلغاء
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
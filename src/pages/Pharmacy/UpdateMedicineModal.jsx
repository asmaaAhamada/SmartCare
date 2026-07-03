import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Update_medications } from '../../backend/slice/pharmecy/editeStatus';

const UpdateMedicineModal = ({ open, onClose, medicine, onRefresh }) => {
  const dispatch = useDispatch();
  const pharmacyColor = '#4A148C';

  // جلب حالة الـ Loading والـ Success والـ Error من السلايس الخاص بالتعديل
  const { loading, success, error } = useSelector((state) => state.Update_medications || state.updatemedications || {});

  // البيانات المحلية للمودال
  const [formData, setFormData] = useState({ name: '', price: '' });

  // تعبئة البيانات تلقائياً بمجرد فتح المودال واختيار الدواء
  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name || '',
        price: medicine.price || '',
      });
    }
  }, [medicine, open]);

  // مراقبة نجاح أو فشل العملية لعرض التنبيهات الإبداعية من Swal
  useEffect(() => {
    if (success && open) {
      Swal.fire({
        icon: 'success',
        title: 'تمت العملية بنجاح',
        text: 'تم تحديث بيانات المستحضر الطبي بنجاح داخل المستودع.',
        confirmButtonColor: pharmacyColor,
        timer: 2500
      });
      onRefresh(); // إعادة عمل فيتش للجدول لكي تظهر البيانات الجديدة مباشرة
      onClose();   // إغلاق المودال
    }

    if (error && open) {
      Swal.fire({
        icon: 'error',
        title: 'عذراً.. حدث خطأ',
        text: error || 'فشل تحديث بيانات الدواء، يرجى المحاولة لاحقاً.',
        confirmButtonColor: '#d33',
      });
    }
  }, [success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      Swal.fire({
        icon: 'warning',
        title: 'تنبيــه',
        text: 'الرجاء ملء حقول الاسم والسعر أولاً!',
        confirmButtonColor: pharmacyColor,
      });
      return;
    }

    // عمل dispatch للأكشن وإرسال الـ id مع البيانات المحدثة بناءً على السلايس وبوستمان
    dispatch(Update_medications({ 
      id: medicine.id, 
      name: formData.name, 
      price: Number(formData.price) 
    }));
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth dir="rtl">
      <DialogTitle style={{ textAlign: 'center', color: pharmacyColor, fontWeight: 'bold', fontFamily: 'inherit' }}>
        تحديث بيانات المستحضر الطبي
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* حقل تعديل اسم الدواء */}
            <TextField
              fullWidth
              label="الاسم التجاري الجديد"
              size="small"
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor },
                '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor }
              }}
            />

            {/* حقل تعديل سعر الدواء */}
            <TextField
              fullWidth
              label="السعر المعتمد ($)"
              type="number"
              size="small"
              variant="outlined"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              disabled={loading}
              inputProps={{ step: "0.01" }} // للسماح بالكسور مثل البوستمان 12.5
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor },
                '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions style={{ padding: '12px' }}>
          <Button onClick={onClose} disabled={loading} style={{ color: '#666', fontFamily: 'inherit' }}>
            تراجع
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            style={{ backgroundColor: loading ? '#ccc' : pharmacyColor, fontFamily: 'inherit', minWidth: '100px' }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'حفظ التغييرات'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateMedicineModal;
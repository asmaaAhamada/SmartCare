import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const DeleteMedicineModal = ({ open, onClose, onConfirm, medicineName }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        style: { borderRadius: '20px', padding: '10px', position: 'relative' }
      }}
    >
      {/* زر الإغلاق العلوي (X) */}
      <IconButton 
        onClick={onClose} 
        style={{ position: 'absolute', right: '15px', top: '15px', color: '#9e9e9e' }}
      >
        <Close />
      </IconButton>

      <DialogContent dir="rtl" style={{ textAlign: 'center', pt: 4 }}>
        {/* الأيقونة التحذيرية الدائرية الكبيرة */}
        <Box 
          sx={{
            width: '70px',
            height: '70px',
            backgroundColor: '#ffebee',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}
        >
          <span style={{ color: '#ef5350', fontSize: '40px', fontWeight: 'bold' }}>!</span>
        </Box>

        {/* عنوان المودال */}
        <Typography variant="h5" fontWeight="bold" mb={2} style={{ fontFamily: 'Cairo, sans-serif' }}>
          تأكيد الحذف
        </Typography>

        {/* نص السؤال مع اسم الدواء */}
        <Typography variant="body1" color="textSecondary" mb={1} style={{ fontFamily: 'Cairo, sans-serif' }}>
          هل أنت متأكد أنك تريد حذف الدواء
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="error" mb={2} style={{ fontFamily: 'Cairo, sans-serif' }}>
          {medicineName} ؟
        </Typography>

        {/* ملاحظة التحذير باللون الأحمر */}
        <Typography variant="body2" style={{ color: '#ef5350', fontFamily: 'Cairo, sans-serif', fontWeight: '500' }}>
          ملاحظة: هذا الإجراء لا يمكن التراجع عنه.
        </Typography>
      </DialogContent>

      {/* الأزرار السفلية العريضة والمتناسقة */}
      <DialogActions style={{ justifyContent: 'center', gap: '15px', paddingBottom: '20px', paddingLeft: '24px', paddingRight: '24px' }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          style={{ 
            borderRadius: '10px', 
            borderColor: '#e0e0e0', 
            color: '#757575', 
            minWidth: '120px',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 'bold'
          }}
        >
          تراجع
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          style={{ 
            borderRadius: '10px', 
            backgroundColor: '#ef5350',
            minWidth: '120px',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 'bold',
            boxShadow: 'none'
          }}
        >
          تأكيد الحذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMedicineModal;
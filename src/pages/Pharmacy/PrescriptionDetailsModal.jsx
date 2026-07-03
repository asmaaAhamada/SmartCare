import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography, Box, Divider, Card, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { fetchDetailsprescriptions, resetDetails } from '../../backend/slice/pharmecy/deteails';
import MedicalLoader from '../LOADING/MedicalLoader';

const PrescriptionDetailsModal = ({ open, onClose, prescriptionId }) => {
  const dispatch = useDispatch();
  const pharmacyColor = '#4A148C';

  // جلب البيانات والحالة من السلايس الخاص بك
  const { data: apiResponse, isLoading, error } = useSelector((state) => state.fetchDetailsprescriptions);
  
  // استخراج الكائن الداخلي بناءً على بنية الـ JSON (البيانات تأتي داخل كائن داتا مباشرة وليس مصفوفة)
  const details = apiResponse?.data;

  useEffect(() => {
    if (open && prescriptionId) {
      dispatch(fetchDetailsprescriptions(prescriptionId));
    }
    // تنظيف البيانات عند إغلاق المودال
    return () => {
      dispatch(resetDetails());
    };
  }, [open, prescriptionId, dispatch]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth dir="rtl">
      <DialogTitle style={{ fontFamily: 'inherit', fontWeight: 'bold', color: pharmacyColor, textAlign: 'center' }}>
        تفاصيل الوصفة الطبية الرقمية رقم #{prescriptionId}
      </DialogTitle>

      <DialogContent dividers style={{ backgroundColor: '#fcfaff' }}>
        {isLoading ? (
          <MedicalLoader />
        ) : error ? (
          <Box p={3} textAlign="center">
            <Typography color="error" variant="body1">{error}</Typography>
          </Box>
        ) : details ? (
          <Box p={1}>
            {/* قسم معلومات المريض والطبيب */}
            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" style={{ padding: 16, borderRadius: '12px', borderTop: `4px solid ${pharmacyColor}` }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <AccountCircleIcon sx={{ color: pharmacyColor }} />
                    <Typography variant="subtitle1" fontWeight="bold">بيانات المريض</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">الحساب (الايميل): {details.patient?.email}</Typography>
                  <Typography variant="body2" color="textSecondary" mt={0.5}>الهاتف: {details.patient?.phone || 'غير متوفر'}</Typography>
                  <Typography variant="body2" color="textSecondary" mt={0.5}>
                    حالة الحساب الذكي: <Chip size="small" label={details.patient?.status} color={details.patient?.status === 'active' ? 'success' : 'warning'} variant="outlined" />
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined" style={{ padding: 16, borderRadius: '12px', borderTop: `4px solid ${pharmacyColor}` }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocalHospitalIcon sx={{ color: pharmacyColor }} />
                    <Typography variant="subtitle1" fontWeight="bold">الطبيب المسؤول</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">اسم الحساب: {details.doctor?.email?.split('@')[0]}</Typography>
                  <Typography variant="body2" color="textSecondary" mt={0.5}>التوقيع الرقمي: <code>{details.digital_signature}</code></Typography>
                  <Typography variant="body2" color="textSecondary" mt={0.5}>العلامة المائية: {details.watermark_text}</Typography>
                </Card>
              </Grid>
            </Grid>

            {/* قسم التواريخ والرموز */}
            <Card variant="outlined" style={{ padding: 16, borderRadius: '12px', marginBottom: 24 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
                  <CalendarMonthIcon sx={{ color: '#666' }} />
                  <Typography variant="body2">
                    <strong>تاريخ الإصدار:</strong> {details.prescription_date?.split('T')[0]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
                  <CalendarMonthIcon sx={{ color: '#666' }} />
                  <Typography variant="body2">
                    <strong>تاريخ الانتهاء:</strong> {details.expiry_date?.split('T')[0]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} display="flex" alignItems="center" gap={1}>
                  <QrCodeIcon sx={{ color: '#666' }} />
                  <Typography variant="body2">
                    <strong>كود المزامنة السريع (QR):</strong> {details.qr_code_data}
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            <Divider style={{ margin: '15px 0' }} />

            {/* قسم قائمة الأدوية */}
            <Typography variant="h6" fontWeight="bold" color={pharmacyColor} mb={2}>
              💊 المركبات والأدوية الطبية المعتمدة للمريض:
            </Typography>

            {details.medications?.map((item, index) => (
              <Card key={index} variant="outlined" style={{ padding: 16, borderRadius: '12px', marginBottom: 12, backgroundColor: '#fff' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1" fontWeight="bold" color={pharmacyColor}>
                      {item.medication?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      الاسم العلمي: {item.medication?.generic_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Box display="flex" gap={1} flexWrap="wrap" justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                      <Chip size="small" label={`الجرعة: ${item.dosage}`} color="primary" variant="outlined" />
                      <Chip size="small" label={`التكرار: ${item.frequency}`} color="secondary" variant="outlined" />
                      <Chip size="small" label={`الفترة المحددة: ${item.duration}`} variant="outlined" />
                      <Chip size="small" label={`الكمية الإجمالية: ${item.quantity}`} color="success" />
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={1.5} p={1} style={{ backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>إرشادات الاستخدام:</strong> {item.instructions} | المصنع: {item.medication?.manufacturer} | السعر المعتمد: {item.medication?.price}$
                  </Typography>
                </Box>
              </Card>
            ))}

            {details.notes && (
              <Box mt={2} p={1.5} style={{ borderRight: '4px solid orange', backgroundColor: '#fff8f0', borderRadius: '4px' }}>
                <Typography variant="body2"><strong>ملاحظات المرفق الطبي:</strong> {details.notes}</Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box p={3} textAlign="center">
            <Typography variant="body2" color="textSecondary">لم يتم العثور على تفاصيل هذه الوصفة.</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions style={{ padding: '12px 24px' }}>
        <Button onClick={onClose} variant="contained" style={{ backgroundColor: pharmacyColor, color: 'white', fontWeight: 'bold' }}>
          إغلاق النافذة
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrescriptionDetailsModal;
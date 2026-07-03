import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Divider, CircularProgress, Box, Alert } from '@mui/material';
import { fetchDetailslab, resetDetails } from '../../backend/slice/lab_mangment/deteails';
import { useDispatch, useSelector } from 'react-redux';

const AnalysisDetailsModal = ({ open, onClose, data }) => {
  const dispatch = useDispatch();
  
  // استخراج الـ id من الـ data المُمررة من الجدول لتجنب خطأ "ID not found"
  const id = data?.id; 

  const {
    data: Response,
    isLoading,
    error,
  } = useSelector((state) => state.fetchDetailslab);
  
  const labData = Response; // الـ Slice الخاصة بك تضع الـ payload.data مباشرة في state.data

  useEffect(() => {
    if (open && id) {
      dispatch(fetchDetailslab(id));
    }
    return () => {
      dispatch(resetDetails());
    };
  }, [id, open, dispatch]);

  const labGreenColor = '#1B5E20';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle 
        style={{ 
          fontFamily: 'inherit', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          color: labGreenColor 
        }}
      >
        تفاصيل التحليل الطبي
      </DialogTitle>
      
      <DialogContent dividers style={{ minHeight: '250px' }}>
        {/* معالجة حالات التحميل والأخطاء داخل المودال */}
        {isLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress style={{ color: labGreenColor, marginBottom: 15 }} />
            <Typography variant="body2" color="textSecondary">جاري جلب التفاصيل...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !labData ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="body1" color="textSecondary">لا توجد بيانات لعرضها.</Typography>
          </Box>
        ) : (
          <Grid container spacing={2} dir="rtl" style={{ fontFamily: 'inherit' }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">رقم التحليل</Typography>
              <Typography variant="body1" fontWeight="medium">#{labData.id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">اسم المريض</Typography>
              <Typography variant="body1" fontWeight="medium">{labData.patient?.full_name}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">اسم التحليل</Typography>
              <Typography variant="body1" fontWeight="medium">{labData.test_name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">نوع التحليل</Typography>
              <Typography variant="body1">{labData.test_type}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">تاريخ الطلب</Typography>
              <Typography variant="body1">{labData.ordered_at ? labData.ordered_at.split('T')[0] : 'غير محدد'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">الطبيب المعالج</Typography>
              <Typography variant="body1">{labData.doctor?.full_name || 'غير محدد'}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">حالة التحليل</Typography>
              <Typography variant="body1" style={{ 
                color: labData.status === 'completed' ? 'green' : labData.status === 'pending' ? 'orange' : 'red',
                fontWeight: 'bold' 
              }}>
                {labData.status === 'completed' ? 'مكتمل' : labData.status === 'pending' ? 'قيد الانتظار' : labData.status}
              </Typography>
            </Grid>
            
            {labData.result_file_url && (
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">ملف النتيجة</Typography>
                <a href={labData.result_file_url} target="_blank" rel="noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  عرض الملف المرفق
                </a>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider style={{ margin: '10px 0' }} />
              <Typography variant="subtitle2" style={{ color: labGreenColor, fontWeight: 'bold' }}>
                ملاحظات المخبر
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {labData.notes || "لا توجد ملاحظات إضافية لهذا التحليل."}
              </Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      
      <DialogActions style={{ justifyContent: 'center', padding: '12px' }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          style={{ backgroundColor: labGreenColor, fontFamily: 'inherit', color: 'white', fontWeight: 'bold' }}
        >
          إغلاق
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalysisDetailsModal;
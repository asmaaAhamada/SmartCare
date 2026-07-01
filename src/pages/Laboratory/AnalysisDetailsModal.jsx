import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Divider } from '@mui/material';
import { fetchDetailslab, resetDetails } from '../../backend/slice/lab_mangment/deteails';
import { useDispatch, useSelector } from 'react-redux';

const AnalysisDetailsModal = ({ open, onClose, data }) => {
     const dispatch = useDispatch();
        
          // جلب تفاصيل الإعلان من الـ Redux Store
    const {
      data: Response,
      isLoading,
      error,
    } = useSelector((state) => state.fetchDetailslab);
    
    const roleData = Response?.data;    
          // جلب البيانات عند فتح المودال وتغير الـ ID وتصفيرها عند الإغلاق
          useEffect(() => {
            if (open && id) {
              dispatch(fetchDetailslab(id));
            }
            return () => {
              dispatch(resetDetails());
            };
          }, [id, open, dispatch]);

  // اللون الأخضر المخبري المعتمد
  const labGreenColor = '#1B5E20';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* توسيط العنوان وتلوينه باللون الأخضر المعتمد */}
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
      
      <DialogContent dividers>
        <Grid container spacing={2} dir="rtl" style={{ fontFamily: 'inherit' }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">اسم المريض</Typography>
            <Typography variant="body1" fontWeight="medium">{data.patientName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">نوع التحليل</Typography>
            <Typography variant="body1" fontWeight="medium">{data.type}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">تاريخ الطلب</Typography>
            <Typography variant="body1">{data.date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">حالة التحليل</Typography>
            <Typography variant="body1">{data.status}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="subtitle2" style={{ color: labGreenColor, fontWeight: 'bold' }}>
              ملاحظات المخبر
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.notes || "لا توجد ملاحظات إضافية لهذا التحليل."}
            </Typography>
          </Grid>
        </Grid>
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
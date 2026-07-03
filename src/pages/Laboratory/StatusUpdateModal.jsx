import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Editestatus, resetStatusState } from '../../backend/slice/lab_mangment/updatestatus';

const StatusUpdateModal = ({ open, onClose, data, onUpdate }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');

  const { isLoading, success, error } = useSelector((state) => state.Editestatus);
  const labGreenColor = '#1B5E20';

  useEffect(() => {
    if (data) {
      // توحيد الحالة القادمة لتطابق أحرف الباك إند الصغيرة
      setStatus(data.status?.toLowerCase() === 'completed' ? 'completed' : data.status);
    }
  }, [data]);

  useEffect(() => {
    if (success) {
      onUpdate();
      onClose();
      dispatch(resetStatusState());
    }
  }, [success, dispatch, onClose, onUpdate]);

  const handleSave = () => {
    if (data?.id && status) {
      dispatch(Editestatus({ id: data.id, status }));
    }
  };

  const handleCloseModal = () => {
    dispatch(resetStatusState());
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
      <DialogTitle 
        style={{ 
          fontFamily: 'inherit', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          color: labGreenColor 
        }}
      >
        تحديث حالة التحليل
      </DialogTitle>
      
      <DialogContent dividers>
        <FormControl fullWidth style={{ marginTop: 15, marginBottom: 10 }} disabled={isLoading}>
          <InputLabel 
            id="status-select-label" 
            style={{ color: status ? labGreenColor : 'inherit' }}
          >
            الحالة الجديدة
          </InputLabel>
          <Select
            labelId="status-select-label"
            value={status}
            label="الحالة الجديدة"
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { borderColor: status ? labGreenColor : 'rgba(0, 0, 0, 0.23)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: labGreenColor },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: labGreenColor },
            }}
          >
            {/* القيمة المرسلة للباك إند (value) بالإنجليزية تماماً كما في الصورة، والعرض بالكامل بالعربية */}
            <MenuItem value="pending">قيد الانتظار</MenuItem>
            <MenuItem value="in_progress">قيد التحليل</MenuItem>
            <MenuItem value="completed">مكتمل</MenuItem>
          </Select>
        </FormControl>

        {error && (
          <Typography color="error" variant="caption" display="block" textAlign="center" mt={1} fontWeight="bold">
            {error}
          </Typography>
        )}
      </DialogContent>
      
      <DialogActions style={{ padding: '12px 24px' }}>
        <Button onClick={handleCloseModal} disabled={isLoading} style={{ color: '#666', fontFamily: 'inherit' }}>
          إلغاء
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={isLoading}
          style={{ backgroundColor: labGreenColor, fontFamily: 'inherit', color: 'white', fontWeight: 'bold', minWidth: '100px' }}
        >
          {isLoading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'حفظ التعديل'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateModal;
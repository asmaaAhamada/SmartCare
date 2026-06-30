import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const StatusUpdateModal = ({ open, onClose, data, onUpdate }) => {
  const [status, setStatus] = useState('');

  // اللون الأخضر المخبري المعتمد
  const labGreenColor = '#1B5E20';

  useEffect(() => {
    if (data) setStatus(data.status);
  }, [data]);

  const handleSave = () => {
    onUpdate(data.id, status);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* توسيط العنوان وتلوينه باللون الأخضر المعتمد */}
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
        <FormControl fullWidth style={{ marginTop: 15, marginBottom: 10 }}>
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
            <MenuItem value="قيد الانتظار">قيد الانتظار</MenuItem>
            <MenuItem value="قيد التحليل">قيد التحليل</MenuItem>
            <MenuItem value="مكتمل">مكتمل</MenuItem>
            <MenuItem value="ملغي">ملغي</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      
      <DialogActions style={{ padding: '12px 24px' }}>
        <Button onClick={onClose} style={{ color: '#666', fontFamily: 'inherit' }}>
          إلغاء
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          style={{ backgroundColor: labGreenColor, fontFamily: 'inherit', color: 'white', fontWeight: 'bold' }}
        >
          حفظ التعديل
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateModal;
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import Swal from 'sweetalert2';

export default function AddNewsModal({ open, onClose }) {
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    is_active: true,
    starts_at: '2026-06-29 00:00:00',
    ends_at: '2026-07-08 00:00:00'
  });

  const handlePublish = (e) => {
    e.preventDefault();
    onClose();
    Swal.fire({
      title: 'تم بث الإعلان بنجاح! 📢',
      text: `الخبر أصبح متوفراً الآن على لوحات شاشات الاستعلامات الرئيسية للجمهور.`,
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
          📢 بث منشور / خبر إعلامي للمراجعين
        </Typography>

        <form onSubmit={handlePublish}>
          <TextField
            fullWidth
            label="عنوان الخبر العاجل"
            value={newsForm.title}
            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="محتوى المنشور التفصيلي"
            value={newsForm.content}
            onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            type="datetime-local"
            label="تاريخ ووقت بدء النشر"
            InputLabelProps={{ shrink: true }}
            value={newsForm.starts_at.replace(" ", "T")}
            onChange={(e) => setNewsForm({ ...newsForm, starts_at: e.target.value.replace("T", " ") })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="datetime-local"
            label="تاريخ انتهاء الفعالية والأرشفة"
            InputLabelProps={{ shrink: true }}
            value={newsForm.ends_at.replace(" ", "T")}
            onChange={(e) => setNewsForm({ ...newsForm, ends_at: e.target.value.replace("T", " ") })}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={newsForm.is_active}
                onChange={(e) => setNewsForm({ ...newsForm, is_active: e.target.checked })}
                color="warning"
              />
            }
            label="تفعيل الإعلان فوراً ونشره على الشاشات الذكية"
            sx={{ mb: 3, display: 'block' }}
          />

          <Box display="flex" gap={2}>
            <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' } }}>
              إطلاق المنشور الآن 🚀
            </Button>
            <Button variant="outlined" color="inherit" fullWidth onClick={onClose}>
              إلغاء الأمر
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
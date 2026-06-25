import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  CircularProgress,
  Box,
} from "@mui/material";

import { CloudUpload, CheckCircle, ErrorOutline } from "@mui/icons-material";
import { notification } from "antd";
import { baby_blue } from "../../color-main/color";
import { AddAnnouncement, setformInfo, resetForm, clearError } from "../../backend/slice/announcements/add";
import { fetchAnnouncement } from "../../backend/slice/announcements/fetchAll";

export default function AddAnnouncementModal({ open, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const { formInfo, isLoading, error, success } = useSelector((state) => state.AddAnnouncement);

  useEffect(() => {
    if (success) {
      notification.success({
        message: "تمت العملية بنجاح",
        description: "تم إضافة وتفعيل الإعلان بنجاح.",
        placement: "top", // يظهر من الأعلى والمنتصف
        duration: 4,
        style: { borderRadius: '12px' },
        icon: <CheckCircle style={{ color: "#52c41a" }} />,
      });

      dispatch(fetchAnnouncement());
      dispatch(resetForm());
      setFileName("");
      if (typeof onSuccess === "function") onSuccess();
      onCancel();
    }
  }, [success, dispatch, onCancel, onSuccess]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "فشل التحقق من البيانات (422)",
        description: (
          <div style={{ whiteSpace: 'pre-line', direction: 'ltr', textAlign: 'left', marginTop: '5px' }}>
            {error.split(' | ').join('\n')}
          </div>
        ),
        placement: "top", // تظهر من المنتصف في الأعلى
        duration: 7,
        style: { borderRadius: '12px', width: '450px' },
        icon: <ErrorOutline style={{ color: "#ff4d4f" }} />,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setformInfo({ [name]: value }));
  };

  const handleSwitch = (e) => {
    dispatch(setformInfo({ is_active: e.target.checked }));
  };

  // ⚡ تحويل ملف الصورة الحقيقي إلى نص مرمز (Base64) ليمر عبر كائن الـ JSON بسلاسة
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        // نرسل السلسلة النصية الناتجة إلى الـ Redux State
        dispatch(setformInfo({ image_url: reader.result })); 
      };
      reader.readAsDataURL(file);
    }
  };

  // ستايلات التصميم المحسنة باللون البيبي بلو
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.3s ease",
      "&.Mui-focused fieldset": {
        borderColor: baby_blue,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: baby_blue, 
    },
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(resetForm());
        setFileName("");
        onCancel();
      }}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: { borderRadius: "16px", padding: "8px" }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight={700} color={baby_blue} sx={{ pb: 1, borderBottom: '1px solid #f0f0f0' }}>
          إضافة إعلان جديد
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="عنوان الإعلان"
              name="title"
              value={formInfo.title}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formInfo.is_active}
                  onChange={handleSwitch}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#2e7d32', // اللون الأخضر المريح عند التفعيل
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#2e7d32',
                        opacity: 0.5,
                      },
                    },
                  }}
                />
              }
              label={
                <Typography fontWeight={600} color={formInfo.is_active ? "#2e7d32" : "textSecondary"}>
                  تفعيل الإعلان فوراً
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="تاريخ البدية"
              name="starts_at"
              value={formInfo.starts_at}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="تاريخ النهاية"
              name="ends_at"
              value={formInfo.ends_at}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="محتوى الإعلان التفصيلي"
              name="content"
              value={formInfo.content}
              onChange={handleChange}
              sx={textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ p: 2, border: '1px dashed #d9d9d9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2, backgroundColor: '#fafafa' }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{
                  borderColor: baby_blue,
                  color: baby_blue,
                  borderRadius: "8px",
                  "&:hover": { borderColor: baby_blue, backgroundColor: 'rgba(0, 191, 255, 0.04)' }
                }}
              >
                رفع صورة الإعلان
                <input hidden type="file" accept="image/*" onChange={handleImage} />
              </Button>

              <Typography variant="body2" color={fileName ? "textPrimary" : "textSecondary"} sx={{ fontSize: "14px", fontWeight: fileName ? 600 : 400 }}>
                {fileName || "لم يتم اختيار صورة (سيتم إرسالها فارغة)"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ padding: "20px", gap: 1.5, borderTop: '1px solid #f0f0f0' }}>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(resetForm());
            setFileName("");
            onCancel();
          }}
          sx={{ borderRadius: "8px", color: '#666', borderColor: '#ccc' }}
        >
          إلغاء الأمر
        </Button>

        <Button
          variant="contained"
          onClick={() => dispatch(AddAnnouncement())}
          disabled={isLoading}
          sx={{
            backgroundColor: baby_blue,
            borderRadius: "8px",
            padding: "6px 24px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: baby_blue,
              opacity: 0.9,
            },
          }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : "إضافة الإعلان"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
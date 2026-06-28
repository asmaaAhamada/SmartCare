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

import { CloudUpload } from "@mui/icons-material";
import Swal from "sweetalert2";
import { baby_blue } from "../../color-main/color";
import { AddAnnouncement, setformInfo, resetForm, clearError } from "../../backend/slice/announcements/add";
import { fetchAnnouncement } from "../../backend/slice/announcements/fetchAll";

export default function AddAnnouncementModal({ open, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const { formInfo, isLoading, error, success } = useSelector((state) => state.AddAnnouncement);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(AddAnnouncement()).unwrap();
      onCancel(); // إغلاق المودال فوراً عند النجاح

      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تمت إضافة الإعلان بنجاح",
        timer: 1800,
        showConfirmButton: false,
        confirmButtonColor: baby_blue,
      });

      if (onSuccess) onSuccess(); 
    } catch (err) {
      onCancel();
      let errorMessage = "حدث خطأ أثناء إضافة الإعلان";
    
      if (err?.errors) {
        errorMessage = Object.values(err.errors)
          .flat()
          .join("\n");
      } else if (err?.message) {
        errorMessage = err.message;
      }
    
      Swal.fire({
        icon: "error",
        title: "فشل",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setformInfo({ [name]: value }));
  };

  const handleSwitch = (e) => {
    dispatch(setformInfo({ is_active: e.target.checked }));
  };

const handleImage = (e) => {
  const file = e.target.files[0];

  console.log(file);

  if (file) {
    console.log(formInfo.image_url);
    dispatch(setformInfo({ image_url: file }));
  }
};

  // ✨ ستايلات محسنة ومخصصة للـ RTL (من اليمين لليسار) لتصبح الحقول لطيفة جداً
  const textFieldStyles = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.3s ease",
      "&.Mui-focused fieldset": {
        borderColor: baby_blue,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      right: 20,              // 🔑 دفع الـ label لليمين كحالة بدئية
      left: "auto",
      transformOrigin: "right", // جعل نقطة التحجيم للأنيميشن تبدأ من اليمين
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)", // ضبط موقعه المرتفع عند الكتابة
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: baby_blue, 
    },
    "& input": {
      textAlign: "right", // محاذاة النص المدخل لليمين
    },
    "& textarea": {
      textAlign: "right", // محاذاة النص داخل الـ Multiline لليمين
    },
    // تجميل وضبط أيقونة الكاليندر (التايب date) لتأتي يسار الحقل وبشكل لطيف
    "& input[type='date']::-webkit-calendar-picker-indicator": {
      position: "absolute",
      left: "12px",
      right: "auto",
      cursor: "pointer",
    }
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
      {/* 🔑 إحاطة المحتوى بـ Box وتحديد اتجاه الرتل dir="rtl" لقلب المودال بالكامل */}
      <Box dir="rtl">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #f0f0f0' }}>
          <Typography variant="h5" fontWeight={700} color={baby_blue}>
            إضافة إعلان جديد
          </Typography>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* 🔑 إضافة dir="rtl" على الجريد لحل تخبيص ترتيب الأعمدة والمسافات */}
            <Grid container spacing={3} sx={{ mt: 0.5 }} dir="rtl">
              
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

              <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <FormControlLabel
                  sx={{ mr: 0, ml: 'auto' }} // ضبط الـ margin ليتوافق مع اليمين
                  control={
                    <Switch
                      checked={formInfo.is_active}
                      onChange={handleSwitch}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#2e7d32',
                          '& + .MuiSwitch-track': {
                            backgroundColor: '#2e7d32',
                            opacity: 0.5,
                          },
                        },
                      }}
                    />
                  }
                  label={
                    <Typography fontWeight={600} sx={{ mr: 1 }} color={formInfo.is_active ? "#2e7d32" : "textSecondary"}>
                      تفعيل الإعلان فوراً
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="تاريخ البداية"
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
                <Box sx={{ p: 2, border: '1px dashed #d9d9d9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2, backgroundColor: '#fafafa', flexDirection: 'row' }}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload sx={{ ml: 1, mr: 0 }} />} // نقل مسافة الأيقونة لتناسب العربي
                    sx={{
                      borderColor: baby_blue,
                      color: baby_blue,
                      borderRadius: "8px",
                      fontWeight: 600,
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

          {/* ترتيب أزرار الأكشن بحيث يكون الإدخال الأساسي يساراً والإلغاء يميناً حسب معايير الـ RTL المريحة للعين */}
          <DialogActions sx={{ padding: "20px", gap: 1.5, borderTop: '1px solid #f0f0f0', justifyContent: 'flex-start' }}>
            <Button
              variant="contained"
              type="submit"
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
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
}
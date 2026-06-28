import React, { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Grid, 
  TextField, 
  Button, 
  IconButton, 
  Typography, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  InputAdornment,
  CircularProgress,
  Alert // 🔑 استيراد مكون التنبيه لعرض الخطأ داخل الفورم
} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import StethoscopeIcon from "@mui/icons-material/MedicalServicesOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { baby_blue, white } from "../../color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialties } from "../../backend/slice/doctors/speslist";
import { AddClinic, updateFormField, resetForm } from "../../backend/slice/clinic/addClinc";

export default function CreateClinicModal({ open, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [localError, setLocalError] = useState(null); // 🔑 حالة محلية لحفظ الخطأ وطباعته داخل المودال
  
  const {
    data: specialties,
  } = useSelector((state) => state.fetchSpecialties);

  const {
    formInfo,
    isLoading,
  } = useSelector((state) => state.AddClinic);

  useEffect(() => {
    if (open) {
      dispatch(fetchSpecialties());
      dispatch(resetForm()); 
      setLocalError(null); // تصفير الأخطاء عند فتح المودال مجدداً
    }
  }, [dispatch, open]);

  const handleChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null); // تصفير الخطأ عند المحاولة الجديدة

    try {
      await dispatch(AddClinic(formInfo)).unwrap();
      onClose(); // إغلاق المودال فوراً عند النجاح

      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تمت إضافة العيادة بنجاح",
        timer: 1800,
        showConfirmButton: false,
        confirmButtonColor: baby_blue,
      });

      if (onSuccess) onSuccess(); // 🔑 استدعاء الفيتش التلقائي في الصفحة الرئيسية
    } catch (err) {
       onClose();
      let errorMessage = "حدث خطأ أثناء إضافة الطبيب";
    
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

  const rtlTextFieldStyle = {
    '& .MuiInputLabel-root': { right: 35, left: 'auto', transformOrigin: 'top right' },
    '& .MuiInputLabel-shrink': { transform: 'translate(0, -6px) scale(0.75)', right: 35 },
    '& .MuiOutlinedInput-notchedOutline': { textAlign: 'right' },
    '& .MuiOutlinedInput-root': { paddingRight: '8px' }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", padding: "8px", direction: "rtl" } }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalHospitalOutlinedIcon sx={{ color: baby_blue || "#035970", fontSize: "28px" }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: "#434343" }}>
            إنشاء عيادة جديدة
          </Typography>
        </Box>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          
          {/* 🔑 مكان طباعة رسالة الخطأ داخل الـ Form عند حدوثها */}
          {localError && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ width: '100%', borderRadius: '8px', fontWeight: 600 }}>
                {localError}
              </Alert>
            </Grid>
          )}

          {/* اسم العيادة */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="اسم العيادة"
              placeholder="مثال: عيادة الأسنان المتقدمة"
              variant="outlined"
              value={formInfo.name || ""} 
              onChange={(e) => handleChange("name", e.target.value)} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalHospitalOutlinedIcon sx={{ color: "#a1a9c3" }} />
                  </InputAdornment>
                ),
              }}
              sx={rtlTextFieldStyle}
            />
          </Grid>

          {/* التخصص */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={rtlTextFieldStyle}>
              <InputLabel id="specialty-label">التخصص طبّي</InputLabel>
              <Select
                labelId="specialty-label"
                label="التخصص طبّي"
                value={formInfo.specialty_id || ""} 
                onChange={(e) => handleChange("specialty_id", e.target.value)} 
                startAdornment={
                  <InputAdornment position="start" style={{ marginRight: "8px" }}>
                    <StethoscopeIcon sx={{ color: "#a1a9c3" }} />
                  </InputAdornment>
                }
              >
                {specialties?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name_ar}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* الطابق */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="الطابق"
              placeholder="مثال: الطابق الثاني"
              variant="outlined"
              value={formInfo.floor || ""} 
              onChange={(e) => handleChange("floor", e.target.value)} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LayersOutlinedIcon sx={{ color: "#a1a9c3" }} />
                  </InputAdornment>
                ),
              }}
              sx={rtlTextFieldStyle}
            />
          </Grid>

          {/* رقم الغرفة */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="رقم الغرفة"
              placeholder="مثال: 205"
              variant="outlined"
              value={formInfo.room_number || ""} 
              onChange={(e) => handleChange("room_number", e.target.value)} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MeetingRoomOutlinedIcon sx={{ color: "#a1a9c3" }} />
                  </InputAdornment>
                ),
              }}
              sx={rtlTextFieldStyle}
            />
          </Grid>

          {/* رقم الهاتف */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="رقم الهاتف"
              placeholder="مثال: 0112345678"
              variant="outlined"
              value={formInfo.phone || ""} 
              onChange={(e) => handleChange("phone", e.target.value)} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon sx={{ color: "#a1a9c3" }} />
                  </InputAdornment>
                ),
              }}
              sx={rtlTextFieldStyle}
            />
          </Grid>

          {/* حالة العيادة */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={Boolean(formInfo.is_active)} 
                  onChange={(e) => handleChange("is_active", e.target.checked)} 
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: baby_blue },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: baby_blue }
                  }}
                />
              }
              label={
                <Typography sx={{ fontWeight: 500, color: '#555', mr: 1 }}>
                  تفعيل العيادة فوراً بالنظام
                </Typography>
              }
              labelPlacement="start"
              sx={{ margin: 0, width: '100%', justifyContent: 'space-between' }}
            />
          </Grid>

          {/* وصف العيادة وتفاصيلها */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="وصف العيادة وتفاصيلها"
              placeholder="اكتب هنا تفاصيل إضافية عن العيادة..."
              variant="outlined"
              value={formInfo.description || ""} 
              onChange={(e) => handleChange("description", e.target.value)} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                    <DescriptionOutlinedIcon sx={{ color: "#a1a9c3" }} />
                  </InputAdornment>
                ),
              }}
              sx={rtlTextFieldStyle}
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1, justifyContent: 'flex-start' }}>
        <Button 
          variant="contained" 
          disabled={isLoading}
          onClick={handleSubmit}
          sx={{ 
            backgroundColor: baby_blue || "#035970", 
            color: white || "#fff",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "8px 24px",
            boxShadow: `0 4px 12px rgba(3, 89, 112, 0.2)`,
            '&:hover': { backgroundColor: "#024658" }
          }}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "حفظ البيانات"}
        </Button>
        <Button 
          variant="outlined" 
          disabled={isLoading}
          onClick={onClose}
          sx={{ 
            color: "#8c8c8c", 
            borderColor: "#d9d9d9",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "8px 24px",
            '&:hover': { borderColor: "#bfbfbf", backgroundColor: "rgba(0,0,0,0.02)" }
          }}
        >
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  );
}
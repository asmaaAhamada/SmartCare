import React, { useEffect } from "react";
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
  CircularProgress
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
// 🔑 استيراد أكشن التحديث والتنظيف من السلايس
import { EditeClinic, updateFormField, resetForm } from "../../backend/slice/clinic/edite";

export default function EditeClinicModal({ open, onClose, onSuccess }) {
  const dispatch = useDispatch();
  
  const {
    data: specialties,
  } = useSelector((state) => state.fetchSpecialties);

  const {
    formInfo,
    isLoading,
  } = useSelector((state) => state.EditeClinic);

  useEffect(() => {
    if (open) {
      dispatch(fetchSpecialties());
    }
  }, [dispatch, open]);

  // 🔑 دالة مساعدة لإرسال التغييرات مباشرة للـ Slice
  const handleChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  const handleClose = () => {

    dispatch(resetForm());

    onClose();

}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(EditeClinic(formInfo)).unwrap();
      onClose();

      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تمت تعديل العيادة بنجاح",
        timer: 1800,
        showConfirmButton: false,
        confirmButtonColor: baby_blue,
        didOpen: () => { Swal.getPopup().style.zIndex = "9999"; }
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "فشل",
        text: typeof err === "string" ? err : err?.message || "حدث خطأ أثناء تعديل العيادة",
        confirmButtonColor: "#d33",
        didOpen: () => { Swal.getPopup().style.zIndex = "9999"; }
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
    onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", padding: "8px", direction: "rtl" } }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalHospitalOutlinedIcon sx={{ color: baby_blue || "#035970", fontSize: "28px" }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: "#434343" }}>
            تعديل عيادة 
          </Typography>
        </Box>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          
          {/* اسم العيادة */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="اسم العيادة"
              placeholder="مثال: عيادة الأسنان المتقدمة"
              variant="outlined"
              value={formInfo.name || ""} // 🔑 ربط القيمة بالـ Slice
              onChange={(e) => handleChange("name", e.target.value)} // 🔑 تحديث الـ Slice فوراً
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
                value={formInfo.specialty_id || ""} // 🔑 ربط القيمة بالـ Slice
                onChange={(e) => handleChange("specialty_id", e.target.value)} // 🔑 تحديث الـ Slice فوراً
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
              value={formInfo.floor || ""} // 🔑 ربط القيمة بالـ Slice
              onChange={(e) => handleChange("floor", e.target.value)} // 🔑 تحديث الـ Slice فوراً
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
              value={formInfo.room_number || ""} // 🔑 ربط القيمة بالـ Slice
              onChange={(e) => handleChange("room_number", e.target.value)} // 🔑 تحديث الـ Slice فوراً
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
              value={formInfo.phone || ""} // 🔑 ربط القيمة بالـ Slice
              onChange={(e) => handleChange("phone", e.target.value)} // 🔑 تحديث الـ Slice فوراً
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
                  checked={Boolean(formInfo.is_active)} // 🔑 ربط القيمة بالـ Slice
                  onChange={(e) => handleChange("is_active", e.target.checked)} // 🔑 تحديث الـ Slice فوراً
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
              value={formInfo.description || ""} // 🔑 ربط القيمة بالـ Slice
              onChange={(e) => handleChange("description", e.target.value)} // 🔑 تحديث الـ Slice فوراً
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
              onClose={handleClose}

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
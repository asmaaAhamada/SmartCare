import React from "react";
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
  InputAdornment
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import StethoscopeIcon from "@mui/icons-material/MedicalServicesOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { baby_blue, white } from "../../color-main/color";

export default function CreateClinicModal({ open, onClose }) {

  // 🌟 ستايل موحد تم تعديله لإجبار الحافة (Notch) والنص على التموضع يميناً بشكل صحيح ومريح للعين
  const rtlTextFieldStyle = {
    '& .MuiInputLabel-root': {
      right: 35, // إزاحة التسمية لتفادي الأيقونة
      left: 'auto',
      transformOrigin: 'top right',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, -6px) scale(0.75)', // تموضع الليبل عند الارتفاع لأعلى
      right: 35,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      textAlign: 'right', // 🔑 هذا السطر السحري الذي ينقل فتحة الحافة لليمين
    },
    '& .MuiOutlinedInput-root': {
      paddingRight: '8px',
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "8px",
          direction: "rtl" 
        }
      }}
    >
      {/* الهيدر */}
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
          
          {/* اسم العيادة */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="اسم العيادة"
              placeholder="مثال: عيادة الأسنان المتقدمة"
              variant="outlined"
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
                defaultValue=""
                startAdornment={
                  <InputAdornment position="start" style={{ marginRight: "8px" }}>
                    <StethoscopeIcon sx={{ color: "#a1a9c3" }} />
                  </InputAdornment>
                }
              >
                <MenuItem value={1}>طب الأسنان</MenuItem>
                <MenuItem value={2}>الأطفال</MenuItem>
                <MenuItem value={3}>القلبية</MenuItem>
                <MenuItem value={4}>الداخلية</MenuItem>
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
                  defaultChecked 
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

      {/* أزرار التحكم */}
      <DialogActions sx={{ p: 2, gap: 1, justifyContent: 'flex-start' }}>
        <Button 
          variant="contained" 
          onClick={onClose}
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
          حفظ البيانات
        </Button>
        <Button 
          variant="outlined" 
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
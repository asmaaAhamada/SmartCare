import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  InputAdornment,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Lock,
  LocalHospital,
  Badge,
  Work,
  AttachMoney,
  Description,
  Wc
} from '@mui/icons-material';

// استيراد الـ actions والـ thunk من السلايس الخاص بكِ
import { setformInfo, resetForm, clearError, Add_Doctors } from '../../backend/slice/doctors/Add'; 
// استيراد أكسشن جلب الأطباء لتحديث الجدول تلقائياً
import { fetchDoctors } from '../../backend/slice/doctors/fetchAll'; 

export default function AddDoctorForm({ onCancel }) {
  const dispatch = useDispatch();
  
  // جلب البيانات والحالات من الـ Redux Store بناءً على اسم السلايس المعتمد
  const { formInfo, isLoading, error, success } = useSelector((state) => state.Add_Doctors);

  const mainColor = '#035970';

  // معالجة حالة النجاح تلقائياً
  useEffect(() => {
    if (success) {
      // 1. إعادة جلب قائمة الأطباء لتحديث الجدول مباشرة في الخلفية
      dispatch(fetchDoctors());
      // 2. تصفير حقول الفورم من السلايس
      dispatch(resetForm());
      // 3. إغلاق المودال المنبثق
      if (onCancel) onCancel();
    }
  }, [success, dispatch, onCancel]);

  // تنظيف الأخطاء وتصفير الفورم عند إغلاق الكومبوننت
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // التحديث مباشرة داخل الـ Redux Store عند الكتابة
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(setformInfo({
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // استدعاء دالة إضافة الطبيب من السلايس
    dispatch(Add_Doctors());
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          width: '100%', 
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f5f9ff)', 
        }}
      >
        <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold', color: mainColor, textAlign: 'right' }}>
          إضافة طبيب جديد
        </Typography>
        <Divider sx={{ mb: 3, backgroundColor: '#e3f2fd' }} />

        {/* عرض رسالة خطأ فريندلي في حال وجود مشكلة من السيرفر */}
        {error && (
          <Alert severity="error" dir="rtl" sx={{ mb: 3, borderRadius: 2, fontWeight: 'medium' }}>
            {error || 'عذراً، حدث خطأ غير متوقع أثناء إضافة البيانات. يرجى التحقق وإعادة المحاولة.'}
          </Alert>
        )}

        <form onSubmit={handleSubmit} dir="rtl">
          <Grid container spacing={2}>
            
            {/* الاسم الأول */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="الاسم الأول"
                name="first_name"
                value={formInfo.first_name}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Person sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* اسم العائلة */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="اسم العائلة"
                name="last_name"
                value={formInfo.last_name}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Person sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* البريد الإلكتروني */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                type="email"
                label="البريد الإلكتروني"
                name="email"
                value={formInfo.email}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Email sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* رقم الهاتف */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                type="tel"
                label="رقم الهاتف"
                name="phone"
                value={formInfo.phone}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Phone sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* كلمة المرور */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                type="password"
                label="كلمة المرور"
                name="password"
                value={formInfo.password}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* التخصص */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                select
                label="التخصص"
                name="specialty_id"
                value={formInfo.specialty_id}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LocalHospital sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              >
                <MenuItem value={1}>طب عام</MenuItem>
                <MenuItem value={2}>طب أطفال</MenuItem>
                <MenuItem value={3}>أمراض القلب</MenuItem>
              </TextField>
            </Grid>

            {/* رقم الترخيص */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="رقم الترخيص الطبي"
                name="license_number"
                value={formInfo.license_number}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Badge sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* سنوات الخبرة */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="سنوات الخبرة"
                name="years_experience"
                value={formInfo.years_experience}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Work sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* رسوم الاستشارة */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="رسوم الاستشارة"
                name="consultation_fee"
                value={formInfo.consultation_fee}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AttachMoney sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* الجنس */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                select
                label="الجنس"
                name="gender"
                value={formInfo.gender}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Wc sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              >
                <MenuItem value="male">ذكر</MenuItem>
                <MenuItem value="female">أنثى</MenuItem>
              </TextField>
            </Grid>

            {/* النبذة التعريفية */}
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={1}
                label="النبذة التعريفية (Bio)"
                name="bio"
                value={formInfo.bio}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: mainColor }, '& .MuiInputLabel-root.Mui-focused': { color: mainColor } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Description sx={{ color: mainColor, fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Grid>

            {/* السويتشات */}
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={formInfo.home_service}
                    onChange={handleChange}
                    name="home_service"
                    disabled={isLoading}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: mainColor },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: mainColor }
                    }}
                  />
                }
                label="زيارة منزلية"
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={formInfo.video_consultation}
                    onChange={handleChange}
                    name="video_consultation"
                    disabled={isLoading}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: mainColor },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: mainColor }
                    }}
                  />
                }
                label="استشارات فيديو"
              />
            </Grid>

            {/* أزرار التحكم */}
            <Grid item xs={12} sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-start', mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                disabled={isLoading}
                sx={{
                  backgroundColor: mainColor,
                  color: '#fff',
                  px: 3,
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#024456' }
                }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'إضافة الطبيب'}
              </Button>
              <Button
                variant="outlined"
                size="medium"
                onClick={onCancel}
                disabled={isLoading}
                sx={{
                  borderColor: '#b0bec5',
                  color: '#78909c',
                  px: 3,
                  fontWeight: 'bold',
                  '&:hover': { borderColor: '#78909c', backgroundColor: '#f5f5f5' }
                }}
              >
                إلغاء
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
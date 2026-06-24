import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from "@emotion/react";
import { Alert, Button, LinearProgress, IconButton, alpha } from "@mui/material"; 
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; 
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import { baby_blue, darkblue } from '../../color-main/color';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { clearError, Log_in, setformInfo, setError } from '../../backend/slice/auth/log_in_Slice';

// استيراد الصورة الخلفية للقسم الأيمن
import bgImage from '../../assets/image/image.jpg'; 

export default function LoginPage() {
  const medicalTealColor =baby_blue; 
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const {  password, email } = useSelector((state) => state.Log_in.formInfo);
  const { isLoading, error } = useSelector((state) => state.Log_in);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

 async function Login(e) {
    e.preventDefault();
    dispatch(clearError());

    // التحقق من الحقول (Validation)
    let hasError = false;

    if (!email) {
      dispatch(setError({ email: "Email is required" }));
      hasError = true;
    }

    if (!password) {
      dispatch(setError({ password: "Password is required" }));
      hasError = true;
    }

    if (hasError) return;

    try {
      // هنا قمنا بحفظ النتيجة في resultAction مباشرة بعد عمل unwrap
      const response = await dispatch(Log_in()).unwrap();
      
      // بما أننا استخدمنا unwrap، فالوصول للـ role يكون مباشرة من الاستجابة الناجحة
      const role = response?.role; 

     if (response?.data?.admin?.role === "admin") {
  navigate("/dashbord");

      } else {
        console.log("تم تسجيل الدخول ولكن الصلاحية ليست أدمن:", role);
      }

    } catch (apiError) {
      // الـ unwrap سيرسل الخطأ تلقائياً إلى هنا عند الفشل
      console.error("خطأ التسجيل من الباكيند:", apiError);
    }
  } 
    
  

  // ستايل الحقول مع ضبط المحاذاة والخطوط
  const textFieldStyles = {
    "& .MuiInputLabel-r// هنا تم إغلاق الدالة بشكل صحيح تماماً 👍oot": { 
      fontFamily: arabicFont, 
      color: "text.disabled", 
      right: 16, 
      left: "auto",
      transformOrigin: "right"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(-14px, -9px) scale(0.75)" 
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { textAlign: "right" }
    },
    "& .MuiFormHelperText-root": {
      fontFamily: arabicFont,
      textAlign: "right"
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        position: 'relative',
        backgroundColor: '#f0f2f5',
        p: { xs: 2, md: 0 }
      }}
    >
      {/* طبقات الخلفيات المضيئة الملونة */}
      <Box sx={{
        position: 'absolute',
        width: 300,
        height: 300,
        background: darkblue,
        filter: 'blur(120px)',
        borderRadius: '50%',
        top: -50,
        left: -50,
        opacity: 0.4,
        zIndex: 1,
      }} />

      <Box sx={{
        position: 'absolute',
        width: 250,
        height: 250,
        background: '#6366f1',
        filter: 'blur(120px)',
        borderRadius: '50%',
        bottom: -50,
        right: -50,
        opacity: 0.4,
        zIndex: 1,
      }} />

      {/* الكارد الرئيسي المقسوم بالنصف هندسياً */}
      <Card 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: { xs: '100%', sm: '90%', md: '850px' }, 
          height: { xs: 'auto', md: '530px' },
          boxShadow: 8,
          borderRadius: '16px',
          overflow: 'hidden',
          zIndex: 2,
          position: 'relative'
        }}
      >
        {/* القسم الأيمن: يحمل صورة الطاقم الطبي */}
        <Box sx={{ 
          flex: 1, 
          height: '100%',
          display: { xs: 'none', md: 'block' },
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />

        {/* القسم الأيسر: يحمل الفورم والنصوص الترحيبية والحقول */}
        <Box
          component="form"
          onSubmit={Login}
          autoComplete="new-password"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            p: { xs: 3, md: 4 },
            direction: 'rtl'
          }}
        >
          {/* الجملة الترحيبية المحدثة باللون الطبي المطابق للملابس */}
          <Box sx={{ textAlign: 'center', mb: 3, width: '100%' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color: medicalTealColor, fontFamily: arabicFont }}>
              مرحباً بك مجدداً!
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', fontFamily: arabicFont, mt: 0.5 }}>
              يرجى تسجيل الدخول للمتابعة إلى حسابك
            </Typography>
          </Box>

          {/* البوكس المخصص لاحتواء الحقول بشكل منظم داخلياً */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}>
            
            {/* حقل البريد الإلكتروني مع نقل الأيقونة لجهة اليسار (endAdornment) */}
            <TextField
              value={email}
              onChange={(e) => dispatch(setformInfo({ email: e.target.value }))}
              fullWidth
              label="البريد الإلكتروني"
              error={!!error.email}
              helperText={error.email}
              autoComplete="new-password"
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutlineIcon sx={{ color: medicalTealColor, mx: 0.5 }} />
                  </InputAdornment>
                ),
              }}
              inputProps={{ 
                style: { fontFamily: arabicFont, textAlign: 'right' }
              }}
            />

           

            {/* حقل كلمة المرور والأيقونة مرتبة يساراً بشكل تلقائي كالعين */}
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => dispatch(setformInfo({ password: e.target.value }))}
              fullWidth
              label="كلمة المرور"
              error={!!error.password}
              helperText={error.password}
              autoComplete="new-password"
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility sx={{ color: medicalTealColor }}/> : <VisibilityOff sx={{ color: medicalTealColor }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{ 
                style: { fontFamily: arabicFont, textAlign: 'right' }
              }}
            />

            {/* خطأ الـ API الفني عند حدوث مشكلة */}
            {error.general && (
              <Alert severity="error" sx={{ fontFamily: arabicFont, mt: 1 }}>
                {error.general}
              </Alert>
            )}

            {/* منطقة زر تسجيل الدخول أو لودر التحميل اللحظي بلون الثيم الجديد */}
            <Box sx={{ mt: 1 }}>
              {isLoading ? (
                <LinearProgress sx={{ backgroundColor: medicalTealColor, borderRadius: 1, height: 5 }} />
              ) : (
                <Button
                  type="submit"
                  sx={{ 
                    backgroundColor: medicalTealColor,
                    fontFamily: arabicFont,
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    py: 1.2,
                    borderRadius: 2,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: alpha(medicalTealColor, 0.85)
                    }
                  }}
                  variant="contained"
                  fullWidth
                >
                  تسجيل الدخول
                </Button>
              )}
            </Box>

          </Box>
        </Box>
      </Card>
    </Container>
  );
}
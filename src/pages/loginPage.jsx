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
import { darkblue } from '../color-main/color';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { clearError, Log_in, setformInfo, setError } from '../backend/slice/log_in_Slice';

export default function LoginPage() {
  const brightButtonColor = "#00b4d8"; 
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { username, password, email } = useSelector((state) => state.Log_in.formInfo);
  const { isLoading, error } = useSelector((state) => state.Log_in);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  async function Login() {
    dispatch(clearError());

    // validation
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
      await dispatch(Log_in()).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  // ستايل موحد لتفتيح لون الليبل وجعل النص من اليمين لليسار
  const textFieldStyles = {
    "& .MuiInputLabel-root": { 
      fontFamily: arabicFont, 
      color: "text.disabled", // رمادي فاتح
      right: 28, // إزاحة تسمح بظهور الليبل من اليمين بشكل ممتاز مع الأيقونة
      left: "auto",
      transformOrigin: "right"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(-14px, -9px) scale(0.75)" // ضبط مكان الليبل عند الارتفاع
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
      maxWidth="sm"
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        position: 'relative',
      }}
    >
      {/* خلفيات */}
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
      }} />

      <Card 
        dir="rtl" 
        component="form"
        autoComplete="new-password" // تمنع الحفظ التلقائي على مستوى الكارد بالكامل
        sx={{
          width: '100%',
          boxShadow: 8,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3, 
          p: 4,
          zIndex: 2,
          mt: -15,
          fontFamily: arabicFont
        }}
      >
        
        {/* الجملة الترحيبية */}
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color: darkblue, fontFamily: arabicFont }}>
            مرحباً بك مجدداً!
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', fontFamily: arabicFont, mt: 0.5 }}>
            يرجى تسجيل الدخول للمتابعة إلى حسابك
          </Typography>
        </Box>

        {/* حقل البريد الإلكتروني */}
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
            // نقل الأيقونة لـ startAdornment حتى تصبح باليمين ولا يتداخل النص العربي معها
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon sx={{ color: brightButtonColor }} />
              </InputAdornment>
            ),
          }}
          inputProps={{ 
            style: { fontFamily: arabicFont, textAlign: 'right' }
          }}
        />

        {/* حقل اسم المستخدم */}
        <TextField
          type='text'
          value={username}
          onChange={(e) => dispatch(setformInfo({ username: e.target.value }))}
          fullWidth
          label="اسم المستخدم"
          autoComplete="new-password"
          sx={textFieldStyles}
          InputProps={{
            // نقل الأيقونة لـ startAdornment
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon sx={{ color: brightButtonColor }} />
              </InputAdornment>
            ),
          }}
          inputProps={{ 
            style: { fontFamily: arabicFont, textAlign: 'right' }
          }}
        />

        {/* حقل كلمة المرور */}
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
            // تم الحفاظ على أيقونة الإظهار في اليسار (endAdornment) لتوازن التصميم الهندسي للمدخل العربي
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility sx={{ color: brightButtonColor }}/> : <VisibilityOff sx={{ color: brightButtonColor }} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ 
            style: { fontFamily: arabicFont, textAlign: 'right' }
          }}
        />

        {/* خطأ الـ API */}
        {error.general && (
          <Alert severity="error" sx={{ fontFamily: arabicFont }}>
            {error.general}
          </Alert>
        )}

        {/* زر تسجيل الدخول */}
        {isLoading ? (
          <LinearProgress sx={{ backgroundColor: theme.palette.primary?.button || brightButtonColor }} />
        ) : (
          <Button
            sx={{ 
              backgroundColor: brightButtonColor,
              fontFamily: arabicFont,
              fontWeight: 700,
              fontSize: '1.05rem',
              py: 1.2,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: alpha(brightButtonColor, 0.85)
              }
            }}
            onClick={Login}
            variant="contained"
            fullWidth
          >
            تسجيل الدخول
          </Button>
        )}
      </Card>
    </Container>
  );
}
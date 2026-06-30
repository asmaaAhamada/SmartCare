import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from "@emotion/react";
import { Alert, Button, LinearProgress, IconButton, alpha, FormControl, InputLabel, Select, MenuItem } from "@mui/material"; 
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; 
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import BadgeIcon from '@mui/icons-material/Badge'; // أيقونة إضافية للقائمة المنسدلة
import { baby_blue, darkblue } from '../../color-main/color';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { clearError, Log_in, setformInfo, setError } from '../../backend/slice/auth/log_in_Slice';

import bgImage from '../../assets/image/image.jpg'; 

export default function LoginPage() {
  const medicalTealColor = baby_blue; 
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  // 🌟 استدعاء الـ loginType من السلايس
  const { password, email, loginType } = useSelector((state) => state.Log_in.formInfo);
  const { isLoading, error } = useSelector((state) => state.Log_in);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  async function Login(e) {
    e.preventDefault();
    dispatch(clearError());

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
      const response = await dispatch(Log_in()).unwrap();
      
      // 🌟 فحص الرول بشكل مرن لأن الأدمن يرجع بـ admin والموظف بـ staff
      const userObj = response?.data?.admin || response?.data?.staff;
      const role = userObj?.role;
      
      console.log("الرول الحالي:", role);

      switch (role) {
        case "admin":
          navigate("/dashbord");
          break;
        case "lab":
          navigate("/dashbord/lab");
          break;
        case "pharmacist":
          navigate("/dashbord/pharmacy");
          break;
        case "accountant": // أضفت المحاسب بناءً على ريسبرنس الباكيند الخاص بك
          navigate("/dashbord/accountant"); 
          break;
        default:
          console.log("صلاحية غير معروفة، توجه للرئيسية");
          navigate("/dashbord");
      }
    } catch (apiError) {
      console.error("خطأ التسجيل من الباكيند:", apiError);
    }
  } 

  const textFieldStyles = {
    "& .MuiInputLabel-root": { 
      fontFamily: arabicFont, 
      color: "text.disabled", 
      right: 16, 
      left: "auto",
      transformOrigin: "top right"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, -9px) scale(0.75)", 
      right: 16,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      textAlign: "right" 
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
      {/* طبقات الخلفيات */}
      <Box sx={{ position: 'absolute', width: 300, height: 300, background: darkblue, filter: 'blur(120px)', borderRadius: '50%', top: -50, left: -50, opacity: 0.4, zIndex: 1 }} />
      <Box sx={{ position: 'absolute', width: 250, height: 250, background: '#6366f1', filter: 'blur(120px)', borderRadius: '50%', bottom: -50, right: -50, opacity: 0.4, zIndex: 1 }} />

      <Card sx={{ display: 'flex', flexDirection: 'row', width: { xs: '100%', sm: '90%', md: '850px' }, height: { xs: 'auto', md: '560px' }, boxShadow: 8, borderRadius: '16px', overflow: 'hidden', zIndex: 2, position: 'relative' }}>
        
        <Box sx={{ flex: 1, height: '100%', display: { xs: 'none', md: 'block' }, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />

        <Box component="form" onSubmit={Login} autoComplete="new-password" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', p: { xs: 3, md: 4 }, direction: 'rtl' }}>
          
          <Box sx={{ textAlign: 'center', mb: 3, width: '100%' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color: medicalTealColor, fontFamily: arabicFont }}>
              مرحباً بك مجدداً!
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', fontFamily: arabicFont, mt: 0.5 }}>
              يرجى تحديد نوع الحساب وتسجيل الدخول للمتابعة
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}>
            
            {/* 🌟 المكون الجديد: Dropdown واجهة تسجيل الدخول */}
            <FormControl fullWidth sx={textFieldStyles}>
              <InputLabel id="login-type-label" sx={{ fontFamily: arabicFont }}>نوع الحساب</InputLabel>
              <Select
                labelId="login-type-label"
                value={loginType}
                label="نوع الحساب"
                onChange={(e) => dispatch(setformInfo({ loginType: e.target.value }))}
                style={{ fontFamily: arabicFont, textAlign: 'right' }}
                startAdornment={
                  <InputAdornment position="start">
                    <BadgeIcon sx={{ color: medicalTealColor, mx: 0.5 }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="admin" style={{ fontFamily: arabicFont, direction: 'rtl' }}>مدير النظام (Admin)</MenuItem>
                <MenuItem value="staff" style={{ fontFamily: arabicFont, direction: 'rtl' }}>الكادر الطبي والوظيفي (Staff)</MenuItem>
              </Select>
            </FormControl>

            {/* حقل البريد الإلكتروني */}
            <TextField
              value={email}
              onChange={(e) => dispatch(setformInfo({ email: e.target.value }))}
              fullWidth
              label="البريد الإلكتروني"
              error={!!error.email}
              autoComplete="new-password"
              sx={textFieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: medicalTealColor, mx: 0.5 }} />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { fontFamily: arabicFont, textAlign: 'right' } }}
            />

            {/* حقل كلمة المرور */}
            <TextField
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => dispatch(setformInfo({ password: e.target.value }))}
              fullWidth
              label="كلمة المرور"
              error={!!error.password}
              autoComplete="new-password"
              sx={textFieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleClickShowPassword} edge="start">
                      {showPassword ? <Visibility sx={{ color: medicalTealColor }}/> : <VisibilityOff sx={{ color: medicalTealColor }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { fontFamily: arabicFont, textAlign: 'right' } }}
            />

            {error.general && (
              <Alert severity="error" sx={{ fontFamily: arabicFont, mt: 1 }}>
                {error.general}
              </Alert>
            )}

            <Box sx={{ mt: 1 }}>
              {isLoading ? (
                <LinearProgress sx={{ backgroundColor: medicalTealColor, borderRadius: 1, height: 5 }} />
              ) : (
                <Button type="submit" sx={{ backgroundColor: medicalTealColor, fontFamily: arabicFont, fontWeight: 700, fontSize: '1.05rem', py: 1.2, borderRadius: 2, color: 'white', '&:hover': { backgroundColor: alpha(medicalTealColor, 0.85) } }} variant="contained" fullWidth>
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
import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

const PharmacyDashboard = () => {
  const location = useLocation();
  const pharmacyColor = '#4A148C';

  // التحقق مما إذا كان المستخدم يقف على المسار الرئيسي للصيدلية تماماً لتظهر الرسالة الترحيبية
  const isDefaultRoute = location.pathname === '/dashbord/pharmacy' || location.pathname === '/dashbord/pharmacy/';

  return (
    <Box p={3} dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <Card 
        variant="outlined" 
        style={{ 
          padding: 32, 
          borderRadius: '24px', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
          backgroundColor: '#ffffff',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isDefaultRoute ? 'center' : 'flex-start',
          alignItems: isDefaultRoute ? 'center' : 'stretch',
          border: '1px solid rgba(74, 20, 140, 0.08)'
        }}
      >
        {isDefaultRoute ? (
          // ================= واجهة الترحيب الافتراضية المذهلة =================
          <Box 
            textAlign="center" 
            sx={{ 
              opacity: 0,
              animation: 'fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(30px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            {/* حاوي الفيديو بتأثير عصري ناعم متناسق مع الهوية */}
            <Box 
              sx={{ 
                width: '100%', 
                maxWidth: '460px', 
                margin: '0 auto 32px', 
                borderRadius: '24px', 
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(74, 20, 140, 0.12)',
                background: 'linear-gradient(145deg, #ffffff, #f3e5f5)',
                padding: '6px', // يعطي إيحاء بإطار داخلي ناعم جداً
                border: '1px solid rgba(74, 20, 140, 0.15)'
              }}
            >
              <Box sx={{ borderRadius: '18px', overflow: 'hidden' }}>
                <video 
                  src="https://assets.mixkit.co/videos/preview/mixkit-pharmacist-preparing-a-prescription-41584-large.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                />
              </Box>
            </Box>

            {/* جملة ترحيبية تظهر بتتابع أنيق */}
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                color: pharmacyColor, 
                mb: 1.5, 
                fontFamily: 'inherit',
                opacity: 0,
                animation: 'fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                animationDelay: '0.3s'
              }}
            >
              أهلاً بك في نظام الصيدلية الذكي ✨
            </Typography>

            {/* نص التوجيه الفرعي بنبض رقمي هادئ جداً */}
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'inherit', 
                fontSize: '16px',
                color: 'text.secondary',
                opacity: 0,
                animation: 'fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards, pulseSoft 3s ease-in-out infinite',
                animationDelay: '0.5s',
                '@keyframes pulseSoft': {
                  '0%, 100%': { opacity: 0.8 },
                  '50%': { opacity: 0.5 }
                }
              }}
            >
              الرجاء اختيار صفحة معينة من القائمة الجانبية لبدء المعاينة والإدارة
            </Typography>
          </Box>
        ) : (
          // ================= عرض الصفحات الفرعية عند الضغط عليها من السايدبر =================
          <Box 
            sx={{ 
              animation: 'fadeIn 0.4s ease-out forwards',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
              }
            }}
          >
            <Outlet />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default PharmacyDashboard;
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
          padding: 24, 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          backgroundColor: '#ffffff',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isDefaultRoute ? 'center' : 'flex-start',
          alignItems: isDefaultRoute ? 'center' : 'stretch'
        }}
      >
        {isDefaultRoute ? (
          // ================= واجهة الترحيب الافتراضية المذهلة =================
          <Box 
            textAlign="center" 
            sx={{ 
              animation: 'fadeInUp 0.8s ease-out-in-forward',
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            {/* أنميشن دائري لطيف كخلفية للفيديو الطبي */}
            <Box 
              sx={{ 
                width: '100%', 
                maxWidth: '450px', 
                margin: '0 auto 24px', 
                borderRadius: '24px', 
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(74, 20, 140, 0.15)',
                border: `3px solid ${pharmacyColor}`
              }}
            >
              {/* قمنا بوضع فيديو توضيحي طبي عالي الجودة يدعم الـ Autoplay والـ Loop */}
              <video 
                src="https://assets.mixkit.co/videos/preview/mixkit-pharmacist-preparing-a-prescription-41584-large.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </Box>

            {/* جملة ترحيبية متحركة */}
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ color: pharmacyColor, mb: 1, fontFamily: 'inherit' }}
            >
              أهلاً بك في نظام الصيدلية الذكي ✨
            </Typography>

            <Typography 
              variant="body1" 
              color="textSecondary" 
              sx={{ 
                fontFamily: 'inherit', 
                fontSize: '16px',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.7 },
                  '50%': { opacity: 1 }
                }
              }}
            >
              الرجاء اختيار صفحة معينة من القائمة الجانبية لبدء المعاينة والإدارة
            </Typography>
          </Box>
        ) : (
          // ================= عرض الصفحات الفرعية عند الضغط عليها من السايدبر =================
          <Outlet />
        )}
      </Card>
    </Box>
  );
};

export default PharmacyDashboard;
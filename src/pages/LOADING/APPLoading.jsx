import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // يمكنكِ تغيير الأيقونة لما يناسبك
import { styled, keyframes } from '@mui/system';

// حركية النبض الطبي للأيقونة لجعل اللودر "Friendly" وتفاعلي
const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

const PulsingIconWrapper = styled(Box)({
  animation: `${pulse} 1.5s infinite ease-in-out`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
});

const APPLoading = ({ message = "جاري الدخول إلى العيادات..." }) => {
  const brandColor = "#035970";

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // خلفية شفافة بيضاء مريحة
        backdropFilter: 'blur(4px)', // تأثير ضبابي خفيف للخلفية
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999, // لضمان ظهوره فوق كل العناصر
      }}
    >
      {/* منطقة الدوائر والأنيميشن */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        {/* لودر دائري خارجي بلونك المفضل */}
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: brandColor,
          }}
        />
        {/* الأيقونة الطبية التي تنبض بالداخل */}
        <PulsingIconWrapper>
          <LocalHospitalIcon sx={{ fontSize: 35, color: brandColor }} />
        </PulsingIconWrapper>
      </Box>

      {/* النص المرافق للتحميل */}
      <Typography
        variant="h6"
        sx={{
          color: brandColor,
          fontWeight: 600,
          fontFamily: 'inherit', // سيعتمد على خط الخطوط العربية بالتطبيق عندك
          direction: 'rtl',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default APPLoading;
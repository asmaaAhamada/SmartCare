import React from 'react';
import { Box, Typography } from '@mui/material';
import MedicineIcon from '@mui/icons-material/LocalPharmacy';

const MedicalLoader = () => {
  const pharmacyColor = '#4A148C';

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      p={5} 
      minHeight="350px"
      width="100%"
    >
      <Box 
        sx={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          mb: 3
        }}
      >
        {/* الدائرة الخلفية النابضة (أنميشن نبضات القلب الطبية) */}
        <Box 
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: `${pharmacyColor}20`,
            animation: 'medicalPulse 1.8s infinite ease-in-out',
            '@keyframes medicalPulse': {
              '0%': { transform: 'scale(0.8)', opacity: 0.5 },
              '50%': { transform: 'scale(1.3)', opacity: 0.8 },
              '100%': { transform: 'scale(1.6)', opacity: 0 }
            }
          }}
        />
        
        {/* الأيقونة الطبية المتحركة */}
        <Box
          sx={{
            backgroundColor: pharmacyColor,
            borderRadius: '50%',
            p: 2,
            boxShadow: '0 4px 15px rgba(74, 20, 140, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            animation: 'floatIcon 2.5s infinite ease-in-out',
            '@keyframes floatIcon': {
              '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
              '50%': { transform: 'translateY(-8px) rotate(10deg)' }
            }
          }}
        >
          <MedicineIcon sx={{ fontSize: '35px', color: '#ffffff' }} />
        </Box>
      </Box>

      {/* نصوص التحميل المتجانسة */}
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        sx={{ color: pharmacyColor, fontFamily: 'inherit', mb: 0.5 }}
      >
        جاري جلب واقتران الوصفات الطبية...
      </Typography>
      <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{ 
          fontFamily: 'inherit',
          animation: 'textFade 1.5s infinite',
          '@keyframes textFade': {
            '0%, 100%': { opacity: 0.6 },
            '50%': { opacity: 1 }
          }
        }}
      >
        الرجاء الانتظار، يتم الآن فحص سجلات الصيدلية الذكية ومطابقة الأدوية
      </Typography>
    </Box>
  );
};

export default MedicalLoader;
import React, { useState, lazy, Suspense } from 'react';
import { Box, Tabs, Tab, CircularProgress, Card, Avatar, Typography } from '@mui/material';
import { MedicalInformation, Inventory, ReceiptLong, BarChart } from '@mui/icons-material';

// استدعاء الأقسام الرئيسية بطريقة التحميل الكسول (Lazy Loading)
const MedicineManager = lazy(() => import('./MedicineManager'));
const InventoryManager = lazy(() => import('./InventoryManager'));
const PrescriptionManager = lazy(() => import('./PrescriptionManager'));
const PharmacyReports = lazy(() => import('./PharmacyReports'));

const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pharmacyColor = '#4A148C'; // لون الصيدلية المعتمد

  return (
    <Box p={3} dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      
      {/* القسم العلوي: رفع التابات لأعلى الصفحة مدمج مع الأفاتار الصيدلاني ذو المريول الطبي */}
      <Card 
        variant="outlined" 
        style={{ 
          padding: '12px 24px', 
          borderRadius: '16px', 
          marginBottom: 20, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          background: '#fdfbfe'
        }}
      >
        {/* التابات مرفوعة لأعلى اليمين */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="secondary"
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: pharmacyColor, height: '3px' },
            '& .MuiTab-root': { fontFamily: 'inherit', fontWeight: 'bold', fontSize: '15px', minHeight: '60px' },
            '& .Mui-selected': { color: `${pharmacyColor} !important` },
          }}
        >
          <Tab icon={<MedicalInformation />} iconPosition="start" label="إدارة الأدوية" />
          <Tab icon={<Inventory />} iconPosition="start" label="المخزون المستودعي" />
          <Tab icon={<ReceiptLong />} iconPosition="start" label="الوصفات الطبية" />
          <Tab icon={<BarChart />} iconPosition="start" label="التقارير والإحصائيات" />
        </Tabs>

        {/* يوزر يسار الهيدر يرتدي مريول الصيدلة مرتكي بجانب الاسم البرمجي بدقة كرتونية */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box textAlign="left">
            <Typography variant="subtitle2" color="textSecondary" style={{ fontFamily: 'inherit' }}>أهلاً بك دكتور،</Typography>
            <Typography variant="body1" fontWeight="bold" style={{ color: pharmacyColor, fontFamily: 'inherit' }}>الصيدلاني المناوب</Typography>
          </Box>
          <Avatar 
            alt="Pharmacist Avatar" 
            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" 
            sx={{ 
              width: 55, 
              height: 55, 
              border: `2px solid ${pharmacyColor}`,
              boxShadow: '0px 4px 10px rgba(74, 20, 140, 0.15)'
            }} 
          />
        </Box>
      </Card>

      {/* عرض المحتوى الخاص بكل تاب مع الحفاظ على الأداء العالي */}
      <Card variant="outlined" style={{ padding: 24, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" pt={10}><CircularProgress style={{ color: pharmacyColor }} /></Box>}>
          {activeTab === 0 && <MedicineManager pharmacyColor={pharmacyColor} />}
          {activeTab === 1 && <InventoryManager pharmacyColor={pharmacyColor} />}
          {activeTab === 2 && <PrescriptionManager pharmacyColor={pharmacyColor} />}
          {activeTab === 3 && <PharmacyReports pharmacyColor={pharmacyColor} />}
        </Suspense>
      </Card>
    </Box>
  );
};

export default PharmacyDashboard;
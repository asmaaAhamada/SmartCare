import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Divider } from '@mui/material';
import { Description, AssignmentTurnedIn, Leaderboard, PieChart } from '@mui/icons-material';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer } from 'victory';

const PharmacyReports = ({ pharmacyColor }) => {
  const [record, setRecord] = useState({ patientName: '', diagnosis: '', prescribedMeds: '' });

  // بيانات مبيعات ومخزون الأدوية للمخططات الإحصائية الطبية
  const barChartData = [
    { label: "المسكنات", count: 35 },
    { label: "المضادات", count: 28 },
    { label: "السكري", count: 19 },
    { label: "الضغط", count: 42 }
  ];

  const pieChartData = [
    { x: "متوفر", y: 75 },
    { x: "حرج", y: 15 },
    { x: "منفد", y: 10 }
  ];

  const handleCreateRecord = () => {
    alert(`تم حفظ الـ Medical Record الدوائي بنجاح للمريض: ${record.patientName}`);
    setRecord({ patientName: '', diagnosis: '', prescribedMeds: '' });
  };

  return (
    <Box dir="rtl">
      
      {/* قسم الإحصائيات التحليلية الرسومية */}
      <Grid container spacing={3} mb={4}>
        
        {/* المخطط الأول العمودي: تصنيفات الأدوية الأكثر صرفاً */}
        <Grid item xs={12} md={7}>
          <Card variant="outlined" style={{ borderRadius: '12px', padding: '10px' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" style={{ color: pharmacyColor, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Leaderboard /> معدلات صرف الفئات العلاجية لهذا الأسبوع
              </Typography>
              <Box height={260} dir="ltr">
                <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={25}
                  height={240}
                  containerComponent={<VictoryContainer responsive={true} />}
                >
                  <VictoryAxis 
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={barChartData.map(d => d.label)}
                    style={{ tickLabels: { fontFamily: 'Cairo, sans-serif', fontSize: 11, padding: 5 } }}
                  />
                  <VictoryAxis 
                    dependentAxis 
                    style={{ tickLabels: { fontFamily: 'Cairo, sans-serif', fontSize: 11 } }}
                  />
                  <VictoryBar
                    data={barChartData.map((d, index) => ({ x: index + 1, y: d.count }))}
                    style={{ data: { fill: pharmacyColor, width: 22 } }}
                    animate={{ duration: 1000, onLoad: { duration: 500 } }}
                  />
                </VictoryChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* المخطط الثاني الدائري: حالة سلامة المخزون العام */}
        <Grid item xs={12} md={5}>
          <Card variant="outlined" style={{ borderRadius: '12px', padding: '10px' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" style={{ color: pharmacyColor, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PieChart /> النسبة المئوية لسلامة مستودع الأدوية
              </Typography>
              <Box height={260} display="flex" justifyContent="center" alignItems="center">
                <VictoryPie
                  data={pieChartData}
                  colorScale={[pharmacyColor, "#ff9800", "#ef5350"]}
                  height={220}
                  padding={45}
                  innerRadius={45}
                  style={{ labels: { fontFamily: 'Cairo, sans-serif', fontSize: 12, fontWeight: 'bold' } }}
                  animate={{ duration: 1000 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider style={{ margin: '25px 0' }} />

      {/* قسم السجل الطبي الدوائي المعتمد */}
      <Typography variant="h6" fontWeight="bold" mb={2} style={{ color: pharmacyColor, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}>
        <Description /> إنشاء سجل صرف طبي (Medical Record)
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth size="small" label="اسم المريض الثلاثي" value={record.patientName} onChange={(e) => setRecord({...record, patientName: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth size="small" label="التشخيص / الأعراض العامة" value={record.diagnosis} onChange={(e) => setRecord({...record, diagnosis: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={3} label="الخطة الدوائية المصروفة وملاحظات الصيدلاني الكيميائية" value={record.prescribedMeds} onChange={(e) => setRecord({...record, prescribedMeds: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
        </Grid>
        <Grid item xs={12} textAlign="left">
          <Button variant="contained" startIcon={<AssignmentTurnedIn />} style={{ backgroundColor: pharmacyColor, fontFamily: 'inherit', fontWeight: 'bold' }} onClick={handleCreateRecord}>
            تثبيت السجل الطبي بالمنظومة
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PharmacyReports;
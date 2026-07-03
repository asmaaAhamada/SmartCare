import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Divider } from '@mui/material';
import { Description, AssignmentTurnedIn, Leaderboard, PieChart } from '@mui/icons-material';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer, VictoryLabel } from 'victory';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdashboard } from '../../backend/slice/pharmecy/fetchdashboard';
import CircularProgress from "@mui/material/CircularProgress";
import { fetchReport } from '../../backend/slice/pharmecy/fetchreport';

const PharmacyReports = ({ pharmacyColor }) => {
  const [record, setRecord] = useState({ patientName: '', diagnosis: '', prescribedMeds: '' });
  const dispatch = useDispatch();

  // جلب بيانات لوحة التحكم
  const { data: dashboardData, isLoading: isDashboardLoading } = useSelector(
    (state) => state.fetchdashboard
  );
  const dashboard = dashboardData?.data;

  // جلب بيانات التقارير (الأدوية وكمياتها)
  const { data: reportResponse, isLoading: isReportLoading } = useSelector(
    (state) => state.fetchReport
  );
  
  // استخراج المصفوفة القادمة من الباك إند
  const reportData = reportResponse?.data || [];

  useEffect(() => {
    dispatch(fetchReport());
    dispatch(fetchdashboard());
  }, [dispatch]);

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (!isDashboardLoading && dashboard) {
      const timer = setTimeout(() => {
        setShowChart(true);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isDashboardLoading, dashboard]);

  // تجهيز بيانات مخطط الأعمدة بناءً على بيانات الباك إند الحقيقية
  // تحويل "medication_name" إلى label و "quantity" إلى count
  const barChartData = reportData.map((item) => ({
    label: item.medication_name,
    count: item.quantity,
    needsRestock: item.needs_restock
  }));

  // لوحة ألوان مميزة للمخطط العمودي لتلوين كل دواء بلون فريد ومبهج
  const barColors = [
    "#4A148C", // بنفسجي غامق
    "#7B1FA2", // بنفسجي متوسط
    "#9C27B0", // أرغواني
    "#E91E63", // زهري طبي
    "#00BCD4", // فيروزي
    "#4CAF50", // أخضر عشبي
    "#FF9800"  // برتقالي دافئ
  ];

  // تدرج الألوان البنفسجية للمخطط الدائري
  const purpleColors = [
    "#4A148C", 
    "#6A1B9A", 
    "#8E24AA", 
    "#A29BFE", 
    "#B2BEC3"  
  ];

  const pieChartData = dashboard
    ? [
        { x: "الوصفات المصروفة", y: dashboard.filled_prescriptions },
        { x: "كمية المستودع", y: dashboard.total_inventory_quantity },
        { x: "المخزون المنخفض", y: dashboard.low_stock_items },
        { x: "الوصفات النشطة", y: dashboard.active_prescriptions },
        { x: "إجمالي الأدوية", y: dashboard.total_medications },
      ]
    : [
        { x: "الوصفات المصروفة", y: 34 },
        { x: "كمية المستودع", y: 17 },
        { x: "المخزون المنخفض", y: 15 },
        { x: "الوصفات النشطة", y: 15 },
        { x: "إجمالي الأدوية", y: 10 },
      ];

  const handleCreateRecord = () => {
    alert(`تم حفظ الـ Medical Record الدوائي بنجاح للمريض: ${record.patientName}`);
    setRecord({ patientName: '', diagnosis: '', prescribedMeds: '' });
  };

  return (
    <Box dir="rtl">
      
      {/* قسم الإحصائيات التحليلية الرسومية */}
      <Grid container spacing={3} mb={4}>
        
        {/* المخطط الأول العمودي: كميات الأدوية الحالية من التقارير */}
        <Grid item xs={12} md={7}>
          <Card variant="outlined" style={{ borderRadius: '12px', padding: '10px' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" style={{ color: pharmacyColor, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Leaderboard /> كميات الأدوية الحالية المتوفرة بالمخزن
              </Typography>
              
              <Box height={260} dir="ltr" display="flex" justifyContent="center" alignItems="center">
                {isReportLoading ? (
                  /* لودنغ لطيف ومخصص لمخطط الأعمدة أثناء جلب البيانات */
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <CircularProgress size={50} style={{ color: pharmacyColor }} thickness={4} />
                    <Typography variant="caption" sx={{ fontFamily: 'Cairo', color: '#666' }}>جاري جلب تقارير الأدوية...</Typography>
                  </Box>
                ) : barChartData.length === 0 ? (
                  <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: '#999' }}>لا توجد بيانات متاحة لعرضها حالياً</Typography>
                ) : (
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 35 }}
                    height={240}
                    containerComponent={<VictoryContainer responsive={true} />}
                  >
                    {/* محور الأسماء الدوائية */}
                    <VictoryAxis 
                      tickValues={barChartData.map((_, index) => index + 1)}
                      tickFormat={barChartData.map(d => d.label)}
                      style={{ 
                        tickLabels: { 
                          fontFamily: 'Cairo, sans-serif', 
                          fontSize: 10, 
                          padding: 5,
                          angle: barChartData.length > 4 ? -15 : 0 // تدوير خفيف في حال كانت أسماء الأدوية كثيرة لمنع التداخل
                        } 
                      }}
                    />
                    
                    {/* محور الأرقام والكميات */}
                    <VictoryAxis 
                      dependentAxis 
                      style={{ tickLabels: { fontFamily: 'Cairo, sans-serif', fontSize: 11 } }}
                    />
                    
                    {/* الأعمدة البيانية الملونة مع إظهار القيم فوق كل عمود */}
                    <VictoryBar
                      data={barChartData.map((d, index) => ({ 
                        x: index + 1, 
                        y: d.count,
                        label: d.count // عرض الرقم فوق العمود مباشرة
                      }))}
                      // تخصيص الألوان لكل عمود من المصفوفة المميزة بشكل ديناميكي
                      style={{ 
                        data: { 
                          fill: ({ index }) => barColors[index % barColors.length], 
                          width: 26,
                          borderRadius: 4
                        },
                        labels: {
                          fontFamily: 'Cairo, sans-serif',
                          fontSize: 11,
                          fontWeight: 'bold',
                          fill: '#333'
                        }
                      }}
                      labelComponent={<VictoryLabel dy={-8} />} // تموضع الرقم فوق رأس العمود بلطف
                      animate={{ duration: 1000, onLoad: { duration: 500 } }}
                    />
                  </VictoryChart>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* المخطط الثاني الدائري */}
        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  color: "#1e3a8a",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <PieChart />
                إحصائيات الصيدلية العامة
              </Typography>

              <Box
                height={260}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {isDashboardLoading || !showChart ? (
                  <Box display="flex" justifyContent="center" width="100%">
                    <CircularProgress size={60} style={{ color: '#1e3a8a' }} thickness={4} />
                  </Box>
                ) : (
                  <>
                    {/* المخطط الدائري */}
                    <Box width="60%" dir="ltr">
                      <VictoryPie
                        data={pieChartData}
                        height={240}
                        innerRadius={60}
                        padAngle={2}
                        padding={30}
                        labels={({ datum }) => `${datum.y}%`}
                        colorScale={purpleColors}
                        style={{
                          labels: {
                            fontSize: 11,
                            fontWeight: "bold",
                            fill: "#FFFFFF", 
                          },
                        }}
                        animate={{
                          duration: 1200,
                          onLoad: { duration: 700 }
                        }}
                      />
                    </Box>

                    {/* قائمة الدليل والأسماء */}
                    <Box width="40%" display="flex" flexDirection="column" gap={1.5} pr={1}>
                      {pieChartData.map((item, index) => (
                        <Box key={index} display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: purpleColors[index],
                              flexShrink: 0
                            }}
                          />
                          <Typography variant="caption" fontWeight="500" color="#374151" sx={{ fontFamily: 'Cairo, sans-serif' }}>
                            {item.x}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
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
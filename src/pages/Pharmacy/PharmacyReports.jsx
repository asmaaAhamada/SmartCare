import React, { useEffect, useState } from 'react';
import { 
  Box, Grid, Card, CardContent, Typography, TextField, Button, Divider, 
  MenuItem, Select, InputLabel, FormControl, CircularProgress, Alert, Snackbar 
} from '@mui/material';
import { Description, AssignmentTurnedIn, Leaderboard, PieChart } from '@mui/icons-material';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer, VictoryLabel } from 'victory';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdashboard } from '../../backend/slice/pharmecy/fetchdashboard';
import { fetchReport } from '../../backend/slice/pharmecy/fetchreport';
import { FETCHAPPOETMENTS } from '../../backend/slice/pharmecy/fetchapoetment';
import { createMedicalRecord, setFormInfo, setVitalSigns, resetForm, clearError, clearSuccess } from '../../backend/slice/pharmecy/medical'; 

const PharmacyReports = ({ pharmacyColor }) => {
  const dispatch = useDispatch();

  // جلب بيانات لوحة التحكم والتقارير
  const { data: dashboardData, isLoading: isDashboardLoading } = useSelector((state) => state.fetchdashboard);
  const dashboard = dashboardData?.data;
  const { data: reportResponse, isLoading: isReportLoading } = useSelector((state) => state.fetchReport);
  const reportData = reportResponse?.data || [];

  // جلب المواعيد لربطها بالقائمة المنسدلة
  const { data: appoetmentsData, isLoading: isAppoetmentsLoading } = useSelector((state) => state.FETCHAPPOETMENTS);
  
  // جلب حالة إنشاء السجل الطبي من السلايس
  const { formInfo, Loading: isSavingRecord, error: recordError, success: isRecordSuccess } = useSelector((state) => state.medicalRecord);

  useEffect(() => {
    dispatch(fetchReport());
    dispatch(fetchdashboard());
    dispatch(FETCHAPPOETMENTS());
  }, [dispatch]);

  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    if (!isDashboardLoading && dashboard) {
      const timer = setTimeout(() => { setShowChart(true); }, 250);
      return () => clearTimeout(timer);
    }
  }, [isDashboardLoading && dashboard]);

  // إعداد بيانات المخططات
  const barChartData = reportData.map((item) => ({
    label: item.medication_name,
    count: item.quantity,
    needsRestock: item.needs_restock
  }));
  const barColors = ["#4A148C", "#7B1FA2", "#9C27B0", "#E91E63", "#00BCD4", "#4CAF50", "#FF9800"];
  const purpleColors = ["#4A148C", "#6A1B9A", "#8E24AA", "#A29BFE", "#B2BEC3"];
  const pieChartData = dashboard ? [
    { x: "الوصفات المصروفة", y: dashboard.filled_prescriptions },
    { x: "كمية المستودع", y: dashboard.total_inventory_quantity },
    { x: "المخزون المنخفض", y: dashboard.low_stock_items },
    { x: "الوصفات النشطة", y: dashboard.active_prescriptions },
    { x: "إجمالي الأدوية", y: dashboard.total_medications },
  ] : [
    { x: "الوصفات المصروفة", y: 34 }, { x: "كمية المستودع", y: 17 }, { x: "المخزون المنخفض", y: 15 }, { x: "الوصفات النشطة", y: 15 }, { x: "إجمالي الأدوية", y: 10 }
  ];

  // دالة الإرسال إلى الباك إند
  const handleCreateRecord = (e) => {
    e.preventDefault();
    if (!formInfo.appointment_id) {
      alert("الرجاء اختيار موعد أولاً");
      return;
    }
    dispatch(createMedicalRecord(formInfo));
  };

  // تفريغ الحقول بعد النجاح
  useEffect(() => {
    if (isRecordSuccess) {
      setTimeout(() => {
        dispatch(resetForm());
      }, 3000);
    }
  }, [isRecordSuccess, dispatch]);

  return (
    <Box dir="rtl">
      {/* التنبيهات المنبثقة للأخطاء والنجاح */}
      <Snackbar open={isRecordSuccess} autoHideDuration={4000} onClose={() => dispatch(clearSuccess())} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%', fontFamily: 'Cairo' }}>تم حفظ الـ Medical Record بالمنظومة بنجاح!</Alert>
      </Snackbar>

      <Snackbar open={!!recordError} autoHideDuration={5000} onClose={() => dispatch(clearError())} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" sx={{ width: '100%', fontFamily: 'Cairo' }}>{recordError}</Alert>
      </Snackbar>

      {/* قسم الإحصائيات التحليلية الرسومية */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={7}>
          <Card variant="outlined" style={{ borderRadius: '12px', padding: '10px' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" style={{ color: pharmacyColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Leaderboard /> كميات الأدوية الحالية المتوفرة بالمخزن
              </Typography>
              <Box height={260} dir="ltr" display="flex" justifyContent="center" alignItems="center">
                {isReportLoading ? (
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <CircularProgress size={50} style={{ color: pharmacyColor }} thickness={4} />
                    <Typography variant="caption" sx={{ fontFamily: 'Cairo', color: '#666' }}>جاري جلب تقارير الأدوية...</Typography>
                  </Box>
                ) : barChartData.length === 0 ? (
                  <Typography variant="body2" sx={{ fontFamily: 'Cairo', color: '#999' }}>لا توجد بيانات متاحة لعرضها حالياً</Typography>
                ) : (
                  <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 35 }} height={240} containerComponent={<VictoryContainer responsive={true} />}>
                    <VictoryAxis tickValues={barChartData.map((_, index) => index + 1)} tickFormat={barChartData.map(d => d.label)} style={{ tickLabels: { fontFamily: 'Cairo, sans-serif', fontSize: 10, padding: 5, angle: barChartData.length > 4 ? -15 : 0 } }} />
                    <VictoryAxis dependentAxis style={{ tickLabels: { fontFamily: 'Cairo, sans-serif', fontSize: 11 } }} />
                    <VictoryBar data={barChartData.map((d, index) => ({ x: index + 1, y: d.count, label: d.count }))} style={{ data: { fill: ({ index }) => barColors[index % barColors.length], width: 26, borderRadius: 4 }, labels: { fontFamily: 'Cairo, sans-serif', fontSize: 11, fontWeight: 'bold', fill: '#333' } }} labelComponent={<VictoryLabel dy={-8} />} animate={{ duration: 1000, onLoad: { duration: 500 } }} />
                  </VictoryChart>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#1e3a8a", display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <PieChart /> إحصائيات الصيدلية العامة
              </Typography>
              <Box height={260} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                {isDashboardLoading || !showChart ? (
                  <Box display="flex" justifyContent="center" width="100%">
                    <CircularProgress size={60} style={{ color: '#1e3a8a' }} thickness={4} />
                  </Box>
                ) : (
                  <>
                    <Box width="60%" dir="ltr">
                      <VictoryPie data={pieChartData} height={240} innerRadius={60} padAngle={2} padding={30} labels={({ datum }) => `${datum.y}%`} colorScale={purpleColors} style={{ labels: { fontSize: 11, fontWeight: "bold", fill: "#FFFFFF" } }} animate={{ duration: 1200, onLoad: { duration: 700 } }} />
                    </Box>
                    <Box width="40%" display="flex" flexDirection="column" gap={1.5} pr={1}>
                      {pieChartData.map((item, index) => (
                        <Box key={index} display="flex" alignItems="center" gap={1}>
                          <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: purpleColors[index], flexShrink: 0 }} />
                          <Typography variant="caption" fontWeight="500" color="#374151" sx={{ fontFamily: 'Cairo, sans-serif' }}>{item.x}</Typography>
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

      {/* قسم السجل الطبي الدوائي المطور والجديد المتوافق مع الـ API */}
      <Typography variant="h6" fontWeight="bold" mb={2} style={{ color: pharmacyColor, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Description /> إنشاء سجل صرف طبي (Medical Record) جديد
      </Typography>

      <form onSubmit={handleCreateRecord}>
        <Grid container spacing={2}>
          
          {/* 1. قائمة اختيار الموعد المتصلة بالـ API */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="appointment-select-label">اختر الموعد والمريض</InputLabel>
              <Select
                labelId="appointment-select-label"
                value={formInfo.appointment_id}
                label="اختر الموعد والمريض"
                disabled={isAppoetmentsLoading}
                onChange={(e) => dispatch(setFormInfo({ appointment_id: Number(e.target.value) }))}
              >
                {isAppoetmentsLoading ? (
                  <MenuItem disabled><CircularProgress size={20} sx={{ ml: 1 }} /> جاري تحميل المواعيد...</MenuItem>
                ) : appoetmentsData && appoetmentsData.length > 0 ? (
                  appoetmentsData.map((appointment) => (
                    <MenuItem key={appointment.id} value={appointment.id}>
                      {appointment.patient?.name} - {appointment.appointment_date} ({appointment.appointment_time})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>لا توجد مواعيد متاحة</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* 2. التشخيص (Diagnosis) */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="التشخيص (Diagnosis)" value={formInfo.diagnosis} onChange={(e) => dispatch(setFormInfo({ diagnosis: e.target.value }))} required />
          </Grid>

          {/* 3. الأعراض (Symptoms) */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="الأعراض المشاهدة (Symptoms)" value={formInfo.symptoms} onChange={(e) => dispatch(setFormInfo({ symptoms: e.target.value }))} required />
          </Grid>

          {/* 4. ضغط الدم (Vital Signs -> Blood Pressure) */}
          <Grid item xs={12} sm={3}>
            <TextField fullWidth size="small" label="ضغط الدم (مثال: 120/80)" value={formInfo.vital_signs.blood_pressure} onChange={(e) => dispatch(setVitalSigns({ blood_pressure: e.target.value }))} />
          </Grid>

          {/* 5. درجة الحرارة (Vital Signs -> Temperature) */}
          <Grid item xs={12} sm={3}>
            <TextField fullWidth size="small" type="number" inputProps={{ step: "0.1" }} label="الحرارة (Temperature °C)" value={formInfo.vital_signs.temperature} onChange={(e) => dispatch(setVitalSigns({ temperature: Number(e.target.value) }))} />
          </Grid>

          {/* 6. الوزن (Vital Signs -> Weight) */}
          <Grid item xs={12} sm={3}>
            <TextField fullWidth size="small" type="number" label="الوزن (Weight kg)" value={formInfo.vital_signs.weight} onChange={(e) => dispatch(setVitalSigns({ weight: Number(e.target.value) }))} />
          </Grid>

          {/* 7. الطول (Vital Signs -> Height) */}
          <Grid item xs={12} sm={3}>
            <TextField fullWidth size="small" type="number" label="الطول (Height cm)" value={formInfo.vital_signs.height} onChange={(e) => dispatch(setVitalSigns({ height: Number(e.target.value) }))} />
          </Grid>

          {/* 8. ملاحظات إضافية (Notes) */}
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="ملاحظات وتوصيات الصيدلاني الطبية والدوائية (Notes)" value={formInfo.notes} onChange={(e) => dispatch(setFormInfo({ notes: e.target.value }))} />
          </Grid>

          {/* زر الحفظ المعدل بالبنفسجي الجذاب والواضح */}
          <Grid item xs={12} textAlign="left">
            <Button 
              type="submit"
              variant="contained" 
              disabled={isSavingRecord}
              startIcon={isSavingRecord ? <CircularProgress size={20} color="inherit" /> : <AssignmentTurnedIn />} 
              sx={{ 
                backgroundColor: isSavingRecord ? '#b0bec5' : '#4A148C', 
                color: '#ffffff !important',
                fontWeight: 'bold',
                fontFamily: 'Cairo, sans-serif',
                px: 4,
                py: 1.2,
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(74, 20, 140, 0.3)',
                '&:hover': {
                  backgroundColor: '#6A1B9A',
                  boxShadow: '0px 6px 14px rgba(106, 27, 154, 0.4)',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#d6d6d6',
                  color: '#9e9e9e !important'
                }
              }}
            >
              {isSavingRecord ? "جاري تثبيت السجل..." : "تثبيت السجل الطبي بالمنظومة"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PharmacyReports;
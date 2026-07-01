import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Avatar,
  Stack
} from "@mui/material";

import {
  Assessment,
  Paid,
  MoneyOff,
  TrendingUp,
} from "@mui/icons-material";

import { fetchreport } from "../../backend/slice/accounting/report";

const ReportManager = () => {
  const dispatch = useDispatch();

  const { data, isLoading, reportType } = useSelector(
    (state) => state.fetchreport
  );

  const [type, setType] = useState("summary");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";

  useEffect(() => {
    dispatch(fetchreport());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      fetchreport({
        type,
        date,
        month,
        year,
      })
    );
  };

  // مصفوفة الكروت مع استخدام درجات الرمادي والـ Charcoal الفخمة بدلاً من الأزرق والألوان الفاقعة
  const statsCards = [
    {
      title: "عدد العمليات",
      value: data?.payments_count ?? data?.count ?? 0,
      unit: "",
      icon: <Assessment sx={{ color: "#475569", fontSize: 24 }} />,
      bgColor: "rgba(71, 85, 105, 0.08)",
    },
    {
      title: "الإيرادات",
      value: data?.total_revenue ?? data?.revenue ?? 0,
      unit: "SYP",
      icon: <Paid sx={{ color: "#334155", fontSize: 24 }} />,
      bgColor: "rgba(51, 65, 85, 0.08)",
    },
    {
      title: "الاسترجاعات",
      value: data?.total_refunds ?? data?.refunds ?? 0,
      unit: "SYP",
      icon: <MoneyOff sx={{ color: "#64748b", fontSize: 24 }} />,
      bgColor: "rgba(100, 116, 139, 0.08)",
    },
    {
      title: "الصافي",
      value: reportType === "summary" ? data?.net : (Number(data?.revenue) || 0) - (Number(data?.refunds) || 0),
      unit: "SYP",
      icon: <TrendingUp sx={{ color: "#1e293b", fontSize: 24 }} />,
      bgColor: "rgba(30, 41, 59, 0.08)",
    },
  ];

  return (
    <Box p={{ xs: 2, md: 4 }} dir="rtl" sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: arabicFont }}>
      
      {/* عنوان الصفحة مع ضبط اللون الرمادي */}
      <Box mb={4} mt={1}>
        <Typography variant="h5" fontWeight="800" sx={{ color: "#334155", fontFamily: arabicFont }}>
          التقارير المالية
        </Typography>
      </Box>

      {/* قسم الفلاتر والـ Tabs */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: "16px", 
          boxShadow: "0px 4px 20px rgba(0,0,0,0.01)",
          border: "1px solid #e2e8f0"
        }}
      >
        
        {/* تصميم الـ Tabs المطور باللون الرمادي */}
        <Box sx={{ mb: 4, bgcolor: "#f1f5f9", p: 0.5, borderRadius: "12px", display: "inline-block" }}>
          <Tabs 
            value={type} 
            onChange={(e, value) => setType(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: "40px",
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            {["summary", "daily", "monthly"].map((tabValue) => (
              <Tab 
                key={tabValue}
                value={tabValue} 
                label={tabValue === "summary" ? "ملخص التقرير" : tabValue === "daily" ? "تقرير يومي" : "تقرير شهري"} 
                sx={{ 
                  fontWeight: "600", 
                  fontSize: "14px",
                  minHeight: "40px",
                  borderRadius: "10px",
                  px: 3,
                  color: "#64748b",
                  fontFamily: arabicFont,
                  transition: "all 0.2s ease",
                  "&.Mui-selected": {
                    bgcolor: "#ffffff",
                    color: "#1e293b", // لون نص داكن للتبويب النشط
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                    fontWeight: "700"
                  }
                }} 
              />
            ))}
          </Tabs>
        </Box>

        {/* مدخلات البحث وزر العرض المتناسق */}
        <Grid container spacing={2} alignItems="center">
          {type === "daily" && (
            <Grid item xs={12} sm={8} md={4}>
              <TextField
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label="اختر التاريخ"
                variant="outlined"
                inputProps={{ style: { fontFamily: arabicFont } }}
                InputLabelProps={{ style: { fontFamily: arabicFont }, shrink: true }}
              />
            </Grid>
          )}

          {type === "monthly" && (
            <>
              <Grid item xs={6} sm={4} md={2}>
                <TextField
                  label="الشهر"
                  type="number"
                  inputProps={{ min: 1, max: 12, style: { fontFamily: arabicFont } }}
                  InputLabelProps={{ style: { fontFamily: arabicFont } }}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6} sm={4} md={2}>
                <TextField
                  label="السنة"
                  type="number"
                  inputProps={{ style: { fontFamily: arabicFont } }}
                  InputLabelProps={{ style: { fontFamily: arabicFont } }}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  fullWidth
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={type === "summary" ? 12 : 4} md={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              sx={{
                p: "12px 28px",
                fontWeight: "700",
                fontSize: "0.95rem",
                borderRadius: "12px",
                fontFamily: arabicFont,
                backgroundColor: "#334155", // رمادي داكن فخم وثابت
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(51, 65, 85, 0.15)",
                transition: "all 0.3s ease",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1e293b",
                  boxShadow: "0 6px 20px rgba(30, 41, 59, 0.25)",
                  transform: "translateY(-1px)"
                }
              }}
            >
              عرض التقرير
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* قسم كروت الإحصائيات */}
      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper sx={{ p: 3, borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="circular" width={44} height={44} />
                </Stack>
                <Skeleton variant="text" width="40%" height={40} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {statsCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  borderRadius: "16px", 
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 16px rgba(148, 163, 184, 0.05)", 
                  border: "1px solid #e2e8f0", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 12px 24px rgba(148, 163, 184, 0.15)",
                    borderColor: "#cbd5e1"
                  }
                }}
              >
                <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography color="#64748b" fontWeight="600" variant="body2" sx={{ fontFamily: arabicFont }}>
                      {card.title}
                    </Typography>
                    <Avatar sx={{ bgcolor: card.bgColor, width: 40, height: 40, borderRadius: "10px" }}>
                      {card.icon}
                    </Avatar>
                  </Stack>
                  
                  <Stack direction="row" alignItems="baseline" spacing={0.5}>
                    <Typography variant="h4" fontWeight="800" color="#1e293b" sx={{ fontFamily: arabicFont, fontSize: "1.8rem" }}>
                      {Number(card.value).toLocaleString()}
                    </Typography>
                    {card.unit && (
                      <Typography variant="body2" color="#94a3b8" fontWeight="700" sx={{ mr: 0.5, fontFamily: arabicFont, fontSize: "0.8rem" }}>
                        {card.unit}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ReportManager;
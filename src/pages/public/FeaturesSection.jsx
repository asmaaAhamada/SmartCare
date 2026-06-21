import React from "react";
import { Box, Typography, Grid, Card, CardContent, useTheme } from "@mui/material";
import { alpha } from "@mui/material";
// يمكنك استبدال هذه الأيقونات بأي أيقونات تناسب مشروعك من Material UI Icons
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ScienceIcon from "@mui/icons-material/Science";

export default function FeaturesSection() {
  const theme = useTheme();
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";

  // مصفوفة البيانات للأقسام بناءً على التحليل السابق لمشروعك
  const features = [
    {
      title: "لوحة التحكم العليا (Admin)",
      description: "إدارة المستخدمين، تعيين الصلاحيات الدقيقة، ومتابعة تقارير النظام العامة والعيادات.",
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 45, color: "#00b4d8" }} />,
    },
    {
      title: "الاستقبال والمواعيد",
      description: "تنظيم مواعيد المرضى، عرض جداول الأطباء بدقة، وإدارة سجل الزيارات اليومية.",
      icon: <EventNoteIcon sx={{ fontSize: 45, color: "#00b4d8" }} />,
    },
    {
      title: "الإدارة المالية والمحاسبة",
      description: "إصدار الفواتير الفورية، تتبع المدفوعات، وفلترة مستحقات الأطباء وتصفيتها.",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 45, color: "#00b4d8" }} />,
    },
    {
      title: "الصيدلية الذكية",
      description: "إدارة المخزون الطبي، مدخلات المواد وأسعارها، وتلبية طلبات وفواتير الأدوية للمرضى.",
      icon: <LocalPharmacyIcon sx={{ fontSize: 45, color: "#00b4d8" }} />,
    },
    {
      title: "إدارة المختبر والتحاليل",
      description: "استقبال طلبات الفحص المخبري، ورفع ملفات النتائج وتقارير التحاليل مباشرة لملف المريض.",
      icon: <ScienceIcon sx={{ fontSize: 45, color: "#00b4d8" }} />,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#0a192f", // لون داكن متناسق مع شفافية هيرو الفيديو
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        direction: "rtl",
      }}
    >
      {/* عنوان القسم */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: arabicFont,
            fontWeight: 800,
            color: "#fff",
            mb: 2,
            fontSize: { xs: "1.8rem", md: "2.8rem" },
          }}
        >
          منظومة واحدة.. لوحات تحكم متعددة
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: arabicFont,
            color: alpha("#fff", 0.7),
            maxWidth: "600px",
            mx: "auto",
            fontSize: { xs: "0.95rem", md: "1.1rem" },
          }}
        >
          تم تصميم النظام ليعمل بكفاءة عبر توزيع الأدوار والصلاحيات لكل قسم من أقسام المنشأة الطبية.
        </Typography>
      </Box>

      {/* شبكة البطاقات التفاعلية */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "rgba(23, 42, 69, 0.7)", // لون بطاقات زجاجي داكن
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(100, 255, 218, 0.1)",
                borderRadius: "20px",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  border: "1px solid #00b4d8",
                  boxShadow: `0 12px 30px -10px ${alpha("#00b4d8", 0.3)}`,
                },
              }}
            >
              <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                {/* الأيقونة */}
                <Box
                  sx={{
                    width: "fit-content",
                    p: 1.5,
                    borderRadius: "15px",
                    backgroundColor: alpha("#00b4d8", 0.1),
                  }}
                >
                  {item.icon}
                </Box>

                {/* عنوان الدور */}
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontFamily: arabicFont,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {item.title}
                </Typography>

                {/* تفاصيل الدور */}
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: arabicFont,
                    color: alpha("#fff", 0.7),
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
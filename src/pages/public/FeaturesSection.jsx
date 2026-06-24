import React from "react";
import { Box, Typography, Grid, Card, CardContent, alpha } from "@mui/material";
import { motion } from "framer-motion"; // تم إضافة المكتبة
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ScienceIcon from "@mui/icons-material/Science";

export default function FeaturesSection() {
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";
  const medicalTeal = "#2ca8c9";

  const features = [
    { title: "لوحة التحكم العليا", description: "إدارة المستخدمين والصلاحيات والتقارير العامة.", icon: <AdminPanelSettingsIcon sx={{ fontSize: 40, color: medicalTeal }} /> },
    { title: "الاستقبال والمواعيد", description: "تنظيم مواعيد المرضى وجداول الأطباء بدقة.", icon: <EventNoteIcon sx={{ fontSize: 40, color: medicalTeal }} /> },
    { title: "الإدارة المالية", description: "إصدار الفواتير الفورية ومتابعة مستحقات الأطباء.", icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: medicalTeal }} /> },
    { title: "الصيدلية الذكية", description: "إدارة المخزون الطبي وفواتير الأدوية للمرضى.", icon: <LocalPharmacyIcon sx={{ fontSize: 40, color: medicalTeal }} /> },
    { title: "إدارة المختبر", description: "استقبال طلبات الفحص ورفع النتائج للملف الطبي.", icon: <ScienceIcon sx={{ fontSize: 40, color: medicalTeal }} /> },
  ];

  return (
    <Box sx={{ background: `linear-gradient(180deg, #ffffff 0%, ${alpha(medicalTeal, 0.05)} 100%)`, py: 12, px: { xs: 3, md: 8 }, direction: "rtl" }}>
      <Box sx={{ textAlign: "center", mb: 10 }}>
        <Typography variant="h3" sx={{ fontFamily: arabicFont, fontWeight: 800, color: "#1a1a1a" }}>لوحات تحكم متكاملة</Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card sx={{ height: "100%", borderRadius: "25px", border: "1px solid #eee", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", "&:hover": { borderColor: medicalTeal } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2, p: 1, width: "fit-content", borderRadius: "12px", backgroundColor: alpha(medicalTeal, 0.1) }}>{item.icon}</Box>
                  <Typography variant="h5" sx={{ fontFamily: arabicFont, fontWeight: 700 }}>{item.title}</Typography>
                  <Typography variant="body1" sx={{ fontFamily: arabicFont, color: "#666" }}>{item.description}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
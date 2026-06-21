import { Outlet, Link } from "react-router-dom";
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { alpha } from "@mui/material";
import { baby_blue } from "../../color-main/color";
// استبدلي هذا المسار بملف الفيديو الخاص بكِ

export default function PublicPage() {
  const theme = useTheme();

  // اعتماد خط عربي احترافي للواجهات الذكية
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";
  // لون افتح ومشرق للزر ليكون واضحاً وبارزاً فوق الخلفية الداكنة
  const brightButtonColor = baby_blue; 

  return (
    <>
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        direction: "rtl",
        fontFamily: arabicFont,
      }}
    >
      {/* 1. خلفية الفيديو */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
src="/video/1.mp4"        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      />

      {/* 2. طبقة التغطية الداكنة (Overlay) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10, 25, 47, 0.7)", 
          zIndex: -1,
        }}
      />

      {/* 3. روابط التنقل العلوية المدمجة */}
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 3, md: 8 },
          py: 3,
          zIndex: 10,
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: "#fff", 
            fontWeight: "bold",
            fontFamily: arabicFont 
          }}
        >
          رعاية ذكية
        </Typography>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Link to="/about" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, fontFamily: arabicFont }}>
            من نحن
          </Link>
          <Link to="/story" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, fontFamily: arabicFont }}>
            قصتنا
          </Link>
        </Box>
      </Box>

      {/* 4. محتوى الصفحة الرئيسي والنصوص بأنيميشن تفاعلي جديد */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 3,
          zIndex: 5,
          color: "#fff",
        }}
      >
        {/* العنوان الرئيسي: أنيميشن ظهور مع تكبير ناعم */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 2.5,
            fontSize: { xs: "2.3rem", md: "3.8rem" },
            fontFamily: arabicFont,
            textShadow: "0px 4px 15px rgba(0,0,0,0.6)",
            opacity: 0,
            animation: "customZoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "@keyframes customZoomIn": {
              "0%": { opacity: 0, transform: "scale(0.92) translateY(20px)" },
              "100%": { opacity: 1, transform: "scale(1) translateY(0)" }
            }
          }}
        >
          أهلاً بكم في مستقبل الرعاية الصحية
        </Typography>

        {/* النص الفرعي: يظهر بتأثير انسيابي متأخر قليلاً */}
        <Typography
          variant="h5"
          sx={{
            mb: 5,
            maxWidth: "650px",
            color: alpha("#fff", 0.9),
            fontSize: { xs: "1.1rem", md: "1.4rem" },
            fontFamily: arabicFont,
            lineHeight: 1.6,
            textShadow: "0px 2px 10px rgba(0,0,0,0.6)",
            opacity: 0,
            animation: "customZoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            animationDelay: "0.4s", 
          }}
        >
          منظومة رقمية متكاملة لربط العيادات، المختبرات، والصيدلية بذكاء وسلاسة لتأمين أفضل تجربة للمريض.
        </Typography>

        {/* زر انضم إلينا المضيء والواضح */}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: "30px",
              px: 6,
              py: 1.6,
              fontSize: "1.25rem",
              fontWeight: "bold",
              fontFamily: arabicFont,
              color: "#0a192f", // نص داكن متناسق مع الإضاءة الساطعة للزر
              backgroundColor: brightButtonColor,
              boxShadow: `0 0 15px ${alpha(brightButtonColor, 0.4)}`,
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              
              opacity: 0,
              animation: "customZoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards, pulseGlow 2.5s infinite",
              animationDelay: "0.8s, 0s", 

              "&:hover": {
                backgroundColor: brightButtonColor,
                transform: "translateY(-3px)",
                boxShadow: `0 0 30px 10px ${alpha(brightButtonColor, 0.7)}`,
              },

              "@keyframes pulseGlow": {
                "0%": {
                  boxShadow: `0 0 0 0 ${alpha(brightButtonColor, 0.6)}`,
                },
                "70%": {
                  boxShadow: `0 0 30px 15px transparent`,
                },
                "100%": {
                  boxShadow: `0 0 0 0 transparent`,
                },
              },
            }}
          >
            انضم إلينا
          </Button>
        </Link>
      </Box>
    </Box>
       <Outlet /> 
</>
  );
}
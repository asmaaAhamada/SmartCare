import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  useTheme,
  alpha
} from "@mui/material";
import LanIcon from '@mui/icons-material/Lan';
import AutoTaskIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import storyVideo from "../../assets/vedio/mixkit-clinic-staff-at-a-hospital-reception-4766-hd-ready.mp4"; 
import timelineImg1 from "../../assets/image/pexels-karola-g-4021775.jpg"; 
import timelineImg2 from "../../assets/image/pexels-ai25studioai-5215017.jpg"; 

export default function StoryPage() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";
  
  const primaryBlue = "#00b4d8";
  const darkNavy = "#0a192f";

  const timelineSteps = [
    {
      year: "٢٠٢٤: الشرارة الأولى",
      title: "رؤية وسط الركام الورقي",
      description: "انطلقت فكرتنا من داخل أروقة العيادات، حيث لاحظنا الهدر الكبير في وقت الأطباء والمرضى بسبب المعاملات الورقية وتشتت البيانات بين المختبر والصيدلية. قررنا حينها بناء نواة برمجية توحد هذا الشتات.",
      icon: <LanIcon sx={{ color: primaryBlue, fontSize: 30 }} />,
      image: timelineImg1,
      isFirst: true // علامة لتمييز المحطة الأولى وتطبيق حركة الطفو عليها
    },
    {
      year: "٢٠٢٥: التحول والأتمتة",
      title: "ولادة المنظومة الذكية",
      description: "بعد عام من التطوير واختبار ثغرات النظام، نجحنا في بناء لوحة تحكم متكاملة تدعم التحديث اللحظي للبيانات. تم ربط قسم الاستقبال بالمحاسبة والعيادات الخارجيّة لتصبح دورة المريض رقمية بالكامل بنسبة ١٠٠٪.",
      icon: <AutoTaskIcon sx={{ color: primaryBlue, fontSize: 30 }} />,
      image: timelineImg2,
      isFirst: false
    }
  ];

  return (
    <Box sx={{
      backgroundImage: isLight 
        ? "linear-gradient(180deg, #eef5f9 0%, #dbeafe 50%, #ffffff 100%)" 
        : `linear-gradient(180deg, #0f2647 0%, ${darkNavy} 100%)`,
      py: 12,
      direction: "rtl",
      fontFamily: arabicFont,
      overflow: "hidden",
      
      // --- تعريف تأثيرات الـ Animation لصفحة القصة ---
      "@keyframes slideInFromRight": {
        "0%": { opacity: 0, transform: "translateX(60px)" },
        "100%": { opacity: 1, transform: "translateX(0)" }
      },
      "@keyframes slideInFromLeft": {
        "0%": { opacity: 0, transform: "translateX(-60px)" },
        "100%": { opacity: 1, transform: "translateX(0)" }
      },
      "@keyframes fadeInUpHeader": {
        "0%": { opacity: 0, transform: "translateY(30px)" },
        "100%": { opacity: 1, transform: "translateY(0)" }
      },
      "@keyframes imageFloat": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-12px)" } // حركة صعود ونزول ناعمة بمقدار 12px
      }
    }}>
      <Container maxWidth="lg">
        
        {/* --- العنوان الرئيسي مع أنيميشن دخول --- */}
        <Box 
          textAlign="center" 
          mb={10}
          sx={{ animation: "fadeInUpHeader 1s ease-out forwards" }}
        >
          <Typography variant="overline" sx={{ color: primaryBlue, fontWeight: "bold", fontFamily: arabicFont, fontSize: "1rem" }}>
            كيف بدأنا وإلى أين وصلنا
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, color: isLight ? darkNavy : "#fff", mt: 1, fontFamily: arabicFont, fontSize: { xs: "2.2rem", md: "3.5rem" } }}>
            قصة <span style={{ color: primaryBlue }}>الابتكار والتحول</span>
          </Typography>
        </Box>

        {/* --- الخط الزمني التفاعلي --- */}
        <Grid container spacing={8} sx={{ mb: 12 }}>
          {timelineSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <Grid item xs={12} key={index}>
                <Box sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: isEven ? "row" : "row-reverse" },
                  alignItems: "center",
                  gap: 6,
                }}>
                  
                  {/* جزء الصورة التوضيحية مع تطبيق أنيميشن الدخول والطفو المستمر */}
                  <Box sx={{ 
                    flex: 1, 
                    width: "100%",
                    // أنيميشن دخول الصورة حسب اتجاهها المخصص زمنيًا
                    animation: `${isEven ? "slideInFromRight" : "slideInFromLeft"} 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards`,
                  }}>
                    <Box
                      component="img"
                      src={step.image}
                      alt={step.title}
                      sx={{
                        width: "100%",
                        height: 340,
                        objectFit: "cover",
                        borderRadius: "32px",
                        boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
                        transition: "transform 0.4s ease, box-shadow 0.4s ease",
                        
                        // تطبيق حركة الصعود والنزول المستمرة إذا كانت الصورة الأولى فقط
                        animation: step.isFirst ? "imageFloat 4s ease-in-out infinite" : "none",
                        
                        "&:hover": {
                          transform: step.isFirst ? "none" : "scale(1.02)", 
                          boxShadow: "0 25px 50px rgba(0, 180, 216, 0.15)"
                        }
                      }}
                    />
                  </Box>

                  {/* الجزء النصي للمحطة مع أنيميشن دخول معاكس للصورة */}
                  <Box sx={{ 
                    flex: 1,
                    animation: `${isEven ? "slideInFromLeft" : "slideInFromRight"} 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards`,
                  }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                      <Box sx={{ bgcolor: alpha(primaryBlue, 0.12), p: 1.5, borderRadius: "50%", display: "flex", alignItems: "center" }}>
                        {step.icon}
                      </Box>
                      <Typography variant="h6" sx={{ color: primaryBlue, fontWeight: 800, fontFamily: arabicFont }}>
                        {step.year}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: isLight ? "#1e293b" : "#fff", fontFamily: arabicFont }}>
                      {step.title}
                    </Typography>
                    
                    <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, fontSize: "1.1rem", fontFamily: arabicFont }}>
                      {step.description}
                    </Typography>
                  </Box>

                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* --- قسم الفيديو الوثائقي السينمائي --- */}
        <Box sx={{ mt: 14, textAlign: "center" }}>
          <Box mb={4}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: isLight ? darkNavy : "#fff", fontFamily: arabicFont }}>
              شاهد المنظومة في دقيقة
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: arabicFont }}>
              جولة مرئية سريعة تستعرض كيف غيرنا مفهوم إدارة الرعاية الصحية من التعقيد إلى البساطة.
            </Typography>
          </Box>

          <Card sx={{
            maxWidth: "850px",
            mx: "auto",
            borderRadius: "32px",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 20px 50px ${alpha(primaryBlue, 0.15)}`,
            backgroundColor: "#000",
            border: `1px solid ${alpha(primaryBlue, 0.2)}`,
            "&:hover .play-overlay": {
              backgroundColor: "rgba(10, 25, 47, 0.2)" 
            }
          }}>
            <Box 
              className="play-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(10, 25, 47, 0.4)",
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none", 
                transition: "all 0.4s ease"
              }}
            >
              <PlayCircleFilledWhiteIcon sx={{ 
                fontSize: { xs: 60, md: 80 }, 
                color: primaryBlue,
                filter: "drop-shadow(0px 4px 20px rgba(0,180,216,0.6))",
                animation: "pulseBtn 2s infinite",
                "@keyframes pulseBtn": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.08)" }
                }
              }} />
            </Box>

            <Box
              component="video"
              controls
              src={storyVideo}
              sx={{
                width: "100%",
                height: { xs: 240, md: 450 },
                objectFit: "cover",
                display: "block",
                zIndex: 1
              }}
            />
          </Card>
        </Box>

      </Container>
    </Box>
  );
}
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  useTheme,
  Button
} from "@mui/material";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import r1 from '../assets/image/pexels-shvetsa-4225880.jpg'; 
import r2 from '../assets/image/pexels-tara-winstead-8386437.jpg';


export default function AboutPage() {
  const theme = useTheme();
  
  const isLight = theme.palette.mode === 'light';
  const primaryBlue = "#00b4d8"; 
  const darkNavy = "#0a192f";
  const white = "#ffffff";
  const headerColor = theme.palette.text.primary;
  
  // خلفية البطاقات مدمجة مع التدرج الجديد
  const cardBg = isLight ? "rgba(255, 255, 255, 0.85)" : "rgba(23, 42, 69, 0.7)";
  
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";

  // --- CSS Animations ---
  const animations = {
    "@keyframes fadeInUp": {
      "0%": { opacity: 0, transform: "translateY(40px) scale(0.95)" },
      "100%": { opacity: 1, transform: "translateY(0) scale(1)" }
    },
    "@keyframes slideInLeft": {
      "0%": { opacity: 0, transform: "translateX(-60px)" },
      "100%": { opacity: 1, transform: "translateX(0)" }
    },
    "@keyframes slideInRight": {
      "0%": { opacity: 0, transform: "translateX(60px)" },
      "100%": { opacity: 1, transform: "translateX(0)" }
    },
    "@keyframes float": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" }
    }
  };

  return (
    <Box sx={{ 
      // التدرج اللوني الجديد الممتد بين الأبيض، الرمادي، والأزرق الخفيف
      backgroundImage: isLight 
        ? "linear-gradient(180deg, #ffffff 0%, #f4f7f6 50%, #eef5f9 100%)" 
        : `linear-gradient(180deg, ${darkNavy} 0%, #0f2647 100%)`, 
      py: 12, 
      transition: '0.3s',
      overflow: 'hidden', 
      direction: "rtl", 
      fontFamily: arabicFont,
      ...animations 
    }}>
      <Container maxWidth="lg">
        
        {/* --- Section 1: Hero Header --- */}
        <Box 
          textAlign="center" 
          mb={10}
          sx={{ animation: "fadeInUp 1s ease-out forwards" }}
        >
          <Typography
            variant="overline"
            sx={{ 
              color: primaryBlue, 
              fontWeight: "bold", 
              letterSpacing: 1.5,
              fontFamily: arabicFont,
              fontSize: "1rem"
            }}
          >
            رحلتنا نحو الابتكار
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: isLight ? "#1e293b" : white, // لون داكن واضح متناسق مع الرمادي
              mt: 1,
              fontFamily: arabicFont,
              fontSize: { xs: "2.2rem", md: "3.5rem" },
            }}
          >
            عن <span style={{ color: primaryBlue }}>منظومتنا الطبية</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: "text.secondary", 
              mt: 3, 
              maxWidth: "800px", 
              mx: "auto", 
              fontWeight: 500,
              fontFamily: arabicFont,
              lineHeight: 1.8
            }}
          >
            نحن نؤمن بأن الرعاية الصحية الممتازة تبدأ من التنظيم الدقيق. تم تصميم نظامنا ليكون الحل الشامل الذي يربط بين الأقسام الطبية لضمان تقديم أفضل خدمة للمريض وأعلى كفاءة للإدارة.
          </Typography>
        </Box>

        {/* --- Section 2: Who We Are --- */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: 12 }}>
          <Grid item xs={12} md={6} sx={{ animation: "slideInRight 1.2s ease-out 0.2s backwards" }}>
            <Box
              sx={{
                position: "relative",
                animation: "float 4s ease-in-out infinite", 
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: -20,
                  right: -20, 
                  width: "100%",
                  height: "100%",
                  border: `2px solid ${primaryBlue}`,
                  borderRadius: "40px",
                  zIndex: 0,
                },
              }}
            >
              <Box
                component="img"
                src={r1}
                alt="Medical Team"
                sx={{
                  width: "100%",
                  height: 420,
                  objectFit: "cover",
                  borderRadius: "40px",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ animation: "slideInLeft 1.2s ease-out 0.4s backwards" }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar sx={{ bgcolor: "rgba(0, 180, 216, 0.12)", color: primaryBlue, width: 56, height: 56 }}>
                <HealthAndSafetyIcon fontSize="large" />
              </Avatar>
              <Typography variant="h3" fontWeight="bold" color={isLight ? "#1e293b" : headerColor} sx={{ fontFamily: arabicFont }}>
                من نحن؟
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: "1.15rem", lineHeight: 1.9, color: "text.secondary", fontFamily: arabicFont }}>
              نحن فريق من المطورين وخبراء التكنولوجيا الطبية، اجتمعنا لبناء نظام ذكي يحلل ويعالج تحديات إدارة المستشفيات والعيادات. 
              <br /><br />
              مهمتنا هي القضاء على العمل الورقي الروتيني، وتوفير بيئة رقمية آمنة تربط الاستقبال، المحاسبة، الصيدلية، والمختبر في واجهة واحدة متزامنة لحظياً (Real-time)، مما يتيح للأطباء التركيز على ما يهم حقاً: العناية بالمرضى.
            </Typography>
          </Grid>
        </Grid>

        {/* --- Section 3: Story & Vision --- */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ animation: "fadeInUp 1s ease-out 0.6s backwards" }}>
            <Paper
              elevation={isLight ? 3 : 0}
              sx={{
                p: 5,
                height: "100%",
                borderRadius: "30px",
                bgcolor: cardBg,
                border: isLight ? "1px solid rgba(0, 180, 216, 0.1)" : `1px solid rgba(100, 255, 218, 0.1)`,
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                backdropFilter: "blur(10px)",
                "&:hover": { 
                  transform: "translateY(-15px)",
                  boxShadow: isLight ? "0 20px 40px rgba(0, 180, 216, 0.12)" : "0 20px 40px rgba(0, 180, 216, 0.15)"
                }
              }}
            >
              <VerifiedUserIcon sx={{ fontSize: 45, color: primaryBlue, mb: 3 }} />
              <Typography variant="h4" fontWeight="bold" mb={2} color={isLight ? "#1e293b" : headerColor} sx={{ fontFamily: arabicFont }}>
                رسالتنا (Our Mission)
              </Typography>
              <Typography color="text.secondary" lineHeight={1.8} fontSize="1.05rem" sx={{ fontFamily: arabicFont }}>
                بدأت رحلتنا من إدراك الفجوة بين الأقسام الطبية وتأخر تبادل المعلومات. لذلك صممنا هذا نظام استناداً إلى مبدأ "صلاحيات دقيقة لبيانات آمنة"، لضمان الخصوصية التامة لملفات المرضى، وتسهيل تتبع الفواتير والتقارير الطبية بضغطة زر.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} sx={{ animation: "fadeInUp 1s ease-out 0.8s backwards" }}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                height: "100%",
                borderRadius: "30px",
                position: "relative", 
                overflow: "hidden", 
                backgroundImage: `linear-gradient(135deg, rgba(10, 25, 47, 0.85), rgba(0, 180, 216, 0.75)), url(${r2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: white, 
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": { 
                  transform: "translateY(-15px)",
                  boxShadow: "0 25px 50px rgba(0, 180, 216, 0.25)"
                },
              }}
            >
              <MedicalInformationIcon sx={{ fontSize: 45, mb: 3, color: white }} />
              <Typography variant="h4" fontWeight="bold" mb={2} sx={{ fontFamily: arabicFont }}>
                رؤيتنا (Our Vision)
              </Typography>
              <Typography lineHeight={1.8} fontSize="1.05rem" sx={{ opacity: 0.9, fontFamily: arabicFont }}>
                أن نصبح الخيار الأول والمنصة الأكثر موثوقية لإدارة المنشآت الطبية الذكية. نسعى لتمكين الأطباء والإداريين من اتخاذ قرارات سريعة ودقيقة بناءً على تقارير مالية وطبية فورية، لرفع مستوى الرعاية الصحية إلى آفاق جديدة.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* --- Final CTA --- */}
        <Box 
          textAlign="center" 
          mt={12}
          sx={{ animation: "fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s backwards" }}
        >
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: primaryBlue, 
              color: isLight ? white : darkNavy,
              px: 6, py: 2, 
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              fontFamily: arabicFont,
              transition: "all 0.3s ease",
              boxShadow: `0 4px 20px ${theme.palette.alpha ? theme.palette.alpha(primaryBlue, 0.3) : "rgba(0, 180, 216, 0.3)"}`,
              '&:hover': { 
                bgcolor: "#0096b1",
                transform: "translateY(-3px)",
                boxShadow: `0 8px 25px rgba(0, 180, 216, 0.5)`
              }
            }}
          >
            استكشف لوحات التحكم
          </Button>
        </Box>

      </Container>
    </Box>
  );
}
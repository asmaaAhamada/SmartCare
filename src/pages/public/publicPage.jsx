import { Outlet, Link } from "react-router-dom";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { alpha } from "@mui/material";
import { motion } from "framer-motion";
import { baby_blue } from "../../color-main/color";
import bgVideo from '../../assets/vedio/3.mp4';

export default function PublicPage() {
  const arabicFont = "'Cairo', 'Tajawal', 'Segoe UI', sans-serif";
  const brightButtonColor = baby_blue;
  const titleText = "أهلاً بكم في مستقبل الرعاية الصحية".split(" ");

  return (
    <>
      <Box sx={{ position: "relative", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", direction: "rtl", fontFamily: arabicFont, overflow: "hidden" }}>
        <Box component="video" autoPlay loop muted playsInline src={bgVideo} sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(10, 25, 47, 0.45)", zIndex: 1 }} />
        
        <Box component="nav" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 4, md: 10 }, py: 4, zIndex: 10 }}>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800, fontFamily: arabicFont }}>رعاية ذكية</Typography>
          <Box sx={{ display: "flex", gap: 6 }}>
            <Link to="/about" style={{ textDecoration: "none", color: "#fff", fontWeight: 700 }}>من نحن</Link>
            <Link to="/story" style={{ textDecoration: "none", color: "#fff", fontWeight: 700 }}>قصتنا</Link>
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 5, color: "#fff", px: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: "2.3rem", md: "4rem" }, fontFamily: arabicFont }}>
            {titleText.map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ display: "inline-block", marginRight: "10px" }}>
                {word}
              </motion.span>
            ))}
          </Typography>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: titleText.length * 0.1 + 0.5 }}>
            <Typography variant="h5" sx={{ mb: 6, maxWidth: "750px", color: alpha("#fff", 0.9), fontSize: { xs: "1.1rem", md: "1.5rem" }, fontFamily: arabicFont, lineHeight: 1.7 }}>
              منظومة رقمية متكاملة لربط العيادات، المختبرات، والصيدليات بذكاء وسلاسة لتأمين أفضل تجربة للمريض.
            </Typography>
          </motion.div>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" size="large" sx={{ borderRadius: "35px", px: 7, py: 1.8, fontSize: "1.35rem", backgroundColor: brightButtonColor, color: "#0a192f", fontWeight: "black" }}>
              انضم إلينا
            </Button>
          </Link>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
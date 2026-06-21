import React from "react";
import { Box } from "@mui/material";
import PublicPage from "./publicPage";
import FeaturesSection from "./FeaturesSection";


export default function HomePage() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#0a192f" }}>
      {/* القسم الأول: واجهة الفيديو الترحيبية */}
      <Box component="section">
        <PublicPage />
      </Box>

      {/* القسم الثاني: بطاقات الميزات التي تظهر عند النزول (Scroll) */}
      <Box component="section">
        <FeaturesSection />
      </Box>
    </Box>
  );
}
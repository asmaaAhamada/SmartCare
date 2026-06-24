import { Box } from "@mui/material";
import logo from "../../assets/image/Gemini_Generated_Image_vg2saqvg2saqvg2s.png";

export default function LogoHeader() {
  return (
    <Box
      sx={{
        width: "100%", // لضمان أخذ العرض الكامل للـ Sidebar
        height: 120,    // يمكنك زيادة الارتفاع قليلاً ليناسب أبعاد التصميم الجديد
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)", // خط سفلي ناعم ومتناسق مع الخلفية البيضاء
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // لمنع خروج أي أجزاء زائدة من الصورة عن الإطار
        direction: "rtl",
      }}
    >
      {/* اللوجو المعدل ليملأ المساحة بالكامل */}
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "fill", // يضمن ملء الطول والعرض بنسبة 100% دون ترك أي فراغات هوامش بيضاء
        }}
      />
    </Box>
  );
}
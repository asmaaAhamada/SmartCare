import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import adminLogo from "../../assets/image/ادمن.png";
import receptionistLogo from "../../assets/image/استعلامات.jfif";
import labLogo from "../../assets/image/مخبري.jfif";
import pharmacyLogo from "../../assets/image/صيدلة.jfif";
import accountantLogo from "../../assets/image/محاسبة.jfif";

export default function LogoHeader() {
  const role = useSelector((state) => state.user?.userInfo?.role);

  const logos = {
    admin: adminLogo,
    pharmacist: pharmacyLogo,
    lab: labLogo,
    receptionist: receptionistLogo,
    accountant: accountantLogo,
  };

  const logo = logos[role] || adminLogo;

  return (
    <Box
      sx={{
        width: "100%",
        height: 120,
        borderBottom: "1px solid rgba(0,0,0,.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
      />
    </Box>
  );
}
import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  lazy,
  Suspense,
} from "react";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  useMediaQuery,
  alpha,
  Avatar
} from "@mui/material";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux"; 

import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {
  darkgray,
} from  "../../color-main/color";

import LogoHeader from "./logoHeader";

// LAZY LOADING
const TopBar = lazy(() => import("./TopBar"));

// ================= MENU ITEMS =================

const menuItems = [
   {
    text: "لوحة التحكم",
    icon: <DashboardOutlinedIcon sx={{ fontSize: "26px" }} />,
    path: "/dashbord", 
  },
   {
    text: "الإعلانات",
    icon: <CampaignOutlinedIcon sx={{ fontSize: "26px" }} />,
    path: "/dashbord/News", 
  },
    {
    text: "العيادات",
    icon: <MedicalServicesOutlinedIcon sx={{ fontSize: "26px" }} />,
    path: "/dashbord/Clinics", 
  },
   {
    text: "الأطباء",
    icon: <Diversity1OutlinedIcon sx={{ fontSize: "26px" }} />,
    path: "/dashbord/doctor", 
  },
   {
    text: "الصلاحيات والأدوار",
    icon: <GroupAddOutlinedIcon sx={{ fontSize: "26px" }} />,
    path: "/dashbord/roles", 
  },
  {
    text: "المرضى",
    icon: <AssignmentIndOutlinedIcon sx={{ fontSize: "26px" }} />,
    path: "/dashbord/Patients", 
  },
 
 
];

// ================= SIDEBAR ITEM =================

const SidebarItem = memo(
  ({ item, active, navigate, isDesktop, setMobileOpen, theme, medicalTeal }) => {
    return (
      <ListItemButton
        onClick={() => {
          navigate(item.path);
          if (!isDesktop) {
            setMobileOpen(false);
          }
        }}
        sx={{
          mx: 1,
          mb: 1.5, 
          borderRadius: "14px",
          minHeight: 48,  
          boxShadow: active
            ? `0 4px 12px rgba(0, 0, 0, 0.15)`
            : "none",
          display: "flex",
          alignItems: "center",
          gap: 2,
          color: active ? medicalTeal : "white",
          backgroundColor: active ? "white" : "transparent",
          "&:hover": {
            backgroundColor: active ? "white" : alpha("#ffffff", 0.15),
            color: active ? medicalTeal : "white",
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: active ? medicalTeal : "white",
            minWidth: "unset",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {item.icon}
        </ListItemIcon>

        <ListItemText
          primary={item.text}
          sx={{ margin: 0 }}
          primaryTypographyProps={{
            fontSize: 17, 
            textAlign: "right",
            fontWeight: 600,
          }}
        />
      </ListItemButton>
    );
  }
);

// ================= MAIN COMPONENT =================

function Sidebar({ toggleMode, mode }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // اللون الأزرق الطبي المعتمد للسايدبار
  const medicalTealColor = "#2ca8c9"; 

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // بيانات المستخدم الافتراضية
  const user = {
    name: "د. أحمد علي",
    role: "مدير النظام",
    avatarUrl: "" 
  };

  const filteredMenuItems = useMemo(() => {
    return menuItems;
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    console.log("تسجيل الخروج...");
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        width: "256px",
        height: "100vh",
        backgroundColor: medicalTealColor, 
        color: "white",
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden", 
      }}
    >
      {/* الجزء العلوي: اللوجو */}
      <Box>
        <LogoHeader />
      </Box>

      {/* الجزء الأوسط: القائمة المتمررة */}
      <List sx={{ 
        mt: 2, 
        flex: 1,         
        overflowY: "auto", 
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>      
        {filteredMenuItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            active={location.pathname === item.path}
            navigate={navigate}
            isDesktop={isDesktop}
            setMobileOpen={setMobileOpen}
            theme={theme}
            medicalTeal={medicalTealColor}
          />
        ))}
      </List>

      {/* الجزء السفلي الثابت: معلومات المستخدم وزر تسجيل الخروج */}
      <Box sx={{ p: 2, backgroundColor: "transparent" }}>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, px: 1 }}>
          <Avatar 
            src={user.avatarUrl} 
            alt={user.name}
            sx={{ 
              width: 44, 
              height: 44, 
              backgroundColor: "white", 
              color: medicalTealColor,
              fontWeight: 700 
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          
          <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Typography sx={{ fontSize: "17px", fontWeight: 600, noWrap: true, color: "white" }}>
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: "13px", color: alpha("#ffffff", 0.75), noWrap: true }}>
              {user.role}
            </Typography>
          </Box>
        </Box>

        {/* زر تسجيل الخروج بدون خلفية داكنة للقسم */}
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "12px",
            minHeight: 40,
            color: "#ff4d4d", 
            backgroundColor: alpha("#ff4d4d", 0.12), 
            "&:hover": {
              backgroundColor: "#ff4d4d", 
              color: "white",
              boxShadow: "0 4px 12px rgba(255, 77, 77, 0.3)"
            },
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
            mt: 1
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: "unset" }}>
            <LogoutOutlinedIcon sx={{ fontSize: "22px", transform: "rotate(180deg)" }} />
          </ListItemIcon>
          <ListItemText 
            primary="تسجيل الخروج" 
            primaryTypographyProps={{ fontSize: "14px", fontWeight: 600, textAlign: "right" }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", direction: "rtl", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* MOBILE APPBAR */}
      {!isDesktop && (
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: medicalTealColor,
          }}
        >
          <Toolbar>
            <IconButton
              sx={{ color: "white" }}
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Typography sx={{ fontWeight: 600, mr: 3, fontSize: 17 }}>
              القائمة
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* DESKTOP DRAWER */}
      {isDesktop ? (
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            width: "256px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 256,
              height: "100vh",
              backgroundColor: medicalTealColor,
              border: "none",
              boxSizing: "border-box",
              overflow: "hidden", 
              right: 0,
              left: "auto"
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 256,
              height: "100vh",
              backgroundColor: medicalTealColor,
              boxSizing: "border-box",
              overflow: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: isDesktop ? "calc(100% - 256px)" : "100%",
          mt: { xs: 8, md: 0 },
        }}
      >
        <Suspense fallback={null}>
          <TopBar toggleMode={toggleMode} mode={mode} />
        </Suspense>

        <Box sx={{ mt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux"; 

import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MedicineIcon from '@mui/icons-material/LocalPharmacyOutlined';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptIcon from '@mui/icons-material/ReceiptLongOutlined';
import ReportsIcon from '@mui/icons-material/BarChartOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';

import { baby_blue } from "../../color-main/color";
import LogoHeader from "./logoHeader";

// 🌟 استيراد الأكشنز الخاصة بتسجيل الخروج وتصفير الفوُرم
import { Logout } from "../../backend/slice/auth/logout"; 
import { resetForm } from "../../backend/slice/auth/log_in_Slice";

const TopBar = lazy(() => import("./TopBar"));

const menuItems = [
  { text: "لوحة التحكم", icon: <DashboardOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord", roles: ["admin"] },
  { text: "إدارة العمولات", icon: <LocalAtmIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/Financial", roles: ["admin"] },
  { text: "الإعلانات", icon: <CampaignOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/News", roles: ["admin"] },
  { text: "العيادات", icon: <MedicalServicesOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/Clinics", roles: ["admin"] },
  { text: "الأطباء", icon: <Diversity1OutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/doctor", roles: ["admin"] },
  { text: "الصلاحيات والأدوار", icon: <GroupAddOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/roles", roles: ["admin"] },
  { text: "المرضى", icon: <AssignmentIndOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/Patients", roles: ["admin"] },
  { text: "الفحوصات والتحاليل", icon: <BiotechOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/lab", roles: ["lab"] },
  { text: "إدارة الأدوية", icon: <MedicineIcon sx={{ fontSize: "25px" }} />, path: "/dashbord/pharmacy/medicines", roles: ["pharmacist"] },
  { text: "المخزون المستودعي", icon: <InventoryIcon sx={{ fontSize: "25px" }} />, path: "/dashbord/pharmacy/inventory", roles: ["pharmacist"] },
  { text: "الوصفات الطبية", icon: <ReceiptIcon sx={{ fontSize: "25px" }} />, path: "/dashbord/pharmacy/prescriptions", roles: ["pharmacist"] },
  { text: "التقارير والإحصائيات", icon: <ReportsIcon sx={{ fontSize: "25px" }} />, path: "/dashbord/pharmacy/reports", roles: ["pharmacist"] },
  { text: "إدارة المرضى", icon: <ReportsIcon sx={{ fontSize: "25px" }} />, path: "/dashbord/pharmacy/Pateints", roles: ["pharmacist"] },
  { text: "إدارة المدفوعات", icon: <AttachMoneyIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/accountant/payments", roles: ["accountant"] },
  { text: "التقارير المالية", icon: <AssessmentOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/accountant/reports", roles: ["accountant"] },
  { text: "الفواتير الحسابية", icon: <PointOfSaleIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/accountant/invoices", roles: ["accountant"] },
  { text: "الرئيسية والإحصائيات", icon: <HomeOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/reception", roles: ["receptionist"] },
  { text: "استعلامات المرضى", icon: <PeopleAltOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/reception/patients", roles: ["receptionist"] },
  { text: "استعلامات الأطباء", icon: <LocalHospitalOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/reception/doctors", roles: ["receptionist"] },
  { text: "استعلامات الأخبار", icon: <NewspaperOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/reception/news", roles: ["receptionist"] },
  { text: "استعلامات المواعيد", icon: <CalendarMonthOutlinedIcon sx={{ fontSize: "26px" }} />, path: "/dashbord/reception/appointments", roles: ["receptionist"] },
];

const SidebarItem = memo(({ item, active, navigate, isDesktop, setMobileOpen, medicalTeal }) => (
  <ListItemButton
    onClick={() => {
      navigate(item.path);
      if (!isDesktop) setMobileOpen(false);
    }}
    sx={{
      mx: 1,
      mb: 1.5, 
      borderRadius: "14px",
      minHeight: 48,  
      boxShadow: active ? `0 4px 12px rgba(0, 0, 0, 0.15)` : "none",
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
    <ListItemIcon sx={{ color: active ? medicalTeal : "white", minWidth: "unset", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {item.icon}
    </ListItemIcon>
    <ListItemText primary={item.text} sx={{ margin: 0 }} primaryTypographyProps={{ fontSize: 17, textAlign: "right", fontWeight: 600 }} />
  </ListItemButton>
));

function Sidebar({ toggleMode, mode }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user?.userInfo);

  const [mobileOpen, setMobileOpen] = useState(false);
  
  // 🌟 حالة المودال والتأكيدات
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const role = userInfo?.role;
  const roleColors = {
    admin: baby_blue,
    pharmacist: "#4A148C",
    lab: "#1B5E20",
    receptionist: "#E65100",
    accountant: "#1E293B",
  };

  const medicalTealColor = roleColors[role] || baby_blue;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => item.roles.includes(userInfo?.role));
  }, [userInfo]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // 🌟 تنفيذ تسجيل الخروج الفعلي
  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await dispatch(Logout()).unwrap();
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
    } finally {
      // 🌟 تصفير بيانات الفوُرم لضمان تفريغ الحقول في صفحة الدخول
      dispatch(resetForm());
      setIsLoggingOut(false);
      setOpenLogoutModal(false);
      navigate("/login");
    }
  };

  const drawerContent = (
    <Box sx={{ width: 256, height: "100vh", backgroundColor: medicalTealColor, color: "white", direction: "rtl", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Box sx={{ flexShrink: 0 }}>
        <LogoHeader />
      </Box>

      <List sx={{ flex: 1, minHeight: 0, overflowY: "auto", px: 1 }}>
        {filteredMenuItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            active={location.pathname === item.path}
            navigate={navigate}
            isDesktop={isDesktop}
            setMobileOpen={setMobileOpen}
            medicalTeal={medicalTealColor}
          />
        ))}
      </List>

      <Box sx={{ flexShrink: 0, p: 2, borderTop: "1px solid rgba(255,255,255,.15)", backgroundColor: alpha("#000", 0.05) }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Avatar sx={{ width: 44, height: 44, backgroundColor: "white", color: medicalTealColor, fontWeight: 700 }}>
            {userInfo?.first_name?.charAt(0) || "A"}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography noWrap sx={{ fontSize: 16, fontWeight: 700, color: "white" }}>
              {userInfo?.first_name} {userInfo?.last_name}
            </Typography>
            <Typography noWrap sx={{ fontSize: 13, color: "rgba(255,255,255,.75)" }}>
              {userInfo?.role === "admin" ? "مدير النظام" : userInfo?.role}
            </Typography>
          </Box>
        </Box>

        {/* زر فتح مودال تسجيل الخروج */}
        <ListItemButton
          onClick={() => setOpenLogoutModal(true)}
          sx={{
            mx: 1,
            mb: 1,
            minHeight: 42,
            borderRadius: "12px",
            color: "#ff4d4d",
            backgroundColor: alpha("#ff4d4d", 0.12),
            "&:hover": {
              backgroundColor: "#ff4d4d",
              color: "white",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 30 }}>
            <LogoutOutlinedIcon sx={{ transform: "rotate(180deg)" }} />
          </ListItemIcon>
          <ListItemText primary="تسجيل الخروج" primaryTypographyProps={{ fontSize: 14, fontWeight: 600, textAlign: "right" }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", direction: "rtl", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {!isDesktop && (
        <AppBar position="fixed" sx={{ backgroundColor: medicalTealColor }}>
          <Toolbar>
            <IconButton sx={{ color: "white" }} edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 600, mr: 3, fontSize: 17 }}>القائمة</Typography>
          </Toolbar>
        </AppBar>
      )}

      {isDesktop ? (
        <Drawer variant="permanent" anchor="right" sx={{ width: "256px", flexShrink: 0, "& .MuiDrawer-paper": { width: 256, height: "100vh", backgroundColor: medicalTealColor, border: "none", boxSizing: "border-box", overflow: "hidden", right: 0, left: "auto" } }}>
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ "& .MuiDrawer-paper": { width: 256, height: "100vh", backgroundColor: medicalTealColor, boxSizing: "border-box", overflow: "hidden" } }}>
          {drawerContent}
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: isDesktop ? "calc(100% - 256px)" : "100%", mt: { xs: 8, md: 0 } }}>
        <Suspense fallback={null}>
          <TopBar toggleMode={toggleMode} mode={mode} />
        </Suspense>
        <Box sx={{ mt: 2 }}>
          <Outlet />
        </Box>
      </Box>

      {/* 🌟 مودال تأكيد تسجيل الخروج */}
      <Dialog
        open={openLogoutModal}
        onClose={() => !isLoggingOut && setOpenLogoutModal(false)}
        dir="rtl"
        PaperProps={{ style: { borderRadius: "16px", padding: "8px" } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "18px" }}>
          تأكيد تسجيل الخروج
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "15px", color: "#555" }}>
            هل ترغب حقاً بالمغادرة وتسجيل الخروج من النظام؟
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button 
            onClick={() => setOpenLogoutModal(false)} 
            disabled={isLoggingOut}
            sx={{ color: "#666", fontWeight: 600 }}
          >
            إلغاء
          </Button>
          <Button 
            onClick={handleConfirmLogout} 
            variant="contained" 
            color="error"
            disabled={isLoggingOut}
            sx={{ borderRadius: "8px", fontWeight: 600, px: 3 }}
          >
            {isLoggingOut ? "جاري الخروج..." : "تأكيد المغادرة"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default memo(Sidebar);
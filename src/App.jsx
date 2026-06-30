import React from 'react'
import { Routes, Route ,Navigate} from 'react-router-dom'
import "antd/dist/reset.css";

import HomePage from './pages/public/HomePage';
import PublicPage from './pages/public/publicPage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/auth/loginPage';
import StoryPage from './pages/public/StoryPage';
import Sidebar from './pages/Layout/sidePar'
import DoctorPage from './pages/DoctorsManagement/DoctorPage';
import ClinicsPage from './pages/clinic/ClinicsPage';
import PermissionsPage from './pages/Roles/PermissionsPage';
import PatientsDashboard from './pages/Patients/PatientsDashboard';
import StatisticsPage from './pages/dashbord/StatisticsPage';
import AnnouncementsPage from './pages/news/AnnouncementsPage';
import ProtectedRoute from './pages/auth/proctedRout';
import FinancialManagement from './pages/FinancialManagement/FinancialManagement';
import LabDashboard from './pages/Laboratory/LabDashboard';
import PharmacyDashboard from './pages/Pharmacy/PharmacyDashboard';
import InventoryManager from './pages/Pharmacy/InventoryManager';
import PrescriptionManager from './pages/Pharmacy/PrescriptionManager';
import PharmacyReports from './pages/Pharmacy/PharmacyReports';
import MedicineManager from './pages/Pharmacy/MedicineManager';

export default function App({ toggleMode, mode }) {
  return (
    <>
      <Routes>
        {/* ================= المسارات العامة المفتوحة للجميع ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/public" element={<PublicPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ================= حماية لوحة التحكم بالكامل ================= */}
        <Route element={<ProtectedRoute allowedRole={["admin", "lab", "pharmacist"]} />}>
          
          <Route path="/dashbord" element={<Sidebar toggleMode={toggleMode} mode={mode} />}>
            {/* الصفحة الافتراضية المباشرة التي تفتح فور دخول لوحة التحكم */}
            <Route index element={<StatisticsPage />} /> 
            
            <Route path="doctor" element={<DoctorPage />} />
            <Route path="Financial" element={<FinancialManagement />} />
            <Route path="Patients" element={<PatientsDashboard />} />
            <Route path="News" element={<AnnouncementsPage />} />
            <Route path="Clinics" element={<ClinicsPage />} />
            <Route path="roles" element={<PermissionsPage />} />

            {/*  قسم المخبري (محمي بصلاحية المخبري فقط) */}
            <Route element={<ProtectedRoute allowedRole={["lab"]} />}>
              <Route path="lab" element={<LabDashboard />} />
            </Route>

            {/*  قسم الصيدلية (محمي بصلاحية الصيدلاني فقط) */}
           <Route element={<ProtectedRoute allowedRole={["pharmacist"]} />}>
  <Route path="pharmacy" element={<PharmacyReports />}>  
    
    <Route index element={<Navigate to="reports" replace />} />

    <Route path="inventory" element={<InventoryManager />} />
    <Route path="prescriptions" element={<PrescriptionManager />} />
    <Route path="reports" element={<PharmacyReports />} />
    <Route path="medicines" element={<MedicineManager />} />
  </Route>
</Route>

          </Route> {/* إغلاق السايدبر */}
        </Route> {/* إغلاق الحماية العامة */}
        
      </Routes>
    </>
  )
}
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import "antd/dist/reset.css";

import HomePage from './pages/public/HomePage';
import PublicPage from './pages/public/publicPage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/auth/loginPage';
import StoryPage from './pages/public/StoryPage';
import Sidebar from './pages/Layout/sidePar'
import PatientsPage from './pages/Patients/PatientsPage';
import DashbordPage from './pages/dashbord/StatisticsPage';
import DoctorPage from './pages/DoctorsManagement/DoctorPage';
import ClinicsPage from './pages/clinic/ClinicsPage';
import PermissionsPage from './pages/Roles/PermissionsPage';
import PatientsDashboard from './pages/Patients/PatientsDashboard';
import StatisticsPage from './pages/dashbord/StatisticsPage';
import AnnouncementsPage from './pages/news/AnnouncementsPage';
import AnnouncementDetails from './pages/news/AnnouncementDetails';
import ProtectedRoute from './pages/auth/proctedRout';




export default function App({toggleMode, mode}){
 
  return (
    <>
    
      <Routes>
        {/* المسارات العامة المفتوحة للجميع */}
        <Route path="/" element={<HomePage />} />
        <Route path="/public" element={<PublicPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/login" element={<LoginPage />} />

      
           <Route element={<ProtectedRoute allowedRole={["admin"]} />}>

        <Route path="/dashbord" element={<Sidebar toggleMode={toggleMode} mode={mode} />}>
          {/* الصفحة الافتراضية المباشرة التي تفتح فور دخول لوحة التحكم */}
          <Route index element={<StatisticsPage />} /> 
          
          <Route path="doctor" element={<DoctorPage />} />
          <Route path="Patients" element={<PatientsDashboard />} />
          <Route path="News" element={<AnnouncementsPage />} />
          <Route path="News/:id" element={<AnnouncementDetails />} />
          <Route path="Clinics" element={<ClinicsPage />} />
                    <Route path="roles" element={<PermissionsPage />} />

        </Route>
        </Route>
      </Routes>

    </>
  )
}
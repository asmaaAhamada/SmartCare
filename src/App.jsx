import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Layout from './layout/Layout'
import "antd/dist/reset.css";
import PublicPage from './pages/publicPage'
import LoginPage from './pages/loginPage'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import DashBoardPage from './pages/DashBoardPage'
import StoryPage from './pages/StoryPage';





export default function App({toggleMode, mode}){
 
  return (
    <>
    
       <Routes>

    
    <Route path="/" element={<PublicPage />} />
    <Route path="/public" element={<PublicPage />} />

    <Route path="/about" element={<AboutPage />} />
        <Route path="/story" element={<StoryPage />} />

 <Route path="/login" element={<LoginPage />} />

{/* requiredToken */}
 <Route path="/dashboard" element={<DashBoardPage />} />

{/* =========requiredToken =========*/}


       
     
</Routes> 

    </>
  )
}
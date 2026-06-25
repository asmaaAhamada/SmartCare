import { configureStore } from '@reduxjs/toolkit'
import Log_inReducer from '../slice/auth/log_in_Slice'
import userReducer from '../slice/auth/userInfo'
import fetchDashboardReducer from '../slice/dashboard/analys'
import fetchDashboardDoctorReducer from '../slice/dashboard/analys doctor'
import fetchAnnouncementReducer from '../slice/announcements/fetchAll'
import AddAnnouncementReducer from '../slice/announcements/add'
import editeAnnouncementReducer from '../slice/announcements/EDITE'
import deletAnnouncementReducer from '../slice/announcements/delet'
import fetchDetailsAnnouncementReducer from '../slice/announcements/deteails'
import fetchDoctorsReducer from '../slice/doctors/fetchAll'
import deletDoctorsReducer from '../slice/doctors/delet'
import fetchDetailsDoctorsReducer from '../slice/doctors/deteails'
import Add_DoctorsReducer from '../slice/doctors/add'
import vrifyDoctorsReducer from '../slice/doctors/verfiy'
import fetchpatientsReducer from '../slice/patitents/fetchAll'
const store = configureStore({
  reducer: {
 Log_in:Log_inReducer, 
 user :userReducer,
 fetchDashboard:fetchDashboardReducer,
 fetchDashboardDoctor:fetchDashboardDoctorReducer,
 fetchAnnouncement:fetchAnnouncementReducer,
 AddAnnouncement:AddAnnouncementReducer,
 editeAnnouncement:editeAnnouncementReducer,
 deletAnnouncement:deletAnnouncementReducer,
 fetchDetailsAnnouncement:fetchDetailsAnnouncementReducer,
 fetchDoctors:fetchDoctorsReducer,
 fetchDetailsDoctors:fetchDetailsDoctorsReducer,
 deletDoctors:deletDoctorsReducer,
 Add_Doctors:Add_DoctorsReducer,
 vrifyDoctors:vrifyDoctorsReducer,
 fetchpatients:fetchpatientsReducer
 }
})

export default store
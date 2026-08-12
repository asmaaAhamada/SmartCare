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
import fetchRolesReducer from '../slice/pirmission/fetchAll'
import deletRolesReducer from '../slice/pirmission/delet'
import fetchClinicReducer from '../slice/clinic/fetchAll'
import AddClinicReducer from '../slice/clinic/addClinc'
import fetchDetailsclincsReducer from '../slice/clinic/deteails'
import vrifyClinicReducer from '../slice/clinic/verfiy'
import DeleteClinicReducer from '../slice/clinic/delet'
import fetchDetailsRolesRedcer from '../slice/pirmission/deteails'
import fetchAllRolesReducer from '../slice/pirmission/groupfitsh'
import Add_RoleReducer from '../slice/pirmission/addRole' 
import Update_RoleReducer from '../slice/pirmission/edite'
import fetchAPPINTMENTReducer from '../slice/patitents/appointents/fetchAll'
import fetchSpecialtiesReducer from '../slice/doctors/speslist'
import EditeClinicReducer from '../slice/clinic/edite'
import Edit_DoctorReducer from '../slice/doctors/edite'
import fetchDetailspatitnentReducer from '../slice/patitents/deteails'
import vrifypatitnentReducer from '../slice/patitents/verfiy'
import  fetchspesficAPPINTMENTReducer from '../slice/patitents/appointents/spescfic'
import fetchPAYMENTReducer from '../slice/payments/fetchAll'
import partialRefundReducer from '../slice/payments/partialRefund'
import fetchlabReducer from '../slice/lab_mangment/fetchAll'
import AddlabReducer from '../slice/lab_mangment/add_lab'
import fetchDetailslabReducer from '../slice/lab_mangment/deteails'
import ExportFileReducer from '../slice/lab_mangment/upload'
import fetchpaymentsReducer from '../slice/accounting/fetchAll'
import fetchDetailspaymentsReducer from '../slice/accounting/deteails'
import payments_statsReducer from '../slice/accounting/satiscs'
import fetchinnvocingReducer from '../slice/accounting/invocing'
import fetchDetailsinnvocingReducer from '../slice/accounting/deteails_invocing'
import fetchreportReducer from '../slice/accounting/report'
import createInvoiceReducer from '../slice/accounting/createInvoice'
import refundPaymentReducer from '../slice/accounting/refundSlice'
import EditestatusReducer from '../slice/lab_mangment/updatestatus'
import fetchprescriptionsReducer from '../slice/pharmecy/fetchAll'
import fetchDetailsprescriptionsReducer from '../slice/pharmecy/deteails'
import fetchmedicationsReducer from '../slice/pharmecy/fetchmedicien'
import Update_medicationsReducer from '../slice/pharmecy/editeStatus'
import ADD_medicationsReducer from '../slice/pharmecy/add'
import delet_medeceinReducer from '../slice/pharmecy/delet'
import fetchdashboardReducer from '../slice/pharmecy/fetchdashboard'
import fetchinventoryReducer from '../slice/pharmecy/fetchinvocing'
import ADD_inventory_restokReducer from '../slice/pharmecy/restock'
import fetchLowStockReducer from '../slice/pharmecy/fetchLowStock'
import fetchReportReducer from '../slice/pharmecy/fetchreport'
import fetchresptionReducer from '../slice/reseption/fetchAll'
import fetchAPPOETMENTReducer from '../slice/reseption/apoettment_fetch'
import fetchQueueReducer from '../slice/reseption/queue'
import FETCHAPPOETMENTSReducer from '../slice/pharmecy/fetchapoetment'
import medicalRecordReducer from '../slice/pharmecy/medical'
import SHOWPATEINTSReducer from '../slice/pharmecy/fetchAllPateints'
import dispenseReducer from '../slice/pharmecy/add_depeins'
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
 fetchpatients:fetchpatientsReducer,
 fetchRoles:fetchRolesReducer,
 deletRoles:deletRolesReducer,
 fetchClinic:fetchClinicReducer,
 AddClinic:AddClinicReducer,
 fetchDetailsclincs:fetchDetailsclincsReducer,
 vrifyClinic:vrifyClinicReducer,
 DeleteClinic:DeleteClinicReducer,
 fetchDetailsRoles:fetchDetailsRolesRedcer,
 fetchAllRoles:fetchAllRolesReducer,
 Add_Role:Add_RoleReducer,
 Update_Role:Update_RoleReducer,
 fetchAPPINTMENT:fetchAPPINTMENTReducer,
 fetchSpecialties:fetchSpecialtiesReducer,
 EditeClinic:EditeClinicReducer,
 Edit_Doctor:Edit_DoctorReducer,
 fetchDetailspatitnent:fetchDetailspatitnentReducer,
 vrifypatitnent:vrifypatitnentReducer,
 fetchspesficAPPINTMENT:fetchspesficAPPINTMENTReducer,
 fetchPAYMENT:fetchPAYMENTReducer,
 partialRefund: partialRefundReducer,
 fetchlab:fetchlabReducer,
 Addlab:AddlabReducer,
 fetchDetailslab:fetchDetailslabReducer,
 ExportFile:ExportFileReducer,
 fetchpayments:fetchpaymentsReducer,
 fetchDetailspayments:fetchDetailspaymentsReducer,
 payments_stats:payments_statsReducer,
 fetchinnvocing:fetchinnvocingReducer,
 fetchDetailsinnvocing:fetchDetailsinnvocingReducer,
 fetchreport:fetchreportReducer,
 createInvoice:createInvoiceReducer,
 refundPayment:refundPaymentReducer,
 Editestatus:EditestatusReducer,
 fetchprescriptions:fetchprescriptionsReducer,
 fetchDetailsprescriptions:fetchDetailsprescriptionsReducer,
 fetchmedications:fetchmedicationsReducer,
 Update_medications:Update_medicationsReducer,
 ADD_medications:ADD_medicationsReducer,
 delet_medecein:delet_medeceinReducer,
 fetchdashboard:fetchdashboardReducer,
 fetchdashboard:fetchdashboardReducer,
 fetchinventory:fetchinventoryReducer,
 ADD_inventory_restok:ADD_inventory_restokReducer,
 fetchLowStock:fetchLowStockReducer,
 fetchReport:fetchReportReducer,
 fetchresption:fetchresptionReducer,
 fetchAPPOETMENT:fetchAPPOETMENTReducer,
 fetchQueue:fetchQueueReducer,
 FETCHAPPOETMENTS:FETCHAPPOETMENTSReducer,
 medicalRecord:medicalRecordReducer,
 SHOWPATEINTS:SHOWPATEINTSReducer,
 dispense:dispenseReducer,
 }

})

export default store
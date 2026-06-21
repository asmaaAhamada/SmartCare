import React, { useState } from "react";
import AvailableAppointments from "./AvailableAppointments";
import PatientsPage from "./PatientsPage";

export default function PatientsDashboard() {
  const [view, setView] = useState("table"); // 'table' أو 'appointments'

  return (
    <div>
      {view === "table" ? (
        <PatientsPage 
          onNavigateToAppointments={() => setView("appointments")} 
          onViewDetails={(patient) => console.log("فتح مودال تفاصيل المريض", patient)}
        />
      ) : (
        <AvailableAppointments onBackToPatients={() => setView("table")} />
      )}
    </div>
  );
}
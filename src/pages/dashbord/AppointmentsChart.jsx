import React from "react";
import { VictoryPie, VictoryTooltip } from "victory";
import { baby_blue } from "../../color-main/color";

const appointmentsData = [
  { x: "مكتملة", y: 450, color:baby_blue }, // اللون الأزرق الأساسي للنظام
  { x: "قيد الانتظار", y: 120, color: "#ffc107" },
  { x: "ملغاة", y: 65, color: "#ff5252" },
];

export default function AppointmentsChart() {
  return (
    <div style={{ 
      width: "100%", 
      maxWidth: "340px", 
      margin: "0 auto", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      gap: "16px" // مسافة ثابتة بين الدائرة والمفتاح بالأسفل
    }}>
      
      {/* الدائرة فقط داخل الـ SVG */}
      <div style={{ width: "220px", height: "220px" }}>
        <VictoryPie
          data={appointmentsData}
          width={250}
          height={250}
          innerRadius={70} 
          outerRadius={95}
          padding={10}
          colorScale={appointmentsData.map(d => d.color)}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip 
              style={{ fontFamily: "inherit", fontSize: 12, fill: "#333" }}
              flyoutStyle={{ stroke: "#eef2f5", strokeWidth: 1, fill: "#fff" }}
            />
          }
          animate={{
            duration: 1800,
            onLoad: { duration: 1800, before: () => ({ startAngle: 0, endAngle: 0 }) }
          }}
        />
      </div>

      {/* مفتاح مخصص بـ HTML نظيف ومرتب يمنع تداخل الكلمات نهائياً (RTL) */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "24px", 
        direction: "rtl",
        width: "100%",
        marginTop: "10px"
      }}>
        {appointmentsData.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* النقطة الملونة */}
            <span style={{ 
              width: "10px", 
              height: "10px", 
              backgroundColor: item.color, 
              borderRadius: "50%", 
              display: "inline-block" 
            }} />
            {/* النص والنسبة */}
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#555", fontFamily: "inherit" }}>
              {item.x}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
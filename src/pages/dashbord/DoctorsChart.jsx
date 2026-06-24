import React from "react";
import { VictoryChart, VictoryBar, VictoryGroup, VictoryAxis, VictoryTooltip } from "victory";
import { baby_blue } from "../../color-main/color";

const doctorsData = [
  { name: "يناير", newDocs: 12, activeDocs: 35, frozenDocs: 2 },
  { name: "فبراير", newDocs: 18, activeDocs: 45, frozenDocs: 4 },
  { name: "مارس", newDocs: 25, activeDocs: 58, frozenDocs: 3 },
  { name: "أبريل", newDocs: 14, activeDocs: 62, frozenDocs: 5 },
  { name: "مايو", newDocs: 30, activeDocs: 75, frozenDocs: 6 },
];

export default function DoctorsChart() {
  const sidebarBlue =baby_blue; // اللون الأزرق الأساسي المعتمد لديكِ

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "8px" }}>
      
      {/* دليل الحالات والألوان (Legend) بـ HTML نظيف ومرتب في الأعلى لمنع التداخل */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "24px", 
        direction: "rtl",
        width: "100%",
        marginBottom: "8px"
      }}>
        {/* الحسابات النشطة */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "12px", height: "12px", backgroundColor: sidebarBlue, borderRadius: "3px", display: "inline-block" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#555" }}>الأطباء النشطين</span>
        </div>

        {/* الحسابات الجديدة */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "12px", height: "12px", backgroundColor: `${sidebarBlue}40`, border: `1px solid ${sidebarBlue}`, borderRadius: "3px", display: "inline-block" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#555" }}>الأطباء الجدد</span>
        </div>

        {/* الحسابات المجمّدة / المحظورة */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "12px", height: "12px", backgroundColor: "#ff7875", borderRadius: "3px", display: "inline-block" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#555" }}>الحسابات المجمّدة</span>
        </div>
      </div>

      {/* المخطط البياني للأعمدة */}
      <div style={{ width: "100%", height: "230px", direction: "ltr" }}>
        <VictoryChart
          width={600}
          height={200}
          domainPadding={{ x: 35 }}
          animate={{ duration: 1500, onLoad: { duration: 1500 } }}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={doctorsData.map(d => d.name)}
            style={{
              tickLabels: { fontSize: 11, fontFamily: "inherit", padding: 5 },
              axis: { stroke: "#e8e8e8" }
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 11, fontFamily: "inherit", padding: 5 },
              axis: { stroke: "#e8e8e8" },
              grid: { stroke: "#f5f5f5" }
            }}
          />

          <VictoryGroup offset={10}>
            {/* 1. الأعمدة الفاتحة: الجدد */}
            <VictoryBar
              data={doctorsData.map(d => ({ x: d.name, y: d.newDocs, label: `الجدد: ${d.newDocs}` }))}
              style={{ data: { fill: `${sidebarBlue}40`, stroke: sidebarBlue, strokeWidth: 1 } }}
              labelComponent={<VictoryTooltip style={{ fontFamily: "inherit", fontSize: 9 }} pointerLength={4} />}
            />
            {/* 2. الأعمدة الغامقة: النشطين */}
            <VictoryBar
              data={doctorsData.map(d => ({ x: d.name, y: d.activeDocs, label: `النشطين: ${d.activeDocs}` }))}
              style={{ data: { fill: sidebarBlue } }}
              labelComponent={<VictoryTooltip style={{ fontFamily: "inherit", fontSize: 9 }} pointerLength={4} />}
            />
            {/* 3. الأعمدة الحمراء: المجمّدة */}
            <VictoryBar
              data={doctorsData.map(d => ({ x: d.name, y: d.frozenDocs, label: `المجمدة: ${d.frozenDocs}` }))}
              style={{ data: { fill: "#ff7875" } }}
              labelComponent={<VictoryTooltip style={{ fontFamily: "inherit", fontSize: 9 }} pointerLength={4} />}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>

    </div>
  );
}
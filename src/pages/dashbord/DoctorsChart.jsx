import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from "victory";
import { baby_blue } from "../../color-main/color";
import { fetchDashboardDoctor } from "../../backend/slice/dashboard/analys doctor";
import { useDispatch, useSelector } from "react-redux";

export default function DoctorsChart() {
  const dispatch = useDispatch();
  const { data: responseData, isLoading } = useSelector((state) => state.fetchDashboardDoctor);
  const [pulseKey, setPulseKey] = useState(0);

  // 1. جلب البيانات (مرة واحدة عند فتح الـ Component)
  useEffect(() => {
    dispatch(fetchDashboardDoctor());
  }, [dispatch]);

  // 2. حركة اللودينج الآمنة
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setPulseKey((prev) => (prev === 0 ? 1 : 0));
      }, 1000);
    } else {
      setPulseKey(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const sidebarBlue = baby_blue;

  // استخراج البيانات الحقيقية وتأمينها
  const overview = responseData?.data?.overview || {
    total_doctors: 0,
    verified_doctors: 0,
  };

  const totalDocs = overview.total_doctors;
  const verifiedDocs = overview.verified_doctors;
  const unverifiedDocs = totalDocs - verifiedDocs; 
  const isEmpty = totalDocs === 0;

  // 3. إعادة هيكلة البيانات كعناصر منفصلة على المحور الأفقي لمنع التداخل تماماً
  let finalData = [];

  if (isLoading) {
    finalData = [
      { x: "إجمالي المسجلين", y: pulseKey === 0 ? 30 : 60, color: `${sidebarBlue}50` },
      { x: "الأطباء الموثقين", y: pulseKey === 0 ? 20 : 50, color: sidebarBlue },
      { x: "حسابات غير موثقة", y: pulseKey === 0 ? 10 : 25, color: "#ff7875" },
    ];
  } else {
    finalData = [
      { x: "إجمالي المسجلين", y: totalDocs, color: isEmpty ? "#F0F0F0" : `${sidebarBlue}40` },
      { x: "الأطباء الموثقين", y: verifiedDocs, color: isEmpty ? "#E0E0E0" : sidebarBlue },
      { x: "حسابات غير موثقة", y: unverifiedDocs, color: isEmpty ? "#F5D5D5" : "#ff7875" },
    ];
  }

  return (
    <div 
      style={{ 
        width: "100%", 
        maxWidth: "700px", 
        margin: "0 auto", 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px",
        position: "relative"
      }}
    >
      {/* دليل الحالات العلوي (Legend) - منسق بخطوط داكنة واضحة ومتباعدة */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "28px", 
        direction: "rtl",
        width: "100%",
        marginBottom: "8px",
        opacity: isLoading ? 0.4 : 1
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "14px", height: "14px", backgroundColor: isEmpty || isLoading ? "#E0E0E0" : sidebarBlue, borderRadius: "4px", display: "inline-block" }} />
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a1a" }}>الأطباء الموثقين</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "14px", height: "14px", backgroundColor: isEmpty || isLoading ? "#F0F0F0" : `${sidebarBlue}40`, border: `1px solid ${isEmpty || isLoading ? "#ccc" : sidebarBlue}`, borderRadius: "4px", display: "inline-block" }} />
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a1a" }}>إجمالي المسجلين</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "14px", height: "14px", backgroundColor: isEmpty || isLoading ? "#F5D5D5" : "#ff7875", borderRadius: "4px", display: "inline-block" }} />
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a1a" }}>حسابات غير موثقة</span>
        </div>
      </div>

      {/* المخطط البياني */}
      <div style={{ width: "100%", height: "260px", direction: "ltr", position: "relative" }}>
        <VictoryChart
          width={600}
          height={240}
          domainPadding={{ x: 80 }}
        >
          {/* المحور الأفقي - يعرض الآن أسماء التصنيفات بوضوح دون تداخل */}
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 13, fontWeight: "bold", fill: "#1a1a1a", padding: 8 },
              axis: { stroke: "#cccccc", strokeWidth: 2 }
            }}
          />
          
          {/* المحور العمودي */}
          <VictoryAxis
            dependentAxis
            domain={isLoading ? [0, 100] : undefined}
            style={{
              tickLabels: { fontSize: 12, fontWeight: "600", fill: "#4d4d4d", padding: 5 },
              axis: { stroke: "#cccccc", strokeWidth: 2 },
              grid: { stroke: "#f0f0f0", strokeWidth: 1 }
            }}
          />

          {/* عمود بياني موحد يفصل الفئات بصرياً ويضع الرقم بالقمة */}
          <VictoryBar
            data={finalData}
            animate={{ duration: 400 }}
            style={{
              data: {
                fill: ({ datum }) => datum.color,
                stroke: ({ datum }) => datum.x === "إجمالي المسجلين" && !isEmpty && !isLoading ? sidebarBlue : "none",
                strokeWidth: 1.5,
                barWidth: 45 // عرض العمود ممتاز وواضح بصرياً
              }
            }}
            // طباعة الرقم مباشرة فوق كل عمود بخط عريض وواضح جداً
            labels={isLoading ? [] : ({ datum }) => datum.y}
            labelComponent={
              <VictoryLabel
                dy={-10}
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  fill: "#1a1a1a",
                  fontFamily: "inherit"
                }}
              />
            }
          />
        </VictoryChart>

        {/* الطبقة التوضيحية المريحة للنص في حالات اللودينج أو خلو البيانات */}
        {(isEmpty || isLoading) && (
          <div style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "16px",
            fontWeight: "700",
            color: isLoading ? sidebarBlue : "#b3b3b3",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "10px 24px",
            borderRadius: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            direction: "rtl",
            pointerEvents: "none"
          }}>
            {isLoading ? "جاري جلب إحصائيات الأطباء..." : "لا توجد بيانات إحصائية للأطباء حالياً"}
          </div>
        )}
      </div>
    </div>
  );
}
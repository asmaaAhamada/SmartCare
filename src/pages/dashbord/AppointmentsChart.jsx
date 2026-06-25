import React, { useEffect, useState } from "react";
import { VictoryPie, VictoryTooltip } from "victory";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../backend/slice/dashboard/analys";

const appColors = {
  blue: "#1a73e8",
  green: "#238c4b",
  yellow: "#e6ac00",
  red: "#d32f2f",
  gray: "#757575",
  emptyGray: "#e0e0e0",
  textMain: "#1a1a1a",
  textSecondary: "#4d4d4d",
};

export default function AppointmentsChart() {
  const dispatch = useDispatch();
  const { data: responseData, isLoading } = useSelector((state) => state.fetchDashboard);
  const [key, setKey] = useState(0);

  useEffect(() => {
    dispatch(fetchDashboard());
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const stats = responseData?.data?.appointments_status || {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    no_show: 0,
  };

  // حساب الإجمالي الفعلي من الحالات لتأمين العرض المستقر
  const totalNumber = stats.completed + stats.confirmed + stats.pending + stats.cancelled + stats.no_show;
  const isEmpty = totalNumber === 0;

  const appointmentsData = isEmpty
    ? [{ x: "لا توجد بيانات", y: 1, color: appColors.emptyGray }]
    : [
        { x: "مكتملة", y: stats.completed, color: appColors.blue },
        { x: "مؤكدة", y: stats.confirmed, color: appColors.green },
        { x: "قيد الدفع", y: stats.pending, color: appColors.yellow },
        { x: "ملغاة", y: stats.cancelled, color: appColors.red },
        { x: "لم يحضر", y: stats.no_show, color: appColors.gray },
      ];

  const chartData = isLoading
    ? [
        { y: 4, color: appColors.blue },
        { y: 3, color: appColors.green },
        { y: 2, color: appColors.yellow },
        { y: 1, color: appColors.red },
      ]
    : appointmentsData;

  const colorScale = isLoading
    ? [appColors.blue, appColors.green, appColors.yellow, appColors.red]
    : appointmentsData.map((d) => d.color);

  // قائمة العناصر السفلية التوضيحية لدمج الأسماء مع الأرقام الحقيقية مباشرة
  const legendItems = [
    { label: "مكتملة", value: stats.completed, color: appColors.blue, emptyColor: "#e6f0ff" },
    { label: "مؤكدة", value: stats.confirmed, color: appColors.green, emptyColor: "#e6f7ed" },
    { label: "قيد الدفع", value: stats.pending, color: appColors.yellow, emptyColor: "#fffbe6" },
    { label: "ملغاة", value: stats.cancelled, color: appColors.red, emptyColor: "#fff1f0" },
    { label: "لم يحضر", value: stats.no_show, color: appColors.gray, emptyColor: "#f5f5f5" },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        position: "relative",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* الدائرة البيانية الوسطية */}
      <div
        style={{
          width: "260px",
          height: "260px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotate(${isLoading ? key * 360 : 0}deg)`,
          transition: "transform 1s linear",
        }}
      >
        <VictoryPie
          key={key}
          data={chartData}
          width={300}
          height={300}
          innerRadius={85}
          outerRadius={110}
          padding={10}
          colorScale={colorScale}
          style={{
            data: {
              stroke: "#ffffff",
              strokeWidth: 2,
            },
            labels: {
              fill: appColors.textMain,
              fontSize: 15,
              fontWeight: "bold",
            },
          }}
          labels={isLoading || isEmpty ? () => null : ({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={
            isLoading || isEmpty ? null : (
              <VictoryTooltip
                style={{
                  fontFamily: "inherit",
                  fontSize: 15,
                  fill: appColors.textMain,
                  fontWeight: "bold",
                }}
                flyoutStyle={{
                  stroke: "#d0d0d0",
                  strokeWidth: 1.5,
                  fill: "#ffffff",
                }}
                pointerLength={8}
                flyoutPadding={12}
              />
            )
          }
          animate={{
            duration: 1000,
            onLoad: { duration: 1000, before: () => ({ startAngle: 0, endAngle: 0 }) },
          }}
        />

        {/* النص الثابت في قلب الدائرة */}
        <div
          style={{
            position: "absolute",
            fontFamily: "inherit",
            direction: "rtl",
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {isLoading ? (
            <span style={{ fontSize: "16px", fontWeight: "700", color: appColors.textSecondary }}>
              جاري التحميل...
            </span>
          ) : (
            <>
              <span
                style={{
                  fontSize: "44px",
                  fontWeight: "900",
                  color: isEmpty ? "#b3b3b3" : appColors.textMain,
                  lineHeight: "1",
                }}
              >
                {totalNumber}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: isEmpty ? "#161111" : appColors.textSecondary,
                  marginTop: "6px",
                }}
              >
                إجمالي المواعيد
              </span>
            </>
          )}
        </div>
      </div>

      {/* المحاذاة والتعديل الجديد للـ Legend السفلية لمنع تداخل الكلمات */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px 18px", // تباعد مرن وممتاز يمنع التراكم والتراص
          direction: "rtl",
          width: "100%",
          marginTop: "10px",
          padding: "0 10px",
          opacity: isLoading ? 0.3 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {legendItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* الدائرة الملونة التوضيحية */}
            <span
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: isEmpty ? item.emptyColor : item.color,
                borderRadius: "50%",
                display: "inline-block",
                flexShrink: 0,
                border: `2px solid ${isEmpty ? "#d0d0d0" : item.color}`,
              }}
            />
            {/* النص مدمجاً معه القيمة العددية بوضوح تام */}
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: isEmpty ? "#080101" : appColors.textMain,
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}{" "}
              <span style={{ fontWeight: "800", color: isEmpty ? "#0e0b0b" : item.color }}>
                ({item.value})
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
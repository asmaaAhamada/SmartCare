import React, { useState } from "react";
import { Table, Tag, Space, Input, message } from "antd";
import { Button as MUIButton, Box, Card, Typography, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";
import { 
  AccountBalanceWalletOutlined, 
  TrendingUpOutlined, 
  SettingsBackupRestoreOutlined, 
  FilterAltOutlined,
  CalendarMonthOutlined,
  CheckCircleOutlined,
  AssignmentReturnOutlined,
  LocalAtmOutlined,
  SearchOutlined
} from "@mui/icons-material";

import { baby_blue } from "../../color-main/color";
// استيراد كمبوننت المودال الجديد المفصول
import RefundModal from "./RefundModal";

const PRIMARY_DARK = "#0a566c";  
const PRIMARY_LIGHT = "#13296a"; 
const SECONDARY_BLUE = "#3faec5"; 
const ACCENT_RED = "#d32f2f";    

const initialPaymentsData = [
  { id: 1, patientId: 5, patientName: "أحمد الوتار", amount: 150, paymentMethod: "cash", date: "2026-06-15", status: "completed", refundAmount: 0, refundReason: "" },
  { id: 2, patientId: 12, patientName: "سارة العلي", amount: 200, paymentMethod: "card", date: "2026-06-18", status: "completed", refundAmount: 0, refundReason: "" },
  { id: 3, patientId: 8, patientName: "خالد منصور", amount: 300, paymentMethod: "cash", date: "2026-06-20", status: "partial_refunded", refundAmount: 100, refundReason: "رسوم إلغاء متأخر - استرجاع جزئي" },
  { id: 4, patientId: 3, patientName: "رنا العبدالله", amount: 120, paymentMethod: "card", date: "2026-06-22", status: "refunded", refundAmount: 120, refundReason: "إلغاء الموعد من قبل الطبيب" },
  { id: 5, patientId: 5, patientName: "أحمد الوتار", amount: 90, paymentMethod: "cash", date: "2026-06-25", status: "completed", refundAmount: 0, refundReason: "" },
];

export default function FinancialManagement() {
  const [payments, setPayments] = useState(initialPaymentsData);
  const [filterMethod, setFilterMethod] = useState("all");
  const [searchPatientId, setSearchPatientId] = useState("");
  
  // التحكم بحالة المودال المفصول
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const sidebarBlue = baby_blue || SECONDARY_BLUE;

  const filteredPayments = payments.filter((item) => {
    const matchesMethod = filterMethod === "all" || item.paymentMethod === filterMethod;
    const matchesPatient = searchPatientId === "" || item.patientId.toString() === searchPatientId;
    return matchesMethod && matchesPatient;
  });

  const totalEarnings = payments.filter(p => p.status === "completed" || p.status === "partial_refunded").reduce((sum, p) => sum + (p.amount - p.refundAmount), 0);
  const totalRefunds = payments.reduce((sum, p) => sum + p.refundAmount, 0);
  const activeTransactions = filteredPayments.length;

  const handleOpenRefundModal = (record) => {
    setSelectedPayment(record);
    setIsRefundModalOpen(true);
  };

  // ميثود استلام الداتا المحدثة من المودال المفصول وتحديث الستيت (أو الـ API)
  const handleConfirmRefund = (values, refundType) => {
    setPayments((prev) => 
      prev.map((pay) => {
        if (pay.id === selectedPayment.id) {
          const isFull = refundType === "full" || values.refundAmount === (pay.amount - pay.refundAmount);
          return {
            ...pay,
            status: isFull ? "refunded" : "partial_refunded",
            refundAmount: pay.refundAmount + values.refundAmount,
            refundReason: values.refundReason
          };
        }
        return pay;
      })
    );
    message.success(`تمت عملية الاسترجاع بنجاح لـ ${selectedPayment.patientName} ✨`);
    setIsRefundModalOpen(false);
  };

  const columns = [
    {
      title: "رقم الدفعة",
      dataIndex: "id",
      key: "id",
      render: (id) => <Typography variant="body2" sx={{ fontWeight: "bold", color: PRIMARY_LIGHT }}>#{id}</Typography>,
    },
    {
      title: "معرف المريض",
      dataIndex: "patientId",
      key: "patientId",
      render: (pId) => <Tag color="blue">ID: {pId}</Tag>,
    },
    {
      title: "اسم المريض",
      dataIndex: "patientName",
      key: "patientName",
      render: (name) => <Typography variant="body2" sx={{ fontWeight: 600 }}>{name}</Typography>,
    },
    {
      title: "المبلغ الإجمالي",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <Typography variant="body2" sx={{ fontWeight: "700", color: PRIMARY_DARK }}>{amount} AED</Typography>,
    },
    {
      title: "طريقة الدفع",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <Tag color={method === "cash" ? "cyan" : "geekblue"} style={{ textTransform: "uppercase", fontWeight: "bold" }}>
          {method === "cash" ? "نقداً / Cash" : "بطاقة / Card"}
        </Tag>
      ),
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
          <CalendarMonthOutlined fontSize="small" />
          <Typography variant="caption">{date}</Typography>
        </Box>
      ),
    },
    {
      title: "الحالة المالية",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        if (status === "completed") return <Tag color="success" icon={<CheckCircleOutlined style={{ fontSize: 12 }} />}>مكتملة</Tag>;
        if (status === "partial_refunded") return <Tag color="warning" icon={<LocalAtmOutlined style={{ fontSize: 12 }} />}>مسترجع جزئياً ({record.refundAmount} AED)</Tag>;
        return <Tag color="error" icon={<AssignmentReturnOutlined style={{ fontSize: 12 }} />}>مسترجع بالكامل</Tag>;
      },
    },
    {
      title: "إجراءات بورصة المرتجعات",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {record.status !== "refunded" ? (
            <MUIButton 
              variant="outlined" 
              color="error" 
              size="small"
              startIcon={<SettingsBackupRestoreOutlined />}
              onClick={() => handleOpenRefundModal(record)}
              sx={{ borderRadius: "8px", textTransform: "none", fontSize: "12px", fontFamily: "inherit" }}
            >
              طلب استرجاع
            </MUIButton>
          ) : (
            <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>لا يوجد إجراء متاح</Typography>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", direction: "rtl", p: 1 }}>
      
      <style>{`
        .financial-table .ant-table-thead > tr > th {
          background-color: ${PRIMARY_DARK} !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          border-bottom: none !important;
          font-family: inherit !important;
        }
        .financial-table .ant-table-container {
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.03);
        }
        .ticker-card {
          border-left: 4px solid ${sidebarBlue} !important;
          transition: all 0.3s ease;
        }
        .ticker-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08) !important;
        }
      `}</style>

      {/* لوحة البورصة الحية */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="ticker-card" sx={{ p: 2.5, borderRadius: "16px", background: "linear-gradient(135deg, #fff 0%, #f4f9fa 100%)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>إجمالي الإيرادات الصافية 📈</Typography>
                <AccountBalanceWalletOutlined sx={{ color: PRIMARY_DARK, fontSize: 28 }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, color: PRIMARY_DARK }}>
                {totalEarnings} <span style={{ fontSize: 16 }}>AED</span>
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="ticker-card" sx={{ p: 2.5, borderRadius: "16px", background: "linear-gradient(135deg, #fff 0%, #fff5f5 100%)", borderLeftColor: `${ACCENT_RED} !important` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>رأس المال المسترجع 🔄</Typography>
                <SettingsBackupRestoreOutlined sx={{ color: ACCENT_RED, fontSize: 28 }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, color: ACCENT_RED }}>
                {totalRefunds} <span style={{ fontSize: 16 }}>AED</span>
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="ticker-card" sx={{ p: 2.5, borderRadius: "16px", background: "linear-gradient(135deg, #fff 0%, #f6f8ff 100%)", borderLeftColor: `${PRIMARY_LIGHT} !important` }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>حركات التداول المفلترة 📊</Typography>
                <TrendingUpOutlined sx={{ color: PRIMARY_LIGHT, fontSize: 28 }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, color: PRIMARY_LIGHT }}>
                {activeTransactions} <span style={{ fontSize: 16 }}>عملية</span>
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* شريط التحكم والبحث */}
      <Card sx={{ p: 2.5, mb: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={7} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FilterAltOutlined sx={{ color: PRIMARY_DARK }} />
            <Typography variant="body2" sx={{ fontWeight: 700, minWidth: "110px" }}>بوابة فلاتر الدفع:</Typography>
            <ToggleButtonGroup
              value={filterMethod}
              exclusive
              onChange={(e, next) => next && setFilterMethod(next)}
              size="small"
              color="primary"
              sx={{ direction: "ltr" }}
            >
              <ToggleButton value="all" sx={{ fontWeight: 600, fontFamily: "inherit" }}>الكل</ToggleButton>
              <ToggleButton value="cash" sx={{ fontWeight: 600, fontFamily: "inherit" }}>المدفوعات النقدية (Cash)</ToggleButton>
              <ToggleButton value="card" sx={{ fontWeight: 600, fontFamily: "inherit" }}>الشبكة / البطاقة (Card)</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <Input 
              placeholder="البحث السريع بمعرف المريض (Patient ID)..." 
              prefix={<SearchOutlined style={{ color: "gray" }} />}
              value={searchPatientId}
              onChange={(e) => setSearchPatientId(e.target.value)}
              style={{ borderRadius: "8px", padding: "8px 12px" }}
              allowClear
            />
          </Grid>
        </Grid>
      </Card>

      {/* الجدول الرئيسي */}
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Table 
          className="financial-table"
          columns={columns}
          dataSource={filteredPayments}
          rowKey="id"
          pagination={{ pageSize: 6, position: ["bottomCenter"] }}
          locale={{ emptyText: "📊 لا يوجد حركات دفع تطابق فلاتر التداول المحددة حالياً." }}
        />
      </motion.div>

      {/* استدعاء المودال المفصول وتمرير الخواص والأكشنز المباشرة */}
      <RefundModal 
        open={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        selectedPayment={selectedPayment}
        onConfirmRefund={handleConfirmRefund}
      />

    </Box>
  );
}
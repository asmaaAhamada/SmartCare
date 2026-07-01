import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Skeleton } from '@mui/material';
import { Table, Tag, Empty } from 'antd';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentDetailsModal from './PaymentDetailsModal';
import { fetchpayments } from '../../backend/slice/accounting/fetchAll';
import { useDispatch, useSelector } from 'react-redux';
import { payments_stats } from '../../backend/slice/accounting/satiscs';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';

import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

import {
  refundPayment,
  resetRefundState,
} from "../../backend/slice/accounting/refundSlice";
const PaymentsManager = () => {
    const dispatch = useDispatch();

  const [selectedPayment, setSelectedPayment] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [refundOpen, setRefundOpen] = useState(false);
const [openSnackbar, setOpenSnackbar] = useState(false);
const [refundPaymentId, setRefundPaymentId] = useState(null);

const [refundAmount, setRefundAmount] = useState("");

const [refundReason, setRefundReason] = useState("");

const {
  isLoading: refundLoading,
  success: refundSuccess,
  error: refundError,
  message,
} = useSelector((state) => state.refundPayment);
useEffect(() => {
  if (refundSuccess) {
    setOpenSnackbar(true);

    setRefundOpen(false);
    setRefundAmount("");
    setRefundReason("");

    dispatch(fetchpayments());
  }
}, [refundSuccess, dispatch]);
useEffect(() => {
  if (refundSuccess) {
    setOpenSnackbar(true);

    setRefundOpen(false);

    setRefundAmount("");
    setRefundReason("");

    dispatch(fetchpayments());
  }
}, [refundSuccess, dispatch]);
useEffect(() => {
  if (refundError) {
    setOpenSnackbar(true);
  }
}, [refundError]);
  
const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
  dispatch(resetRefundState());
};

const handleRefund = () => {
  if (!refundAmount || !refundReason) return;

  dispatch(
    refundPayment({
      paymentId: refundPaymentId,
      data: {
        refund_amount: Number(refundAmount),
        refund_reason: refundReason,
      },
    })
  );
};
  // استدعاء الحالات البرمجية من السلايس الحقيقي للباك إيند
  const { data: serverData, isLoading } = useSelector((state) => state.fetchpayments);
  const { data: Data, Loading } = useSelector((state) => state.payments_stats);

console.log(Data)

  useEffect(() => {
    dispatch(payments_stats());
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchpayments());
  }, [dispatch]);

  const accountingColor = '#1E293B';

  // حساب الإجماليات ديناميكياً من البيانات القادمة من الـ API
  const totalAmount = serverData?.reduce((sum, item) => sum + Number(item.amount || 0), 0) || 0;
  const successfulTransactions = serverData?.filter(item => item.status === 'succeeded').length || 0;

  // مطابقة الـ Columns مع الـ JSON الفعلي المستلم من الـ API
  const columns = [
    { 
      title: 'رقم المعاملة', 
      dataIndex: 'id', 
      key: 'id', 
      align: 'center',
      render: (id) => `TXN-${id}` // تنسيق المعرف برمجياً
    },
    { 
      title: 'المريض', 
      dataIndex: 'patient', 
      key: 'patient', 
      align: 'center' 
    },
    { 
      title: 'المبلغ', 
      dataIndex: 'amount', 
      key: 'amount', 
      align: 'center',
      render: (amount, record) => `${amount.toLocaleString()} ${record.currency || 'SYP'}`
    },
    { 
      title: 'الآلية', 
      dataIndex: 'method', 
      key: 'method', 
      align: 'center', 
      render: (m) => <Tag color={m === 'cash' ? 'blue' : 'purple'}>{m === 'cash' ? 'نقدي' : m}</Tag> 
    },
    { 
      title: 'الحالة', 
      dataIndex: 'status', 
      key: 'status', 
      align: 'center', 
      render: (s) => <Tag color={s === 'succeeded' ? 'green' : 'orange'}>{s === 'succeeded' ? 'ناجحة' : s}</Tag> 
    },
    {
      title: 'التفاصيل',
      key: 'action',
      align: 'center',
    render: (_, record) => (
  <Box display="flex" justifyContent="center" gap={1}>

    <Button
      size="small"
      variant="outlined"
      sx={{
        color: accountingColor,
        borderColor: accountingColor,
        fontFamily: "Cairo",
      }}
      onClick={() => {
        setSelectedPayment(record.id);
        setIsModalOpen(true);
      }}
    >
      تفاصيل
    </Button>

    <Tooltip title="طلب استرداد">

      <IconButton
        color="error"
        onClick={() => {
          setRefundPaymentId(record.id);

          setRefundOpen(true);
        }}
      >
        <AssignmentReturnedOutlinedIcon />
      </IconButton>

    </Tooltip>

  </Box>
)
    },
  ];

  return (
    <Box dir="rtl" p={2}>
      <Typography variant="h5" fontWeight="bold" mb={3} style={{ color: accountingColor, fontFamily: 'Cairo' }}>
        إدارة الحركات المالية والمدفوعات الفورية
      </Typography>
      
      {/* قسم كروت الإحصائيات مع معالجة اللودينغ بالسيلكتون */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" style={{ borderRight: `6px solid ${accountingColor}` }}>
            <CardContent style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <AccountBalanceIcon sx={{ fontSize: 40, color: accountingColor }} />
              <Box width="100%">
                <Typography color="textSecondary" variant="body2">إجمالي التحصيل المالي الحالي</Typography>
                {isLoading ? (
                  <Skeleton width="60%" height={32} />
                ) : (
                  <Typography variant="h6" fontWeight="bold">{totalAmount.toLocaleString()} SYP</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" style={{ borderRight: `6px solid #2e7d32` }}>
            <CardContent style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Box width="100%">
                <Typography color="textSecondary" variant="body2">العمليات الناجحة للرول</Typography>
                {isLoading ? (
                  <Skeleton width="40%" height={32} />
                ) : (
                  <Typography variant="h6" fontWeight="bold">{successfulTransactions} عملية دفع</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <style>{`
        .ant-table-wrapper .ant-table-thead > tr > th { background-color: ${accountingColor} !important; color: white !important; font-weight: bold !important; text-align: center !important; }
        .ant-table-wrapper .ant-table-tbody > tr > td { font-family: 'Cairo', sans-serif !important; }
      `}</style>

      {/* معالجة حالات عرض الجدول (Loading السيلكتون -> Empty الخالي -> الجدول الفعلي) */}
      {isLoading ? (
        <Box>
          {/* محاكاة شكل هيدر وأسطر الجدول بالسيلكتون النظيف */}
          <Skeleton variant="rectangular" height={50} style={{ borderRadius: '8px 8px 0 0', marginBottom: '8px' }} />
          {[1, 2, 3].map((index) => (
            <Skeleton key={index} variant="rectangular" height={45} style={{ marginBottom: '6px', borderRadius: '4px' }} />
          ))}
        </Box>
      ) : serverData.length === 0 ? (
        <Card variant="outlined" style={{ padding: '40px', borderRadius: '12px' }}>
          <Empty description={<Typography style={{ fontFamily: 'Cairo', color: '#666' }}>لا توجد دفعات أو حركات مالية مسجلة حالياً بالمنظومة</Typography>} />
        </Card>
      ) : (
        <Table 
          columns={columns} 
          dataSource={serverData} 
          rowKey="id" // الـ unique key القادم من قاعدة البيانات
          bordered 
          scroll={{ x: 'max-content' }} 
          pagination={{ pageSize: 5 }} 
        />
      )}

      <PaymentDetailsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} payment={selectedPayment} />
        <Dialog
    open={refundOpen}
    onClose={() => {
        setRefundOpen(false);

        dispatch(resetRefundState());
    }}
    fullWidth
    maxWidth="sm"
      PaperProps={{
    sx: {
      borderRadius: 3,
      p: 1,
    },
  }}
>

   <DialogTitle
  sx={{
    textAlign: "center",
    fontFamily: "Cairo",
    fontWeight: "bold",
    fontSize: 22,
    pb: 1,
  }}
>
  طلب استرداد
</DialogTitle>

    <DialogContent>

       <TextField
  fullWidth
  margin="normal"
  type="number"
  label="مبلغ الاسترداد"
  value={refundAmount}
  onChange={(e) => setRefundAmount(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AttachMoneyIcon color="action" />
      </InputAdornment>
    ),
  }}
/>

        <TextField
  fullWidth
  margin="normal"
  multiline
  rows={3}
  label="سبب الاسترداد"
  value={refundReason}
  onChange={(e) => setRefundReason(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment
        position="start"
        sx={{ alignSelf: "flex-start", mt: 1 }}
      >
        <DescriptionOutlinedIcon color="action" />
      </InputAdornment>
    ),
  }}
/>


    </DialogContent>

    <DialogActions
  sx={{
    px: 3,
    pb: 3,
    justifyContent: "space-between",
  }}
>
  <Button
    onClick={() => {
      setRefundOpen(false);
      dispatch(resetRefundState());
    }}
    sx={{
      color: "grey.700",
      fontFamily: "Cairo",
      fontWeight: 600,
    }}
  >
    إلغاء
  </Button>

  <Button
    variant="contained"
    disabled={refundLoading}
    onClick={handleRefund}
    sx={{
      backgroundColor: "#6B7280",
      color: "#fff",
      fontFamily: "Cairo",
      fontWeight: "bold",
      borderRadius: 2,
      px: 4,
      "&:hover": {
        backgroundColor: "#4B5563",
      },
    }}
  >
    {refundLoading ? "جاري التنفيذ..." : "تنفيذ الاسترداد"}
  </Button>
</DialogActions>

</Dialog>
<Snackbar
  open={openSnackbar}
  autoHideDuration={4000}
  onClose={() => {
    setOpenSnackbar(false);
    dispatch(resetRefundState());
  }}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    severity={refundSuccess ? "success" : "error"}
    onClose={() => {
      setOpenSnackbar(false);
      dispatch(resetRefundState());
    }}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {refundSuccess ? message : refundError}
  </Alert>
</Snackbar>
    </Box>
  );
};

export default PaymentsManager;
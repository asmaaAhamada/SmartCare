import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchDetailspayments } from "../../backend/slice/accounting/deteails";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PaymentsIcon from "@mui/icons-material/Payments";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const accountingColor = "#1E293B";

const DetailItem = ({ icon, title, value }) => (
  <Grid item xs={12} sm={6}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        background: "#FAFAFA",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          bgcolor: "#EEF2FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: accountingColor,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontFamily: "Cairo" }}
        >
          {title}
        </Typography>

        <Typography
          fontWeight="bold"
          sx={{ fontFamily: "Cairo", mt: 0.5 }}
        >
          {value || "-"}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

const PaymentDetailsModal = ({ open, onClose, payment }) => {
  const dispatch = useDispatch();

  const { data: details, isLoading } = useSelector(
    (state) => state.fetchDetailspayments
  );

  useEffect(() => {
    if (open && payment) {
      dispatch(fetchDetailspayments(payment));
    }
  }, [dispatch, open, payment]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: accountingColor,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontFamily: "Cairo",
          fontWeight: "bold",
        }}
      >
        <AccountBalanceWalletIcon />
        تفاصيل عملية الدفع
      </DialogTitle>

      <DialogContent dividers dir="rtl">
        {isLoading ? (
          <Box
            sx={{
              py: 6,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} mt={1}>
            <DetailItem
              icon={<ReceiptLongIcon />}
              title="رقم العملية"
              value={`TXN-${details?.id}`}
            />

            <DetailItem
              icon={<PersonIcon />}
              title="المريض"
              value={`${details?.patient?.profile?.first_name || ""} ${
                details?.patient?.profile?.last_name || ""
              }`}
            />

            <DetailItem
              icon={<LocalHospitalIcon />}
              title="الطبيب"
              value={`${details?.appointment?.doctor?.profile?.first_name || ""} ${
                details?.appointment?.doctor?.profile?.last_name || ""
              }`}
            />

            <DetailItem
              icon={<PaymentsIcon />}
              title="المبلغ"
              value={`${details?.amount || 0} ${details?.currency || ""}`}
            />

            <DetailItem
              icon={<CreditCardIcon />}
              title="طريقة الدفع"
              value={details?.payment_method}
            />

            <DetailItem
              icon={<CheckCircleIcon />}
              title="الحالة"
              value={details?.status}
            />

            <DetailItem
              icon={<EventAvailableIcon />}
              title="موعد الزيارة"
              value={
                details?.appointment?.appointment_date
                  ? new Date(
                      details.appointment.appointment_date
                    ).toLocaleString("ar-SY")
                  : "-"
              }
            />

            <DetailItem
              icon={<CalendarMonthIcon />}
              title="تاريخ الدفع"
              value={
                details?.paid_at
                  ? new Date(details.paid_at).toLocaleString("ar-SY")
                  : "-"
              }
            />
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: accountingColor,
            fontFamily: "Cairo",
            px: 4,
            "&:hover": {
              bgcolor: accountingColor,
            },
          }}
        >
          إغلاق
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDetailsModal;
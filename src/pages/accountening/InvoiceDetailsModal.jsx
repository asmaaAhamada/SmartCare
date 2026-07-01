
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsinnvocing } from "../../backend/slice/accounting/deteails_invocing";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PaymentsIcon from "@mui/icons-material/Payments";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
        bgcolor: "#FAFAFA",
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
          sx={{ fontFamily: "Cairo", mt: .5 }}
        >
          {value || "-"}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

const InvoiceDetailsModal = ({ open, onClose, invoice }) => {
  const dispatch = useDispatch();

  const { data: details, isLoading } = useSelector(
    (state) => state.fetchDetailsinnvocing
  );

  useEffect(() => {
    if (open && invoice) {
      dispatch(fetchDetailsinnvocing(invoice));
    }
  }, [dispatch, open, invoice]);

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
          bgcolor: accountingColor,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontFamily: "Cairo",
          fontWeight: "bold",
        }}
      >
        <ReceiptLongIcon />
        تفاصيل الفاتورة
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
              icon={<PersonIcon />}
              title="المريض"
              value={`${details?.patient?.profile?.first_name || ""} ${
                details?.patient?.profile?.last_name || ""
              }`}
            />

            <DetailItem
              icon={<LocalHospitalIcon />}
              title="الطبيب"
              value={`${details?.doctor?.profile?.first_name || ""} ${
                details?.doctor?.profile?.last_name || ""
              }`}
            />

            <DetailItem
              icon={<PaymentsIcon />}
              title="قيمة الفاتورة"
              value={`${details?.payment?.amount || 0} ${
                details?.payment?.currency || ""
              }`}
            />

            <DetailItem
              icon={<CreditCardIcon />}
              title="طريقة الدفع"
              value={details?.payment?.payment_method}
            />

            <DetailItem
              icon={<CheckCircleIcon />}
              title="حالة الدفع"
              value={details?.payment?.status}
            />

            <DetailItem
              icon={<CalendarMonthIcon />}
              title="تاريخ الموعد"
              value={
                details?.appointment_date
                  ? new Date(details.appointment_date).toLocaleDateString(
                      "ar-SY"
                    )
                  : "-"
              }
            />

            <DetailItem
              icon={<AccessTimeIcon />}
              title="وقت الموعد"
              value={details?.appointment_time}
            />

            <DetailItem
              icon={<EventAvailableIcon />}
              title="مدة الجلسة"
              value={`${details?.duration_minutes || 0} دقيقة`}
            />

            <DetailItem
              icon={<ReceiptLongIcon />}
              title="نوع الزيارة"
              value={details?.type}
            />

            <DetailItem
              icon={<CalendarMonthIcon />}
              title="تاريخ الدفع"
              value={
                details?.payment?.paid_at
                  ? new Date(details.payment.paid_at).toLocaleString("ar-SY")
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
            px: 4,
            fontFamily: "Cairo",
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

export default InvoiceDetailsModal;


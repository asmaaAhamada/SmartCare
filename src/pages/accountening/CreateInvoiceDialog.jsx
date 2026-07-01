import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  createInvoice,
  resetCreateInvoice,
} from "../../backend/slice/accounting/createInvoice";
import { fetchinnvocing } from "../../backend/slice/accounting/invocing";

const CreateInvoiceDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { isLoading, success } = useSelector(
    (state) => state.createInvoice
  );

  const [appointmentId, setAppointmentId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    if (success) {
      dispatch(fetchinnvocing());

      dispatch(resetCreateInvoice());

      setAppointmentId("");
      setPaymentMethod("cash");

      onClose();
    }
  }, [success]);

  const handleCreate = () => {
    dispatch(
      createInvoice({
        appointment_id: Number(appointmentId),
        payment_method: paymentMethod,
      })
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      <DialogTitle>إنشاء فاتورة</DialogTitle>

      <DialogContent>

        <TextField
          margin="normal"
          fullWidth
          label="Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
        />

        <TextField
          margin="normal"
          fullWidth
          select
          label="طريقة الدفع"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="card">Card</MenuItem>
        </TextField>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          إلغاء
        </Button>

        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? "جاري الإنشاء..." : "إنشاء"}
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default CreateInvoiceDialog;
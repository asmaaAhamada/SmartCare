import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ADD_medications ,resetAddMedicineState} from "../../backend/slice/pharmecy/add";
import Swal from 'sweetalert2';

const pharmacyColor = "#4A148C";

const initialData = {
  name: "",
  generic_name: "",
  manufacturer: "",
  category: "",
  dosage_form: "",
  strength: "",
  barcode: "",
  price: "",
};

const AddMedicineModal = ({ open, onClose, onRefresh }) => {
  const dispatch = useDispatch();

  const { loading, success ,error} = useSelector(
    (state) => state.ADD_medications
  );

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (success) {
      setFormData(initialData);
      onClose();
      onRefresh();
    }
  }, [success]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(
      ADD_medications({
        name: formData.name,
        generic_name: formData.generic_name,
        manufacturer: formData.manufacturer,
        category: formData.category,
        dosage_form: formData.dosage_form,
        strength: formData.strength,
        barcode: formData.barcode,
        price: Number(formData.price),
      })
    );
  };
useEffect(() => {
    if(success){

        Swal.fire({
            icon:"success",
            title:"تمت الإضافة بنجاح",
            timer:1800,
            showConfirmButton:false
        });

        setFormData(initialData);

        onRefresh();

        onClose();

        dispatch(resetAddMedicineState());
    }

},[success]);
useEffect(()=>{

if(error){

Swal.fire({
icon:"error",
title:"فشلت عملية الإضافة",
text:error
});

dispatch(resetAddMedicineState());

}

},[error]);
  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose}
      maxWidth="sm"
      fullWidth
      dir="rtl"
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          color: pharmacyColor,
          fontWeight: "bold",
        }}
      >
        إضافة دواء جديد
      </DialogTitle>

      <DialogContent dividers>

        <TextField
          fullWidth
          margin="normal"
          size="small"
          label="الاسم التجاري"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          size="small"
          label="الاسم العلمي"
          value={formData.generic_name}
          onChange={(e) => handleChange("generic_name", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          size="small"
          label="الشركة المصنعة"
          value={formData.manufacturer}
          onChange={(e) => handleChange("manufacturer", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          size="small"
          label="الفئة العلاجية"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          size="small"
          label="الشكل الدوائي"
          value={formData.dosage_form}
          onChange={(e) => handleChange("dosage_form", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          size="small"
          label="التركيز"
          value={formData.strength}
          onChange={(e) => handleChange("strength", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          size="small"
          label="الباركود"
          value={formData.barcode}
          onChange={(e) => handleChange("barcode", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          size="small"
          type="number"
          label="السعر"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
      </DialogContent>

      <DialogActions>

        <Button
          disabled={loading}
          onClick={onClose}
        >
          إلغاء
        </Button>

        <Button
          variant="contained"
          disabled={loading}
          sx={{ backgroundColor: pharmacyColor }}
          onClick={handleSubmit}
        >
          {loading ? "جاري الإضافة..." : "إضافة"}
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default AddMedicineModal;
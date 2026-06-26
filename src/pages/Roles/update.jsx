import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";

// استيراد أيقونات عصرية متناسقة مع الحقول
import {
  ShieldOutlined as RoleIcon,
  BadgeOutlined as DisplayNameIcon,
  DescriptionOutlined as DescriptionIcon,
  LockOpenOutlined as PermissionIcon,
  Close as CloseIcon,
  CheckCircleOutline as SaveIcon,
} from "@mui/icons-material";

import { fetchAllRoles } from "../../backend/slice/pirmission/groupfitsh";
import { Add_Role } from "../../backend/slice/pirmission/addRole";
import { Update_Role } from "../../backend/slice/pirmission/edite";

// اللون الأزرق المعتمد الخاص بك
const CUSTOM_BLUE = "#035970";

// تخصيص الستايل الموحد للـ Borders الخاص بالحقول ولون الفوكس والتايتل
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: `${CUSTOM_BLUE}40`, // لون شفاف خفيف في الحالة العادية
    },
    "&:hover fieldset": {
      borderColor: CUSTOM_BLUE,
    },
    "&.Mui-focused fieldset": {
      borderColor: CUSTOM_BLUE,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: CUSTOM_BLUE,
  },
};

export default function EditRoleModal({
    open,
    handleClose,
    role,
    onSuccess,
}){  const dispatch = useDispatch();

  const { data: responseData } = useSelector(
    (state) => state.fetchAllRoles
  );

const permissions = Object.values(responseData?.data || {}).flat();

  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    description: "",
    permissions: [], // IDs فقط
  });

 useEffect(() => {
    if(open && role){

        setFormData({
            name: role.systemName,
            display_name: role.name,
            description: role.description,
            permissions: role.permissions.map(p=>p.id)
        });

        dispatch(fetchAllRoles());

    }
},[open,role]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
await dispatch(
    Update_Role({
        id: role.id,
        roleData: formData,
    })
).unwrap();
   Swal.fire({
    icon:"success",
    title:"تم التعديل",
    text:"تم تعديل الدور بنجاح",
    timer:1800,
    showConfirmButton:false,
});

handleClose();

onSuccess?.();

    setFormData({
      name: "",
      display_name: "",
      description: "",
      permissions: [],
    });

    handleClose();

    if (onSuccess) {
      onSuccess();
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "فشل",
      text: err?.message || "حدث خطأ أثناء إضافة الدور",
      confirmButtonColor: "#d33",
    });
  }
};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      dir="rtl"
      PaperProps={{
        sx: { borderRadius: "12px" } // زوايا ناعمة للمودال بشكل عصري
      }}
    >
      {/* HEADER: تم إزالة الخلفية الملونة وأصبح بخلفية بيضاء وخط فاصل خفيف */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#fff",
          color: CUSTOM_BLUE,
          borderBottom: "1px solid #eaeaea",
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <RoleIcon sx={{ fontSize: "26px" }} />
          <Typography variant="h6" fontWeight="bold">إضافة دور جديد</Typography>
        </Box>

        <IconButton onClick={handleClose} sx={{ color: "#9e9e9e", "&:hover": { color: "#555" } }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ py: 4, px: 3 }}>
          <Grid container spacing={3}>
            {/* NAME */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="اسم الدور"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={textFieldStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RoleIcon sx={{ color: CUSTOM_BLUE }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* DISPLAY NAME */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="الاسم المعروض"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                required
                sx={textFieldStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DisplayNameIcon sx={{ color: CUSTOM_BLUE }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="الوصف"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={textFieldStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                      <DescriptionIcon sx={{ color: CUSTOM_BLUE }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* PERMISSIONS DROPDOWN */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={permissions}
                getOptionLabel={(option) => option.display_name}
                value={permissions.filter((p) =>
                  formData.permissions.includes(p.id)
                )}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    permissions: newValue.map((item) => item.id),
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="الصلاحيات"
                    placeholder="اختر الصلاحيات"
                    sx={textFieldStyles}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <PermissionIcon sx={{ color: CUSTOM_BLUE }} />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* ACTIONS */}
        <DialogActions sx={{ justifyContent: "flex-start", p: 3, gap: 1.5 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              bgcolor: CUSTOM_BLUE,
              px: 4,
              py: 1,
              borderRadius: "6px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#024253", boxShadow: "none" },
            }}
          >
            حفظ
          </Button>

          <Button 
            onClick={handleClose} 
            variant="outlined"
            sx={{
              color: "#757575",
              borderColor: "#ccc",
              px: 4,
              py: 1,
              borderRadius: "6px",
              "&:hover": { borderColor: "#999", bgcolor: "#f9f9f9" }
            }}
          >
            إلغاء
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
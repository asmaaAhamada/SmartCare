import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  CircularProgress,
  Box,
} from "@mui/material";

import { CloudUpload } from "@mui/icons-material";
import { baby_blue } from "../../color-main/color";
// سنستخدم الـ Actions الحالية لتحديث الـ State الداخلي أثناء الكتابة
import {
  setform,
  resetForm,
  editeAnnouncement,
} from "../../backend/slice/announcements/EDITE";
import { fetchAnnouncement } from "../../backend/slice/announcements/fetchAll";
export default function EditAnnouncementModal({ open, onCancel, announcementData }) {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
    const { form, isLoading, error, success } = useSelector((state) => state.editeAnnouncement);
  
  // جلب الـ formInfo المربوط بالـ Inputs ليعرض القيم المحدثة
  const { formInfo } = useSelector((state) => state.AddAnnouncement);

  // ✨ التعبئة التلقائية: فور فتح المودال، يتم أخذ البيانات القادمة من الـ Card وتوزيعها على الحقول
  useEffect(() => {
    if (open && announcementData) {
     dispatch(
  setform({
    title: announcementData.title || "",
    content: announcementData.content || "",
    is_active:
      announcementData.is_active === true ||
      announcementData.is_active === 1,
    starts_at: announcementData.starts_at
      ? announcementData.starts_at.substring(0, 10)
      : "",
    ends_at: announcementData.ends_at
      ? announcementData.ends_at.substring(0, 10)
      : "",
    image_url: announcementData.image_url || "",
  })
);
      
      // إذا كان الإعلان يمتلك صورة مسبقاً، نوضح ذلك للمستخدم في مستطيل الرفع
      if (announcementData.image_url) {
        setFileName("توجد صورة مرفقة مسبقاً لهذا الإعلان");
      } else {
        setFileName("");
      }
    }
  }, [open, announcementData, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
dispatch(
  setform({
    [name]: value,
  })
);  };

  const handleSwitch = (e) => {
dispatch(
  setform({
    is_active: e.target.checked,
  })
);  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
dispatch(
  setform({
    image_url: reader.result,
  })
);      };
      reader.readAsDataURL(file);
    }
  };

  // ستايلات التصميم الموحدة باللون البيبي بلو
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.3s ease",
      "&.Mui-focused fieldset": {
        borderColor: baby_blue,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: baby_blue, 
    },
  };
const handleSubmit = async () => {
  const result = await dispatch(
    editeAnnouncement(announcementData.id)
  );

  if (editeAnnouncement.fulfilled.match(result)) {
    notification.success({
      message: "تم حفظ التعديلات",
      description:
        result.payload?.message ||
        "تم تعديل الإعلان بنجاح",
      placement: "topRight",
      duration: 4,
      icon: (
        <CheckCircleOutlined
          style={{
            color: "#52c41a",
            fontSize: 24,
          }}
        />
      ),
    });

    dispatch(fetchAnnouncement());

    dispatch(resetForm());

    setFileName("");

    onCancel();
  }

  if (editeAnnouncement.rejected.match(result)) {
    notification.error({
      message: "فشل تعديل الإعلان",
      description:
        result.payload ||
        "حدث خطأ أثناء تعديل الإعلان",
      placement: "topRight",
      duration: 6,
      icon: (
        <CloseCircleOutlined
          style={{
            color: "#ff4d4f",
            fontSize: 24,
          }}
        />
      ),
    });
  }
};
  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(resetForm());
        setFileName("");
        onCancel();
      }}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: { borderRadius: "16px", padding: "8px" }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight={700} color={baby_blue} sx={{ pb: 1, borderBottom: '1px solid #f0f0f0' }}>
          تعديل الإعلان الحالي (رقم ID: {announcementData?.id})
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          {/* حقل العنوان */}
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="عنوان الإعلان"
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              sx={textFieldStyles}
              InputLabelProps={{ shrink: true }} // لضمان عدم تداخل التسمية مع النص المعبأ
            />
          </Grid>

          {/* حقل حالة التفعيل */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!!form.is_active}
                  onChange={handleSwitch}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#2e7d32',
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#2e7d32',
                        opacity: 0.5,
                      },
                    },
                  }}
                />
              }
              label={
                <Typography fontWeight={600} color={form.is_active ? "#2e7d32" : "textSecondary"}>
                  تفعيل الإعلان فوراً
                </Typography>
              }
            />
          </Grid>

          {/* تاريخ البدء */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="تاريخ البداية"
              name="starts_at"
              value={form.starts_at || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Grid>

          {/* تاريخ الانتهاء */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="تاريخ النهاية"
              name="ends_at"
              value={form.ends_at || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Grid>

          {/* المحتوى التفصيلي */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="محتوى الإعلان التفصيلي"
              name="content"
              value={form.content || ""}
              onChange={handleChange}
              sx={textFieldStyles}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* الصورة المرفقة */}
          <Grid item xs={12}>
            <Box sx={{ p: 2, border: '1px dashed #d9d9d9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2, backgroundColor: '#fafafa' }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{
                  borderColor: baby_blue,
                  color: baby_blue,
                  borderRadius: "8px",
                  "&:hover": { borderColor: baby_blue, backgroundColor: 'rgba(0, 191, 255, 0.04)' }
                }}
              >
                تغيير الصورة
                <input hidden type="file" accept="image/*" onChange={handleImage} />
              </Button>

              <Typography variant="body2" color={fileName ? "textPrimary" : "textSecondary"} sx={{ fontSize: "14px", fontWeight: fileName ? 600 : 400 }}>
                {fileName || "لم يتم رفع أي صورة"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ padding: "20px", gap: 1.5, borderTop: '1px solid #f0f0f0' }}>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(resetForm());
            setFileName("");
            onCancel();
          }}
          sx={{ borderRadius: "8px", color: '#666', borderColor: '#ccc' }}
        >
          إلغاء الأمر
        </Button>

        {/* زر الحفظ والتعديل */}
       <Button
  variant="contained"
  onClick={handleSubmit}
  disabled={isLoading}
  sx={{
    backgroundColor: baby_blue,
    borderRadius: "8px",
    minWidth: "150px",

    "&:hover": {
      backgroundColor: baby_blue,
      opacity: 0.9,
    },
  }}
>
  {isLoading ? (
    <CircularProgress
      size={20}
      color="inherit"
    />
  ) : (
    "حفظ التعديل"
  )}
</Button>
      </DialogActions>
    </Dialog>
  );
}
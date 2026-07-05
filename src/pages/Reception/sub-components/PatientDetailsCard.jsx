import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Box, Chip } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BadgeIcon from '@mui/icons-material/Badge';

export default function PatientDetailsCard({ patientId }) {
  // فيك داتا تفصيلية دقيقة مستوحاة من الصورة image_37bc2b.png للمريض رقم 32
  const patientDetails = {
    id: 32,
    first_name: "Ahmad",
    last_name: "Ali",
    email: "patient2@test.com",
    phone: "0999999999",
    status: "suspended",
    gender: "male",
    date_of_birth: "1998-05-10",
    national_id: "12345678901",
    blood_type: "O+",
    address: "المزة، دمشق"
  };

  return (
    <Card elevation={4} sx={{ borderRadius: 3, border: '1px solid #FFD54F', bgcolor: '#FFFDE7' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ bgcolor: '#E65100', width: 56, height: 56 }}>
            {patientDetails.first_name[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {patientDetails.first_name} {patientDetails.last_name} (معرف رقم #{patientId})
            </Typography>
            <Chip 
              label={patientDetails.status === 'suspended' ? 'حساب معلق مؤقتاً' : 'نشط'} 
              color={patientDetails.status === 'suspended' ? 'warning' : 'success'} 
              size="small" 
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary"><BadgeIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} /> الرقم الوطني الدولي:</Typography>
            <Typography variant="body1" fontWeight="medium">{patientDetails.national_id}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary"><ContactPhoneIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} /> رقم الهاتف المحمول:</Typography>
            <Typography variant="body1" fontWeight="medium">{patientDetails.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">📧 البريد الإلكتروني:</Typography>
            <Typography variant="body1" fontWeight="medium">{patientDetails.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">📅 تاريخ الميلاد العمراني:</Typography>
            <Typography variant="body1" fontWeight="medium">{patientDetails.date_of_birth}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">🩸 زمرة الدم المعتمدة:</Typography>
            <Typography variant="body1" fontWeight="medium" color="#D32F2F">{patientDetails.blood_type}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">📍 مكان الإقامة الحالي:</Typography>
            <Typography variant="body1" fontWeight="medium">{patientDetails.address}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
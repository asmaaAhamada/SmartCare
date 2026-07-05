import React, { useState, lazy, Suspense } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, Grid } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

const AddNewsModal = lazy(() => import('./sub-components/AddNewsModal'));

export default function ReceptionNews() {
  const [filterActive, setFilterActive] = useState(false);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);

  const newsData = [
    { id: 1, title: "حملة التحصين الصيفية للطلاب", content: "تعلن العيادة عن بدء حملة تحصين لطلاب المدارس بأسعار رمزية.", is_active: true },
    { id: 2, title: "تعديل أوقات الدوام الرسمي في الأعياد", content: "تنويه بخصوص إجازة العيد الرسمية وقسم الطوارئ.", is_active: false }
  ];

  const displayedNews = filterActive ? newsData.filter(n => n.is_active) : newsData;

  return (
    <Box p={3} sx={{ direction: 'rtl' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="#E65100">📰 إعلانات وعاجل العيادة</Typography>
        <Box display="flex" gap={2}>
          <Button variant={filterActive ? "contained" : "outlined"} color="warning" onClick={() => setFilterActive(!filterActive)}>
            {filterActive ? "عرض كل الأخبار 📑" : "الأخبار النشطة فقط 🟢"}
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#E65100' }} onClick={() => setIsAddNewsOpen(true)}>بث خبر جديد 📢</Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {displayedNews.map(item => (
          <Grid item xs={12} key={item.id}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="h6" fontWeight="bold" color="#E65100"><CampaignIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> {item.title}</Typography>
                  <Chip label={item.is_active ? "نشط حالياً" : "مؤرشف"} color={item.is_active ? "success" : "default"} size="small" />
                </Box>
                <Typography variant="body1" color="textSecondary">{item.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ليزي لودينغ لمودال إضافة خبر جديد */}
      <Suspense fallback={<div>جاري تحضير منصة الإعلانات...</div>}>
        {isAddNewsOpen && <AddNewsModal open={isAddNewsOpen} onClose={() => setIsAddNewsOpen(false)} />}
      </Suspense>
    </Box>
  );
}
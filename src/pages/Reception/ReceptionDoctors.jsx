import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Collapse } from '@mui/material';

export default function ReceptionDoctors() {
  const [expandedId, setExpandedId] = useState(null);

  const doctorsData = [
    { id: 10, name: "د. سامر السمور", specialty: "طب الأطفال الصيفي والوقائي", schedule: "السبت إلى الأربعاء (9 - 4 مساءً)", bio: "خبرة 15 سنة في رعاية الأطفال والتحصينات الصيفية." },
    { id: 11, name: "د. مروة الشام", specialty: "الأمراض الجلدية والتجميل", schedule: "الأحد والثلاثاء (12 - 6 مساءً)", bio: "متخصصة في علاج حروق الشمس الحادة والعناية بالبشرة." }
  ];

  return (
    <Box p={3} sx={{ direction: 'rtl' }}>
      <Typography variant="h5" fontWeight="bold" color="#E65100" mb={3}>🩺 أطباؤنا النجوم - دليلك السريع للإجابة على الاستفسارات</Typography>
      <Grid container spacing={3}>
        {doctorsData.map(doc => (
          <Grid item xs={12} sm={6} key={doc.id}>
            <Card sx={{ borderLeft: '6px solid #E65100', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{doc.name}</Typography>
                <Typography color="secondary" variant="subtitle2" mb={1}>{doc.specialty}</Typography>
                <Typography variant="body2" color="textSecondary">⏱️ الدوام: {doc.schedule}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ color: '#E65100' }} onClick={() => setExpandedId(expandedId === doc.id ? null : doc.id)}>
                  {expandedId === doc.id ? "إخفاء التفاصيل ⬆️" : "عرض كامل التفاصيل والنبذة ⬇️"}
                </Button>
              </CardActions>
              <Collapse in={expandedId === doc.id} timeout="auto" unmountOnExit>
                <CardContent bgcolor="#FFFDE7">
                  <Typography variant="body2">{doc.bio}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
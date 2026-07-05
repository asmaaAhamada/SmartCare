import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, InputAdornment } from '@mui/material';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from 'victory';
import SearchIcon from '@mui/icons-material/Search';

export default function ReceptionDashboard() {
  const [searchQueue, setSearchQueue] = useState('');
  
  // داتا وهمية مطابقة تماماً للـ Postman الخاص بك
  const statsData = [
    { x: "مؤكد", y: 12, fill: "#FFB74D" }, // مشمس
    { x: "حاضر", y: 8, fill: "#4DB6AC" },   // فيروزي بحري
    { x: "مكتمل", y: 25, fill: "#81C784" },  // عشبي صيفي
    { x: "ملغي", y: 3, fill: "#E57373" },
    { x: "معلق", y: 6, fill: "#FFD54F" }
  ];

  const queueData = [
    { id: 1, name: "أحمد علي", phone: "0999999999", identity: "123456789", time: "10:30 ص", status: "Waiting" },
    { id: 2, name: "سارة محمد", phone: "0988888888", identity: "987654321", time: "11:00 ص", status: "Checked-In" },
  ];

  return (
    <Box p={3} sx={{ direction: 'rtl' }}>
      <Typography variant="h4" fontWeight="bold" color="#E65100" mb={1}>☀️ صباحك مشرق بنشاط الاستعلامات!</Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>إليك نظرة سريعة على حركة العيادة اليوم ودور الانتظار.</Typography>

      {/* قسم الإحصائيات الصيفية مع الترانزكشن */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>حالة المواعيد اليوم</Typography>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20} animate={{ duration: 1000, onLoad: { duration: 500 } }}>
                <VictoryBar 
                  data={statsData} 
                  style={{ data: { fill: ({ datum }) => datum.fill } }}
                />
              </VictoryChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>توزيع نسب الحضور</Typography>
              <VictoryPie 
                data={statsData} 
                colorScale={["#FFB74D", "#4DB6AC", "#81C784", "#E57373", "#FFD54F"]}
                animate={{ duration: 800 }}
                innerRadius={50}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* استعلامات الكيو Queue */}
      <Card elevation={3} sx={{ borderRadius: 3, p: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="#E65100" mb={2}>🔍 رادار طابور الانتظار (Queue)</Typography>
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <TextField 
            label="ابحث بالتاريخ، الهاتف، الهوية أو البريد..." 
            variant="outlined" 
            fullWidth
            value={searchQueue}
            onChange={(e) => setSearchQueue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" sx={{ bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' } }}>
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* جدول مبسط للكيو */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}>
              <th style={{ padding: '12px' }}>المريض</th>
              <th style={{ padding: '12px' }}>رقم الهاتف</th>
              <th style={{ padding: '12px' }}>الهوية</th>
              <th style={{ padding: '12px' }}>الموعد</th>
              <th style={{ padding: '12px' }}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {queueData.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{item.name}</td>
                <td style={{ padding: '12px' }}>{item.phone}</td>
                <td style={{ padding: '12px' }}>{item.identity}</td>
                <td style={{ padding: '12px' }}>{item.time}</td>
                <td style={{ padding: '12px' }}><span style={{ backgroundColor: item.status === 'Waiting' ? '#FFD54F' : '#4DB6AC', padding: '4px 8px', borderRadius: '4px' }}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Box>
  );
}
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, InputAdornment, keyframes, Skeleton } from '@mui/material';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAxis } from 'victory';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchresption } from '../../backend/slice/reseption/fetchAll';
import LightModeIcon from '@mui/icons-material/LightMode';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { fetchQueue } from '../../backend/slice/reseption/queue';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

export default function ReceptionDashboard() {
  const dispatch = useDispatch();
  
  // داتا المخططات العلوية والإحصائيات العامة
  const { data: responseData, isLoading } = useSelector((state) => state.fetchresption);
  const [searchQueue, setSearchQueue] = useState('');

  useEffect(() => {
    dispatch(fetchresption());
  }, [dispatch]);

  // داتا طابور الانتظار (Queue Slice) مع اللودينغ الخاص بها
  const { data: queueResponse, Loading: isQueueLoading } = useSelector((state) => state.fetchQueue);

  // تأثير لمراقبة حقل البحث وعمل fetch للـ Queue تلقائياً عند الكتابة أو المسح
  useEffect(() => {
    dispatch(fetchQueue({ search: searchQueue }));
  }, [dispatch, searchQueue]);

  // تجهيز بيانات الإحصائيات العامة
  const stats = responseData?.data?.stats || { total: 0, confirmed: 0, checked_in: 0, completed: 0, cancelled: 0, pending: 0 };
  
  // تفكيك طابور الانتظار الحقيقي بناءً على رد الـ API (دمج المنتظرين والحاضرين لعرضهم في الطابور)
  const waitingList = queueResponse?.data?.waiting || [];
  const checkedInList = queueResponse?.data?.checked_in || [];
  const fullQueueData = [...checkedInList, ...waitingList];

  const statsData = [
    { x: "مؤكد", y: stats.confirmed, fill: "#FFB74D" },
    { x: "حاضر", y: stats.checked_in, fill: "#4DB6AC" },
    { x: "مكتمل", y: stats.completed, fill: "#81C784" },
    { x: "ملغي", y: stats.cancelled, fill: "#E57373" },
    { x: "معلق", y: stats.pending, fill: "#FFD54F" }
  ];

  const isChartsEmpty = stats.total === 0;

  return (
    <Box p={3} sx={{ direction: 'rtl' }}>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        color="#E65100" 
        mb={1}
        sx={{ fontFamily: "'Cairo', sans-serif", display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <LightModeIcon sx={{ animation: `${bounce} 2s infinite ease-in-out` }} />
        صباحك مشرق بنشاط الاستعلامات!
      </Typography>

      <Grid container spacing={3} mb={5}>
        {/* مخطط الأعمدة */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>حالة المواعيد اليوم</Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              ) : (
                <VictoryChart 
                  theme={VictoryTheme.material} 
                  domainPadding={20} 
                  animate={{ duration: 1000 }}
                  domain={{ y: [0, 10] }}
                >
                  <VictoryAxis tickValues={["مؤكد", "حاضر", "مكتمل", "ملغي", "معلق"]} />
                  <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />
                  <VictoryBar 
                    data={statsData} 
                    style={{ data: { fill: ({ datum }) => datum.fill, width: 25 } }}
                  />
                </VictoryChart>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* المخطط الدائري */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>توزيع نسب الحضور</Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              ) : isChartsEmpty ? (
                <VictoryPie
                  data={[{ x: "لا يوجد بيانات", y: 1 }]}
                  colorScale={["#E0E0E0"]}
                  labels={({ datum }) => datum.x}
                  innerRadius={70}
                  animate={{ duration: 800 }}
                  style={{ labels: { fill: "#9E9E9E", fontSize: 14, fontWeight: "bold" } }}
                />
              ) : (
                <VictoryPie 
                  data={statsData} 
                  colorScale={["#FFB74D", "#4DB6AC", "#81C784", "#E57373", "#FFD54F"]}
                  animate={{ duration: 800 }}
                  innerRadius={70}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* كرت رادار طابور الانتظار والجدول */}
      <Card elevation={3} sx={{ borderRadius: 3, p: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="#E65100" mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchIcon />
          رادار طابور الانتظار (Queue)
        </Typography>

        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <TextField 
            label="ابحث بالتاريخ، الهاتف، الهوية، البريد أو الاسم..." 
            variant="outlined" 
            fullWidth
            value={searchQueue}
            onChange={(e) => setSearchQueue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#E65100' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': { color: '#757575', fontFamily: "'Cairo', sans-serif" },
              '& .MuiInputLabel-root.Mui-focused': { color: '#E65100' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#FFB74D' },
                '&:hover fieldset': { borderColor: '#E65100' },
                '&.Mui-focused fieldset': { borderColor: '#E65100' },
              },
            }}
          />
        </Box>

        {/* معالجة حالة اللودينغ المنفصلة للـ Queue عند كتابة أحرف البحث */}
        {isQueueLoading ? (
          <Box display="flex" flexDirection="column" gap={1.5}>
            <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Box>
        ) : fullQueueData.length === 0 ? (
          /* حالة البيانات الفارغة (Empty State) عند عدم العثور على نتائج مطابقة للبحث */
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={5} bgcolor="#FFF8E1" borderRadius={2}>
            <EventBusyIcon sx={{ fontSize: 60, color: '#FFB74D', mb: 1 }} />
            <Typography variant="h6" fontWeight="bold" color="#E65100">لا توجد نتائج مطابقة للبحث</Typography>
            <Typography variant="body2" color="textSecondary">لم نعثر على أي مريض في الطابور يطابق البيانات المدخلة.</Typography>
          </Box>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}>
                <th style={{ padding: '12px' }}>المريض</th>
                <th style={{ padding: '12px' }}>رقم الهاتف</th>
                <th style={{ padding: '12px' }}>الهوية / البريد</th>
                <th style={{ padding: '12px' }}>الموعد</th>
                <th style={{ padding: '12px' }}>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {fullQueueData.map((item, index) => (
                <tr key={item.id || index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.patient_name || item.name || "غير محدد"}</td>
                  <td style={{ padding: '12px' }}>{item.phone || item.patient_phone || "-"}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#555' }}>
                    {item.identity || item.email || "-"}
                  </td>
                  <td style={{ padding: '12px' }}>{item.time || item.appointment_time || "-"}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      backgroundColor: item.status === 'Waiting' || item.status === 'معلق' ? '#FFD54F' : '#4DB6AC', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {item.status || "منتظر"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </Box>
  );
}
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Tooltip, Empty, Card } from 'antd';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography } from '@mui/material';
import { Add, Delete, Loop } from '@mui/icons-material';
import DeleteMedicineModal from './DeleteMedicineModal';
import { fetchmedications } from '../../backend/slice/pharmecy/fetchmedicien';
import { useDispatch, useSelector } from 'react-redux';
import MedicalLoader from '../LOADING/MedicalLoader';

const MedicineManager = () => {
  const dispatch = useDispatch();
  const pharmacyColor = '#4A148C';

  const { data: responseData, isLoading } = useSelector((state) => state.fetchmedications);
  const serverMedicines = responseData?.data || [];

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [newMedicine, setNewMedicine] = useState({ name: '', generic_name: '', category: '', price: '' });

  // 🌍 مراقبة حجم الشاشة لمنع أو تفعيل السكرول
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchmedications());

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleAdd = () => {
    setOpenModal(false);
    setNewMedicine({ name: '', generic_name: '', category: '', price: '' });
  };

  const handleDeleteConfirm = () => {
    if (selectedMedicine) {
      setOpenDeleteModal(false);
      setSelectedMedicine(null);
    }
  };

  // 🔀 قمنا بحذف الـ width من الأعمدة لتتمدد بحرية وتأخذ كامل مساحة اللابتوب المتاحة
  const columns = [
    { 
      title: 'رقم الدواء', 
      dataIndex: 'id', 
      key: 'id', 
      align: 'center', 
      render: (id) => <strong style={{ color: pharmacyColor }}>#{id}</strong>
    },
    { 
      title: 'الاسم التجاري', 
      dataIndex: 'name', 
      key: 'name', 
      align: 'center', 
      render: (name) => <span style={{ fontWeight: '600' }}>{name}</span>
    },
    { 
      title: 'الاسم العلمي', 
      dataIndex: 'generic_name', 
      key: 'generic_name', 
      align: 'center' 
    },
    { 
      title: 'الفئة العلاجية', 
      dataIndex: 'category', 
      key: 'category', 
      align: 'center', 
      render: (cat) => <Tag color="purple">{cat}</Tag>
    },
    { 
      title: 'السعر المعتمد', 
      dataIndex: 'price', 
      key: 'price', 
      align: 'center', 
      render: (price) => `${price}$`
    },
    {
      title: 'الحالة في المستودع',
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (is_active) => (
        <Tag color={is_active ? 'green' : 'red'} style={{ fontSize: '13px', padding: '2px 10px' }}>
          {is_active ? 'نشط / متوفر' : 'غير نشط'}
        </Tag>
      ),
    },
    {
      title: 'الإجراءات والعمليات',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="تغيير فاعلية الدواء">
            <Button size="small" style={{ minWidth: 'auto', border: `1px solid ${pharmacyColor}`, padding: '6px' }}>
              <Loop fontSize="small" style={{ color: pharmacyColor }} />
            </Button>
          </Tooltip>
          
          <Button 
            size="small" 
            color="error" 
            style={{ minWidth: 'auto', border: '1px solid red', padding: '6px' }}
            onClick={() => { setSelectedMedicine(record); setOpenDeleteModal(true); }}
          >
            <Delete fontSize="small" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Box dir="rtl" sx={{ width: '100%', p: 1 }}>
      {/* هيدر يحتوي على الزر بشكل مرتب ومتناسق */}
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <Button variant="contained" startIcon={<Add />} style={{ backgroundColor: pharmacyColor, fontFamily: 'inherit', fontWeight: 'bold' }} onClick={() => setOpenModal(true)}>
          إضافة دواء جديد للمستودع
        </Button>
      </Box>

      <style>{`
        /* جعل محتويات الهيدر تتمدد وتملأ الشاشة */
        .ant-table-wrapper .ant-table-thead > tr > th {
          background-color: ${pharmacyColor} !important;
          color: white !important;
          font-weight: bold !important;
          text-align: center !important;
          white-space: nowrap; /* يمنع نزول النص لسطر جديد بشكل مشوه */
        }
        .ant-table-wrapper .ant-table {
          width: 100% !important;
        }
      `}</style>

      {isLoading ? (
        <MedicalLoader />
      ) : serverMedicines.length === 0 ? (
        <Card variant="outlined" style={{ padding: 50, borderRadius: '12px', textAlign: 'center', backgroundColor: '#fafafa' }}>
          <Empty description={<Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'inherit', mt: 1 }}>لم يتم العثور على أي مستحضرات.</Typography>} />
        </Card>
      ) : (
        /* تفعيل الـ scroll فقط عندما تكون الشاشة أصغر من 960px (تابليت وموبايل) */
        <Table 
          columns={columns} 
          dataSource={serverMedicines} 
          rowKey={(record) => record.id} 
          bordered 
          pagination={{ pageSize: 5 }} 
          scroll={windowWidth < 960 ? { x: 900 } : undefined} 
          style={{ width: '100%' }}
        />
      )}

      {/* مودال الإضافة */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth dir="rtl">
        <DialogTitle style={{ textAlign: 'center', color: pharmacyColor, fontWeight: 'bold', fontFamily: 'inherit' }}>إضافة مستحضر طبي جديد</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="الاسم التجاري" size="small" margin="normal" value={newMedicine.name} onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
          <TextField fullWidth label="الاسم العلمي المعتمد" size="small" margin="normal" value={newMedicine.generic_name} onChange={(e) => setNewMedicine({...newMedicine, generic_name: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
          <TextField fullWidth label="الفئة العلاجية" size="small" margin="normal" value={newMedicine.category} onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
          <TextField fullWidth label="السعر ($)" type="number" size="small" margin="normal" value={newMedicine.price} onChange={(e) => setNewMedicine({...newMedicine, price: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
        </DialogContent>
        <DialogActions style={{ padding: '12px' }}>
          <Button onClick={() => setOpenModal(false)} style={{ color: '#666' }}>إلغاء</Button>
          <Button variant="contained" style={{ backgroundColor: pharmacyColor }} onClick={handleAdd}>حفظ التغييرات</Button>
        </DialogActions>
      </Dialog>

      <DeleteMedicineModal 
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        medicineName={selectedMedicine?.name || ''}
      />
    </Box>
  );
};

export default MedicineManager;
import React, { useState } from 'react';
import { Table, Tag, Space, Tooltip } from 'antd';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { Add, Delete, Loop } from '@mui/icons-material';
import DeleteMedicineModal from './DeleteMedicineModal';

const MedicineManager = () => {
  const pharmacyColor = '#4A148C'; // اللون البنفسجي الخاص بالقسم
  const [medicines, setMedicines] = useState([
    { key: '1', name: 'Panadol Extra', category: 'مسكن آلام', status: 'متوفر' },
    { key: '2', name: 'Amoxicillin', category: 'مضاد حيوي', status: 'منتهي الصلاحية' },
  ]);
  
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [newMedicine, setNewMedicine] = useState({ name: '', category: '', status: 'متوفر' });

  const handleAdd = () => {
    setMedicines([...medicines, { ...newMedicine, key: Date.now().toString() }]);
    setOpenModal(false);
    setNewMedicine({ name: '', category: '', status: 'متوفر' });
  };

  const handleDeleteConfirm = () => {
    if (selectedMedicine) {
      setMedicines(medicines.filter(item => item.key !== selectedMedicine.key));
      setOpenDeleteModal(false);
      setSelectedMedicine(null);
    }
  };

  const toggleStatus = (key) => {
    setMedicines(medicines.map(item => item.key === key ? { ...item, status: item.status === 'متوفر' ? 'غير متوفر' : 'متوفر' } : item));
  };

  const columns = [
    { title: 'اسم الدواء', dataIndex: 'name', key: 'name', align: 'center', width: 200 },
    { title: 'الفئة العلاجية', dataIndex: 'category', key: 'category', align: 'center', width: 180 },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      render: (status) => (
        <Tag color={status === 'متوفر' ? 'green' : 'red'} style={{ fontSize: '13px', padding: '2px 10px' }}>{status}</Tag>
      ),
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="تغيير الحالة">
            <Button size="small" onClick={() => toggleStatus(record.key)} style={{ minWidth: 'auto', border: `1px solid ${pharmacyColor}`, padding: '6px' }}>
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
    <Box>
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <Button variant="contained" startIcon={<Add />} style={{ backgroundColor: pharmacyColor, fontFamily: 'inherit', fontWeight: 'bold' }} onClick={() => setOpenModal(true)}>
          إضافة دواء جديد
        </Button>
      </Box>

      <style>{`
        .ant-table-wrapper .ant-table-thead > tr > th {
          background-color: ${pharmacyColor} !important;
          color: white !important;
          font-weight: bold !important;
          text-align: center !important;
        }
        .ant-table-wrapper .ant-table-tbody > tr > td {
          font-family: 'Cairo', sans-serif !important;
        }
      `}</style>

      <Table 
        columns={columns} 
        dataSource={medicines} 
        bordered 
        pagination={{ pageSize: 5 }} 
        scroll={{ x: 'max-content' }} 
      />

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ textAlign: 'center', color: pharmacyColor, fontWeight: 'bold', fontFamily: 'inherit' }}>إضافة مستحضر طبي جديد</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="اسم الدواء البرمجي التجاري" size="small" margin="normal" value={newMedicine.name} onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
          <TextField fullWidth label="الفئة العلاجية والتركيب" size="small" margin="normal" value={newMedicine.category} onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})} sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }} />
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
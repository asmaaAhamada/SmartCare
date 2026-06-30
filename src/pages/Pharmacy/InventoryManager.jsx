import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import { Add, WarningAmber } from '@mui/icons-material';

const InventoryManager = ({ pharmacyColor }) => {
  const [stock, setStock] = useState([
    { key: '1', name: 'Lipitor 20mg', qty: 140, minLimit: 25 },
    { key: '2', name: 'Aspirin Cardo', qty: 6, minLimit: 20 },
    { key: '3', name: 'Voltaren Emulgel', qty: 72, minLimit: 15 },
  ]);
  const [isLowStockFilter, setIsLowStockFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addedQty, setAddedQty] = useState('');

  const handleAddQty = () => {
    setStock(stock.map(item => item.key === selectedItem.key ? { ...item, qty: item.qty + parseInt(addedQty || 0) } : item));
    setOpenModal(false);
    setAddedQty('');
  };

  const displayedStock = isLowStockFilter ? stock.filter(item => item.qty <= item.minLimit) : stock;

  const columns = [
    { title: 'اسم المستحضر بالمستودع', dataIndex: 'name', key: 'name', align: 'center', width: 220 },
    { 
      title: 'الكمية المتوفرة', 
      dataIndex: 'qty', 
      key: 'qty', 
      align: 'center',
      width: 180,
      render: (qty, record) => (
        <Tag color={qty <= record.minLimit ? 'red' : 'purple'} style={{ fontSize: '13px', fontWeight: 'bold' }}>
          {qty} {qty <= record.minLimit ? ' (مخزون حرج!)' : 'وحدة'}
        </Tag>
      )
    },
    {
      title: 'التعديل المستودعي',
      key: 'actions',
      align: 'center',
      width: 180,
      render: (_, record) => (
        <Button size="small" variant="outlined" startIcon={<Add />} style={{ color: pharmacyColor, borderColor: pharmacyColor, fontWeight: 'bold' }} onClick={() => { setSelectedItem(record); setOpenModal(true); }}>
          تحديث التوريد
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <Button 
          variant={isLowStockFilter ? "contained" : "outlined"} 
          color="error" 
          startIcon={<WarningAmber />} 
          onClick={() => setIsLowStockFilter(!isLowStockFilter)}
          style={{ fontFamily: 'inherit', fontWeight: 'bold' }}
        >
          {isLowStockFilter ? "عرض المستودع كاملاً" : "اختبار نقص المخزون الدوائي (Low Stock)"}
        </Button>
      </Box>

      {/* جدول المخزون متجاوب 100% مع الشاشات الصغيرة والكبيرة عبر السكرول */}
      <Table 
        columns={columns} 
        dataSource={displayedStock} 
        bordered 
        pagination={{ pageSize: 5 }} 
        scroll={{ x: 'max-content' }} 
      />

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ textAlign: 'center', color: pharmacyColor, fontWeight: 'bold' }}>تحديث مخزون ({selectedItem?.name})</DialogTitle>
        <DialogContent dividers>
          <TextField 
            fullWidth 
            type="number" 
            label="الكمية الإضافية الواردة" 
            size="small" 
            margin="normal" 
            value={addedQty} 
            onChange={(e) => setAddedQty(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pharmacyColor }, '& .MuiInputLabel-root.Mui-focused': { color: pharmacyColor } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>إلغاء</Button>
          <Button variant="contained" style={{ backgroundColor: pharmacyColor }} onClick={handleAddQty}>تأكيد الكمية الواردة</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManager;
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Tooltip, Empty, Card } from 'antd';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography } from '@mui/material';
import { Add, Delete, Loop } from '@mui/icons-material';
import DeleteMedicineModal from './DeleteMedicineModal';
import UpdateMedicineModal from './UpdateMedicineModal'; // استيراد الكامبوننت الجديد هنا 
import { fetchmedications } from '../../backend/slice/pharmecy/fetchmedicien';
import { useDispatch, useSelector } from 'react-redux';
import MedicalLoader from '../LOADING/MedicalLoader';
import AddMedicineModal from './AddMedicineModal';
import { Search } from "@mui/icons-material";
const MedicineManager = () => {
  const dispatch = useDispatch();
  const pharmacyColor = '#4A148C';

  const { data: responseData, isLoading } = useSelector((state) => state.fetchmedications);
  const serverMedicines = responseData?.data || [];

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // ستيت لإدارة فتح مودال التحديث
  const [searchName, setSearchName] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // دالة لتحديث الجدول بعد التعديل أو الحذف بنجاح
  const refreshData = () => {
    dispatch(fetchmedications(searchName));
};
const handleSearch = () => {
  if (searchName.trim() === "") {
    dispatch(fetchmedications());
  } else {
    dispatch(fetchmedications(searchName));
  }
};
useEffect(() => {

    dispatch(fetchmedications());

    const handleResize = () =>
        setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () =>
        window.removeEventListener("resize", handleResize);

}, []);
 

 

  const handleDeleteConfirm = () => {
    if (selectedMedicine) {
      setOpenDeleteModal(false);
      setSelectedMedicine(null);
    }
  };
  useEffect(() => {
  if (searchName.trim() === "") {
    dispatch(fetchmedications());
  }
}, [searchName]);

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
          {/* 🎯 تعديل التولتيب وربط الزر بفتح مودال التعديل مع تمرير الـ record الحالي */}
          <Tooltip title="تحديث الدواء">
            <Button 
              size="small" 
              style={{ minWidth: 'auto', border: `1px solid ${pharmacyColor}`, padding: '6px' }}
              onClick={() => { setSelectedMedicine(record); setOpenUpdateModal(true); }}
            >
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
  <Box dir="rtl" sx={{ width: "100%", p: 1 }}>

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      flexWrap="wrap"
      gap={2}
    >

      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{
          backgroundColor: pharmacyColor,
          fontWeight: "bold",
        }}
        onClick={() => setOpenModal(true)}
      >
        إضافة دواء جديد
      </Button>

      <Box
        display="flex"
        gap={1}
        width={{ xs: "100%", md: "420px" }}
      >
        <TextField
          fullWidth
          size="small"
          label="ابحث باسم الدواء"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: pharmacyColor }}
          onClick={handleSearch}
        >
          <Search />
        </Button>
      </Box>

    </Box>

    <style>{`
      .ant-table-wrapper .ant-table-thead > tr > th {
        background-color: ${pharmacyColor} !important;
        color: white !important;
        font-weight: bold !important;
        text-align: center !important;
        white-space: nowrap;
      }

      .ant-table-wrapper .ant-table {
        width: 100% !important;
      }
    `}</style>

    {isLoading ? (
  <MedicalLoader />
) : serverMedicines.length === 0 ? (
  <Card
    variant="outlined"
    style={{
      padding: 50,
      borderRadius: 12,
      textAlign: "center",
      backgroundColor: "#fafafa",
    }}
  >
    <Empty
      description={
        <Typography sx={{ mt: 1 }}>
          لم يتم العثور على أي مستحضرات.
        </Typography>
      }
    />
  </Card>
) : (
  <Table
    columns={columns}
    dataSource={serverMedicines}
    rowKey="id"
    bordered
    pagination={{ pageSize: 5 }}
    scroll={windowWidth < 960 ? { x: 900 } : undefined}
  />
)}

    <AddMedicineModal
    open={openModal}
    onClose={() => setOpenModal(false)}
    onRefresh={refreshData}
/>

      {/*  استدعاء مودال التعديل المنفصل وتمرير الخصائص المناسبة له */}
      <UpdateMedicineModal 
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        medicine={selectedMedicine}
        onRefresh={refreshData}
      />

    <DeleteMedicineModal
    open={openDeleteModal}
    onClose={() => {
        setOpenDeleteModal(false);
        setSelectedMedicine(null);
    }}
    medicineId={selectedMedicine?.id}
    medicineName={selectedMedicine?.name}
    onRefresh={refreshData}
/>
    </Box>
  );
};

export default MedicineManager;
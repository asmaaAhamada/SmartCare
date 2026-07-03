import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Add, WarningAmber } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchinventory } from '../../backend/slice/pharmecy/fetchinvocing';
import { fetchmedications } from "../../backend/slice/pharmecy/fetchmedicien";
import { ADD_inventory_restok, resetAddMedicineState } from "../../backend/slice/pharmecy/restock";
import { fetchLowStock } from '../../backend/slice/pharmecy/fetchLowStock';

import MedicalLoader from "../LOADING/MedicalLoader";
import { Empty } from "antd";
import { Typography, Card } from "@mui/material";
import Swal from "sweetalert2";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

const InventoryManager = () => {
    const dispatch = useDispatch();

    const { data: apiResponse, isLoading: isInventoryLoading } = useSelector((state) => state.fetchinventory);
    const { data: lowStockResponse, isLoading: isLowStockLoading } = useSelector((state) => state.fetchLowStock);

    const {
        loading,
        success,
        error: restockError,
    } = useSelector((state) => state.ADD_inventory_restok);

    const inventory = apiResponse?.data || [];
    const lowStockData = lowStockResponse?.data || [];

    const { data: medicineResponse } = useSelector(state => state.fetchmedications);
    const medicines = medicineResponse?.data || [];

    useEffect(() => {
        dispatch(fetchinventory());
        dispatch(fetchmedications());
    }, [dispatch]);

    const pharmacyColor = '#4A148C';
 
    const [isLowStockFilter, setIsLowStockFilter] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMedicineId, setSelectedMedicineId] = useState("");  
    const [addedQty, setAddedQty] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const handleLowStockToggle = () => {
        if (!isLowStockFilter) {
            dispatch(fetchLowStock());
        } else {
            dispatch(fetchinventory());
        }
        setIsLowStockFilter(!isLowStockFilter);
    };

    const handleAddQty = () => {
        dispatch(
            ADD_inventory_restok({
                medication_id: selectedMedicineId,
                quantity: Number(addedQty)
            })
        );
    };

    useEffect(() => {
        if (success) {
            Swal.fire({
                icon: "success",
                title: "تم التوريد",
                text: "تم تحديث المخزون بنجاح",
                timer: 1800,
                showConfirmButton: false
            });

            dispatch(resetAddMedicineState());
            
            if (isLowStockFilter) {
                dispatch(fetchLowStock());
            } else {
                dispatch(fetchinventory());
            }

            setOpenModal(false);
            setAddedQty("");
            setSelectedMedicineId("");
            setSelectedItem(null);
        }

        if (restockError) {
            Swal.fire({
                icon: "error",
                title: "خطأ",
                text: restockError
            });
            dispatch(resetAddMedicineState());
        }
    }, [success, restockError, isLowStockFilter, dispatch]);

    const displayedStock = isLowStockFilter ? lowStockData : inventory;
    const isCurrentTableLoading = isLowStockFilter ? isLowStockLoading : isInventoryLoading;

    const columns = [
        {
            title: "اسم الدواء",
            dataIndex: ["medication", "name"],
            align: "center",
        },
        {
            title: "الاسم العلمي",
            dataIndex: ["medication", "generic_name"],
            align: "center",
        },
        {
            title: "الشركة",
            dataIndex: ["medication", "manufacturer"],
            align: "center",
        },
        {
            title: "الفئة",
            dataIndex: ["medication", "category"],
            align: "center",
            render: (value) => <Tag color="purple">{value}</Tag>,
        },
        {
            title: "الكمية",
            dataIndex: "quantity",
            align: "center",
            render: (qty, record) => (
                <Tag color={qty <= record.reorder_level ? "red" : "green"}>
                    {qty}
                </Tag>
            ),
        },
        {
            title: "حد إعادة الطلب",
            dataIndex: "reorder_level",
            align: "center",
        },
        {
            title: "رقم الدفعة",
            dataIndex: "batch_number",
            align: "center",
            render: (value) => value || "---",
        },
        {
            title: "تاريخ الصلاحية",
            dataIndex: "expiry_date",
            align: "center",
            render: (value) => value || "---",
        },
        {
            title: "آخر توريد",
            dataIndex: "last_restocked_at",
            align: "center",
        },
        {
            title: "الإجراءات",
            align: "center",
            render: (_, record) => (
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Add />}
                    style={{
                        color: pharmacyColor,
                        borderColor: pharmacyColor,
                        fontWeight: "bold",
                    }}
                    onClick={() => {
                        setSelectedItem(record);
                        setSelectedMedicineId(record?.medication?.id || "");
                        setOpenModal(true);
                    }}
                >
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
                    onClick={handleLowStockToggle}
                    style={{ fontFamily: 'inherit', fontWeight: 'bold' }}
                >
                    {isLowStockFilter ? "عرض المستودع كاملاً" : "اختبار نقص المخزون الدوائي (Low Stock)"}
                </Button>
            </Box>

            <style>{`
                .ant-table-wrapper .ant-table-thead > tr > th {
                    background-color: ${pharmacyColor} !important;
                    color: white !important;
                    font-weight: bold !important;
                    text-align: center !important;
                }
            `}</style>

            {isCurrentTableLoading ? (
                <MedicalLoader />
            ) : displayedStock.length === 0 ? (
                /* تعديل تصميم حالة البيانات الفارغة لتصبح باللون البنفسجي وبحجم خط أكبر */
                <Card
                    variant="outlined"
                    sx={{
                        p: 6,
                        borderRadius: 4,
                        textAlign: "center",
                        bgcolor: "#F3E5F5", // خلفية بنفسجية فاتحة جداً ومريحة للعين
                        borderColor: "#CE93D8", // إطار بنفسجي متناسق
                        borderWidth: "1.5px",
                        boxShadow: "0px 4px 12px rgba(74, 20, 140, 0.05)"
                    }}
                >
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{ margin: 0 }}
                        description={
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontFamily: 'Cairo, sans-serif', 
                                    fontWeight: 'bold',
                                    color: pharmacyColor, // نص باللون البنفسجي الغامق الأساسي
                                    mt: 2
                                }}
                            >
                                {isLowStockFilter 
                                  ? "ممتاز! لا يوجد أي دواء شارف على النفاذ في المخزن حالياً." 
                                  : "لا يوجد أي عناصر في المستودع."}
                            </Typography>
                        }
                    />
                </Card>
            ) : (
                <Table
                    columns={columns}
                    dataSource={displayedStock}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                />
            )}

            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
                <DialogTitle style={{ textAlign: 'center', color: pharmacyColor, fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>
                    تحديث مخزون {selectedItem?.medication?.name ? `(${selectedItem.medication.name})` : ''}
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl fullWidth margin="normal" size="small">
                        <InputLabel>الدواء</InputLabel>
                        <Select
                            label="الدواء"
                            value={selectedMedicineId}
                            onChange={(e) => setSelectedMedicineId(e.target.value)}
                        >
                            {medicines.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        type="number"
                        label="الكمية الجديدة"
                        margin="normal"
                        size="small"
                        value={addedQty}
                        onChange={(e) => setAddedQty(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: pharmacyColor }} onClick={() => setOpenModal(false)}>إلغاء</Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: pharmacyColor }}
                        disabled={loading}
                        onClick={handleAddQty}
                    >
                        {loading ? "جاري التحديث..." : "تأكيد التوريد"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InventoryManager;
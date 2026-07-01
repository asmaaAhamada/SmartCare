import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Table, Tag } from 'antd';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import { fetchinnvocing } from '../../backend/slice/accounting/invocing';
import { useDispatch, useSelector } from 'react-redux';
import { Empty } from "antd";
import { Skeleton, Card } from "@mui/material";
import CreateInvoiceDialog from './CreateInvoiceDialog';
const InvoicesManager = () => {
      const dispatch = useDispatch();

        const { data: Data, isLoading } = useSelector((state) => state.fetchinnvocing);

        useEffect(() => {
    dispatch(fetchinnvocing());
  }, [dispatch]);
  const accountingColor = '#1E293B';
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoiceData = [
    { key: 'INV-2026-001', department: 'قسم العيادات الخارجية', total: '180,000 ل.س', status: 'مدفوعة' },
    { key: 'INV-2026-002', department: 'المستودع والصيدلية المركزي', total: '95,000 ل.س', status: 'معلقة' },
  ];

  const columns = [
  {
    title: "رقم الفاتورة",
    dataIndex: "invoice_number",
    key: "invoice_number",
    align: "center",
  },
  {
    title: "المريض",
    dataIndex: "patient",
    key: "patient",
    align: "center",
  },
  {
    title: "الطبيب",
    dataIndex: "doctor",
    key: "doctor",
    align: "center",
  },
  {
    title: "المبلغ",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => `${amount} SYP`,
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status) => (
      <Tag color={status === "succeeded" ? "success" : "warning"}>
        {status === "succeeded" ? "مدفوعة" : status}
      </Tag>
    ),
  },
  {
    title: "الإجراء",
    key: "action",
    align: "center",
    render: (_, record) => (
      <Button
        size="small"
        variant="outlined"
        sx={{
          color: accountingColor,
          borderColor: accountingColor,
          fontFamily: "Cairo",
        }}
       onClick={() => {
    setSelectedInvoice(record.appointment_id);
    setIsModalOpen(true);
}}
      >
        التفاصيل
      </Button>
    ),
  },
];

  return (
    <Box dir="rtl" p={2}>
<Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mb={2}
>

  <Typography
    variant="h5"
    fontWeight="bold"
    sx={{
      color: accountingColor,
      fontFamily: "Cairo",
    }}
  >
    الوثائق والفواتير الحسابية المعتمدة
  </Typography>

  <Button
    variant="contained"
    onClick={() => setOpenCreate(true)}
    sx={{
      background: accountingColor,
      fontFamily: "Cairo",
    }}
  >
    إنشاء فاتورة
  </Button>

</Box>
      <style>{`
        .ant-table-wrapper .ant-table-thead > tr > th { background-color: ${accountingColor} !important; color: white !important; font-weight: bold !important; text-align: center !important; }
        .ant-table-wrapper .ant-table-tbody > tr > td { font-family: 'Cairo', sans-serif !important; }
      `}</style>

{isLoading ? (
  <Box>
    <Skeleton
      variant="rectangular"
      height={50}
      sx={{
        borderRadius: "8px 8px 0 0",
        mb: 1,
      }}
    />

    {[1, 2, 3, 4, 5].map((item) => (
      <Skeleton
        key={item}
        variant="rectangular"
        height={45}
        sx={{
          mb: 1,
          borderRadius: 1,
        }}
      />
    ))}
  </Box>
) : Data.length === 0 ? (
  <Card
    variant="outlined"
    sx={{
      p: 5,
      borderRadius: 3,
    }}
  >
    <Empty
      description={
        <Typography sx={{ fontFamily: "Cairo" }}>
          لا توجد فواتير حالياً
        </Typography>
      }
    />
  </Card>
) : (
  <Table
    rowKey="invoice_number"
    columns={columns}
    dataSource={Data}
    bordered
    scroll={{ x: "max-content" }}
    pagination={{
      pageSize: 5,
    }}
  />
)}
      <InvoiceDetailsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} invoice={selectedInvoice} />
        {/* <CreateInvoiceDialog
    open={openCreate}
    onClose={() => setOpenCreate(false)}
/> */}
    </Box>
  );
};

export default InvoicesManager;
import { Add } from "@mui/icons-material";
import "./orders.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useState } from "react";
import AddModal from "../../components/addModal/AddModal";
import { ColumnInfo } from "../../types";
import { useGetRowsQuery } from "../../redux/apiSlice";
import { GridValueFormatterParams } from "@mui/x-data-grid";

const columns: ColumnInfo[] = [
  { field: "_id", headerName: "Order ID", width: 225 },
  {
    field: "userId",
    type: "string",
    headerName: "User ID",
    width: 225,
    inputType: "text",
    required: true,
  },
  {
    field: "sessionId",
    type: "string",
    headerName: "Session ID",
    width: 250,
    inputType: "text",
    required: true,
  },
  {
    field: "amount",
    type: "number",
    headerName: "Total",
    inputType: "number",
    required: true,
    valueFormatter: (params: GridValueFormatterParams) => `$${params.value}`,
  },
  {
    field: "address",
    type: "string",
    headerName: "Address",
    inputType: "text",
    required: true,
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 175,
    type: "string",
    valueFormatter: (params: GridValueFormatterParams) =>
      new Date(params.value).toLocaleString(),
  },
];

const hiddenColumns = {
  address: false,
};

const Orders = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetRowsQuery("orders");

  return (
    <div className="orders">
      <div className="info">
        <h1>Orders</h1>
        <button onClick={() => setOpen(true)}>
          <Add />
          <span>Add New Order</span>
        </button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          columns={columns}
          rows={data}
          slug="orders"
          hiddenColumns={hiddenColumns}
        />
      )}
      {open && <AddModal slug="order" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Orders;

import type { TableColumnsType } from "antd";
import { Button, Flex, Table } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteSelectedBikesMutation } from "../../redux/features/bikeManagement/bikeManagementApi";
import Filter from "../layout/Filter";

const BikeTable: React.FC<any> = ({
  bikeList,
  handleDelete,
  refetch,
  setFilter,
}: {
  bikeList: Array<any>;
  handleDelete: any;
  refetch: any;
  setFilter: any;
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [deleteSelectedBikes] = useDeleteSelectedBikesMutation();

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (text: string) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Suspension Type",
      dataIndex: "suspensionsType",
    },
    {
      title: "Size",
      dataIndex: "size",
    },
    {
      title: "Displacement (cc)",
      dataIndex: "cc",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => {
        return (
          <span>
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "BDT",
            })}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Flex wrap="wrap" gap="small">
          <Button
            type="primary"
            style={{ backgroundColor: "#5cb85c" }}
            onClick={() => navigate(`/bikes/create-varient/${record.id}`)}
          >
            Create Varient
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(`/bikes/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
          >
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  const batchDelete = async () => {
    setLoading(true);
    const selectedIds = selectedRowKeys.map((item) => {
      const newData = bikeList[(item as number) - 1];
      return newData._id;
    });
    console.log("selected rows to delete: ", selectedIds);

    // setLoading(true);
    const toastId: any = toast.loading(`Deleting Selected Items`, {
      duration: 2500,
    });
    try {
      console.log("deleted id: ", selectedIds);
      await deleteSelectedBikes(selectedIds);
      refetch();
      setSelectedRowKeys([]);
      console.log("data after deleting: ", bikeList);
      toast.success(`Items Deleted Successfully`, {
        id: toastId,
        duration: 2500,
      });
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong deleting item", {
        id: toastId,
        duration: 2500,
      });
      setLoading(false);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <Flex align="center">
            <Button
              type="primary"
              danger
              onClick={batchDelete}
              disabled={!hasSelected}
              loading={loading}
            >
              Delete All
            </Button>

            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
            <Filter setFilter={setFilter} refetch={refetch} />
          </Flex>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => navigate("/bikes/add-new")}
            loading={loading}
          >
            Add New
          </Button>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={bikeList}
        scroll={{ y: 800 }}
      />
    </div>
  );
};

export default BikeTable;

import type { TableColumnsType } from "antd";
import { Button, Flex, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedBike } from "../../redux/features/salesManagement/saleSlice";

const SaleBikeTable: React.FC<any> = ({
  bikeList,
  setOpenSaleModal,
}: {
  bikeList: Array<any>;
  setOpenSaleModal: any;
}) => {
  const dispatch = useDispatch();

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
            disabled={record.quantity < 1}
            onClick={() => {
              dispatch(
                setSelectedBike({
                  selectedBike: record,
                })
              );
              setOpenSaleModal(true);
            }}
          >
            Sale This
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={bikeList} scroll={{ y: 800 }} />
    </div>
  );
};

export default SaleBikeTable;

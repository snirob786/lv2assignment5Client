import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import SaleBikeTable from "../../components/ui/SaleBikeTable";
import { RootState } from "../../redux/store";
import { useAddNewSaleMutation } from "../../redux/features/salesManagement/saleApi";
import { useGetAllBikeDetailsQuery } from "../../redux/features/bikeManagement/bikeManagementApi";

const Sales = () => {
  const [bikeList, setBikeList] = useState<any[]>([]);
  const [openSaleModal, setOpenSaleModal] = useState<boolean>(false);
  const { Text } = Typography;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [addNewSale] = useAddNewSaleMutation();
  const selectedBike: any = useSelector(
    (state: RootState) => state.sale.selectedBike
  );

  const { data } = useGetAllBikeDetailsQuery({ minQuantity: 1 });

  useEffect(() => {
    console.log("data: ", data);
    const newData = data?.data.map((item: any, index: number) => {
      const newItem = {
        ...item,
        key: index + 1,
      };
      return newItem;
    });
    setBikeList(newData);
  }, [data]);

  const onSubmit = (formData: any) => {
    formData.sellingDate = new Date(formData.sellingDate);
    formData.bikeID = selectedBike._id;
    addNewSale(formData);
    setValue("quantity", 1);
    setValue("buyerName", "");
    setValue("sellingDate", null);
    setOpenSaleModal(false);
  };

  return (
    <>
      {bikeList?.length > 0 ? (
        <SaleBikeTable
          bikeList={bikeList}
          setOpenSaleModal={setOpenSaleModal}
        />
      ) : (
        <Empty />
      )}
      <Modal
        title="Modal"
        className="saleModal"
        open={openSaleModal}
        maskClosable={false}
        keyboard={false}
        centered={true}
        onCancel={() => {
          setOpenSaleModal(false);
          setValue("quantity", 1);
          setValue("buyerName", "");
          setValue("sellingDate", null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setOpenSaleModal(false);
              setValue("quantity", 1);
              setValue("buyerName", "");
              setValue("sellingDate", null);
            }}
          >
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          labelAlign="left"
          // onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item
            label="Quantity"
            wrapperCol={{ span: 18 }}
            validateStatus={errors.quantity ? "error" : ""}
            help={
              errors.quantity && (
                <Text type="danger">{`${errors.quantity.message}`}</Text>
              )
            }
          >
            <Controller
              name="quantity"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={1}
                  max={selectedBike.quantity}
                  placeholder="Quantity"
                  style={{ width: "100%" }}
                />
              )}
              rules={{ required: "Please enter the quantity" }}
            />
          </Form.Item>
          <Form.Item
            label="Buyer Name"
            wrapperCol={{ span: 18 }}
            validateStatus={errors.buyerName ? "error" : ""}
            help={
              errors.buyerName && (
                <Text type="danger">{`${errors.buyerName.message}`}</Text>
              )
            }
          >
            <Controller
              name="buyerName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Buyer Name"
                  style={{ width: "100%" }}
                />
              )}
              rules={{ required: "Please enter the buyer name" }}
            />
          </Form.Item>
          <Form.Item
            label="Selling Date"
            wrapperCol={{ span: 18 }}
            validateStatus={errors.sellingDate ? "error" : ""}
            help={
              errors.sellingDate && (
                <Text type="danger">{`${errors.sellingDate.message}`}</Text>
              )
            }
          >
            <Controller
              name="sellingDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  format="YYYY-MM-DD"
                  onChange={(date) => {
                    field.onChange(date ? date.valueOf() : null);
                  }}
                  style={{ width: "100%" }}
                />
              )}
              rules={{ required: "Please select the selling date" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Sales;

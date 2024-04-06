import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useAddNewBikeMutation } from "../../redux/features/bikeManagement/bikeManagementApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LeftOutlined } from "@ant-design/icons";

const AddNew = () => {
  const [addNewBike] = useAddNewBikeMutation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      brand: "",
      model: undefined,
      type: undefined,
      size: undefined,
      color: undefined,
      cc: undefined,
      frameMaterial: undefined,
      suspensionsType: undefined,
    },
  });

  console.log("new form errors: ", errors);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId: any = toast.loading("Adding Bike...", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
    console.log("new form data: ", data);
    console.log("new form errors: ", errors);
    try {
      const result: any = await addNewBike(data);
      console.log("result: ", result);
      if (result?.data?.success) {
        toast.success("Bike Added Successfully", {
          id: toastId,
          duration: 2000,
        });
        navigate("/bikes");
      } else {
        toast.error(result?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <>
      <Row justify="center" align="middle">
        <Col xs={20} sm={16} md={12}>
          <Form onFinish={handleSubmit(onSubmit)}>
            <Form.Item
              label="Name"
              name="name"
              validateStatus={errors.name ? "error" : ""}
              help={<p>{`${errors.name ? errors.name?.message : ""}`}</p>}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Name" />}
                rules={{
                  required: "Please enter bike name!",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              validateStatus={errors.price ? "error" : ""}
              help={<p>{`${errors.price ? errors.price?.message : ""}`}</p>}
              rules={[{ type: "number", min: 0 }]}
            >
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    style={{ width: "100%" }}
                    {...field}
                    placeholder="Price"
                  />
                )}
                rules={{
                  required: "Please enter bike price!",
                  min: 0,
                }}
              />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              validateStatus={errors.quantity ? "error" : ""}
              help={
                <p>{`${errors.quantity ? errors.quantity?.message : ""}`}</p>
              }
            >
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    style={{ width: "100%" }}
                    {...field}
                    placeholder="Quantity"
                  />
                )}
                rules={{
                  required: "Please enter bike quantity!",
                  min: 0,
                }}
              />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brand"
              validateStatus={errors.brand ? "error" : ""}
              help={<p>{`${errors.brand ? errors.brand?.message : ""}`}</p>}
            >
              <Controller
                name="brand"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Brand" />}
                rules={{
                  required: "Please enter bike brand!",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Model"
              name="model"
              validateStatus={errors.model ? "error" : ""}
              help={<p>{`${errors.model ? errors.model?.message : ""}`}</p>}
            >
              <Controller
                name="model"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Model" />}
                rules={{
                  required: "Please enter bike model!",
                }}
              />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Controller
                name="type"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Type" />}
              />
            </Form.Item>
            <Form.Item label="Size" name="size">
              <Controller
                name="size"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Size" />}
              />
            </Form.Item>
            <Form.Item label="Color" name="color">
              <Controller
                name="color"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Color" />}
              />
            </Form.Item>
            <Form.Item label="Displacement (cc)" name="cc">
              <Controller
                name="cc"
                control={control}
                render={({ field }) => <Input {...field} placeholder="CC" />}
              />
            </Form.Item>
            <Form.Item label="Frame Material" name="frameMaterial">
              <Controller
                name="frameMaterial"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Frame Material" />
                )}
              />
            </Form.Item>
            <Form.Item label="Suspensions Type" name="suspensionsType">
              <Controller
                name="suspensionsType"
                control={control}
                render={({ field }) => (
                  <Input.TextArea {...field} placeholder="Suspensions Type" />
                )}
              />
            </Form.Item>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={() => navigate("/bikes")}>
                <LeftOutlined />
                Back
              </Button>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddNew;

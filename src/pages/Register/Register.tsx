import { InboxOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../redux/features/auth/authAPi";
const { Title } = Typography;

export const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [register, { error }] = useRegisterMutation();
  console.log("error: ", error);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering...");
    try {
      await register(data).unwrap();
      toast.success("Successfully Registered", { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={20} sm={16} md={12} lg={8}>
          <Title level={2} style={{ textAlign: "center" }}>
            Login
          </Title>
          <Form onFinish={handleSubmit(onSubmit)}>
            <Form.Item
              name="username"
              validateStatus={errors.username ? "error" : ""}
              help={
                errors.username ? <p>{`${errors.username.message}`}</p> : ""
              }
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined />}
                    placeholder="Username"
                  />
                )}
                rules={{
                  required: "Please enter your username!",
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email ? <p>{`${errors.email.message}`}</p> : ""}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<InboxOutlined />}
                    placeholder="email"
                  />
                )}
                rules={{ required: "Please enter your email!" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              validateStatus={errors.password ? "error" : ""}
              help={
                errors.password ? <p>{`${errors.password.message}`}</p> : ""
              }
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                )}
                rules={{ required: "Please enter your password!" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: "5px" }}
              >
                Register
              </Button>
              Or{" "}
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Login
              </a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

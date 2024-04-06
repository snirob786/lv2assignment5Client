import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authAPi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
const { Title } = Typography;

export const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const [login, { error }] = useLoginMutation();
  console.log("error: ", error);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loggin In...");
    try {
      const res = await login(data).unwrap();
      console.log(res);
      dispatch(
        setUser({
          user: res.data.user,
          token: res.data.token,
        })
      );
      toast.success("Successfully Logged In", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
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
                Log in
              </Button>
              Or{" "}
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                register now!
              </a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

import { Button, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const items = [
    { key: "home", label: <NavLink to="/">Home</NavLink> },
    {
      key: "login",
      label: (
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
          />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          All Right Reserved. ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

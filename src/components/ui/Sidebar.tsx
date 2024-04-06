import { AppstoreAddOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { createElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoWithText from "../svgs/LogoWithText";

const { Sider } = Layout;

const items = [
  // {
  //   key: "dashboard",
  //   icon: createElement(DashboardOutlined),
  //   label: <NavLink to="/">Sale History</NavLink>,
  // },
  {
    key: "bikes",
    icon: createElement(AppstoreOutlined),
    label: <NavLink to="/bikes">Bike List</NavLink>,
  },
  {
    key: "sales",
    icon: createElement(AppstoreAddOutlined),
    label: <NavLink to="/sales">Sales List</NavLink>,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const currentRoute = pathname.split("/")[1]
    ? pathname.split("/")[1]
    : "bikes";
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          padding: "20px 30px",
        }}
      >
        <div
          style={{
            width: "80px",
            backgroundColor: "white",
            padding: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogoWithText />
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[currentRoute]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;

import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// 这里会报错 Can't resolve '@ant-design/icons
// 解决：终于在官方issue里面找到原因是 antd 4+版本不带有 @ant-design/icons，包括 @ant-design/compatible 等等。直接安装 npm i @ant-design/icons 解决
import "./index.scss";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo, clearUserInfo } from "@/store/modules/user";
import { useSelector } from "react-redux";
const { Header, Sider } = Layout;

const GeekLayout = () => {
  const location = useLocation();
  const selectedKey = location.pathname; // 获取当前路由,高亮菜单

  // 获取用户名称
  const dispatch = useDispatch();
  useEffect(() => {
    // 调用获取用户信息接口
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const items = [
    {
      label: "数据概览",
      key: "/",
    },
    {
      label: "内容管理",
      key: "/article",
    },
    {
      label: "发布文章",
      key: "/publish",
    },
  ];
  const navigate = useNavigate();
  const onMenuClick = (route) => {
    console.log(route);
    navigate(route.key);
  };

  // useSelector可以拿到store的变量
  const name = useSelector((state) => state.user.userInfo.name);

  // 退出登录确认
  const onConfirm = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            items={items}
            onClick={onMenuClick}
            selectedKeys={selectedKey}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;

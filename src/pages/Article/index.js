import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  Popconfirm
} from "antd";
import "moment/locale/zh-cn";
import { useState, useEffect } from "react";

// 汉化包 时间选择器显示中文
import locale from "antd/es/date-picker/locale/zh_CN";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { getArticleListAPI, deleteArticleAPI } from "@/apis/article";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate()
  // 获取频道列表
  const { channelList } = useChannel([]);

  // 筛选功能
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4
})
  
  // 获取筛选数据
  const onFinish = (formValue) => {
    console.log("formValue",formValue )
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue?.status,
      begin_pubdate: formValue.date ? formValue?.date[0].format("YYYY-MM-DD") : "",
      end_pubdate: formValue.date ?formValue?.date[1].format("YYYY-MM-DD") : "",
    })
  }
  const onPageChange = (page) => {
    console.log(page);
    setReqData({
      ...reqData,
      page
    })
  }

  // 获取文章列表
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData);
      setList(res.data.results);
      setTotal(res.data.total_count);
    }
    getList();
  }, [reqData]);


  // 删除文章
  const onDelConfirm = async ({id}) => {
    console.log(id);
    await deleteArticleAPI(id)
    setReqData({...reqData})
  }

  // 定义状态枚举
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>,
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return <img src={cover || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => status[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)}/>
            <Popconfirm
            title="删除文章"
            description="确定要删除当前文章吗？"
            onConfirm={() => onDelConfirm(data)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
            
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">" items={[
            {
              title: '首页',
              href: '/',
            },
            {
              title: '内容管理',
            },
          ]}>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelList.map((item) => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${total} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{
          total,
          pageSize: reqData.per_page,
          onChange: onPageChange
        }}/>
      </Card>
    </div>
  );
};

export default Article;

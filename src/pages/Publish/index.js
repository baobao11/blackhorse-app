import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.scss";

// 富文本编辑器组件
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createArticleAPI } from "@/apis/article";
import { message } from "antd";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel();

  // 表单提交
  const onFinished = (formValue) => {
    console.log(formValue);
    // 校验图片数量是否图片类型
    if (fileList.length !== imageType)
      return message.warning("封面图片数量不正确");
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: fileList.map((item) => item.response.data.url),
      },
      channel_id,
    };
    createArticleAPI(reqData);
  };
  // 上传图片
  const [fileList, setFileList] = useState([]);
  const onChange = (value) => {
    console.log("uploading", value);
    setFileList(value.fileList);
  };

  // 切换封面类型
  const [imageType, setImageType] = useState(1);
  const onTypeChange = (e) => {
    console.log(e.target.value);
    setImageType(e.target.value);
    if (e.target.value === 0) setFileList([]);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinished}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onChange}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;

import axios from "axios";
import { DatePicker, Form, Input, Select, Button } from "antd";
import { useState } from "react";
const { Option } = Select;

const AddPlan = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { mealCount, planCost, ...otherValues } = values;
        const response = await axios.post(
          "http://localhost:8800/api/user/mess/plan/",
          {
            mealCount: parseInt(mealCount),
            planCost: parseInt(planCost),
            ...otherValues,
          },
          {
            headers: {
              Authorization: `${import.meta.env.VITE_ACCESS_TOKEN}`,
            },
          }
        );
        console.log(response.status);
        if (response.status === 200) {
          form.resetFields();
        } else {
          console.log(response.data.message);
          form.resetFields();
        }
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{
          xs: { span: 24 },
          sm: { span: 8 },
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 10 },
        }}
        layout="horizontal"
        action=""
        initialValues={{ remember: "true" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Plan Name"
          name="name"
          rules={[
            { required: true, message: "Please enter name of the meal plan" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Plan Cost"
          name="planCost"
          rules={[{ required: true, message: "Please enter the plan cost" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Meal count"
          name="mealCount"
          rules={[
            { required: true, message: "Please enter no of meals per plan" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Add Plan
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPlan;
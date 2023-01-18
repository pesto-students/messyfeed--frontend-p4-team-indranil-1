import { DatePicker, Form, Input, Select, Button } from "antd";
import { useState } from "react";
const { Option } = Select;

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const PlanRenewal = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleSelectChange = (value) => {
    console.log(value);
    setSelectedOption(value);
    setInputValue(selectedOption);
  };

  const handleInputChange = () => {
    setInputValue(selectedOption);
  };

  const handleClick = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        console.log("Values: ", values);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
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
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Pleasse enter valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mealPlan"
          label="Meal Plan"
          rules={[
            {
              required: true,
              message: "Please select Meal Plan",
            },
          ]}
        >
          <Select
            placeholder="select Meal Plan"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <Option value="plan1">One Meal - 1000</Option>
            <Option value="plan2">Two Meal - 2000</Option>
          </Select>
        </Form.Item>
        <Form.Item name="planAmount" label="Plan Amount">
          <Input value={inputValue} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Payment Mode" name="paymentMode" initialValue="Cash">
          <Input />
        </Form.Item>
        <Form.Item label="Start Date" name="startDate">
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleClick}>
            Renew Plan
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PlanRenewal;
import React, { useEffect } from "react";
import {
  Form,
  Input,
  Switch,
  InputNumber,
  DatePicker,
  Button,
  message,
} from "antd";
import CustomerList from "./CustomerList";

const AddEditCustomer = ({
  mode,
  customer,
  onAddCustomerSuccess,
  onEditCustomerSuccess,
  onDeleteCustomerSuccess,
}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    console.log({ values });
    if (mode === "add") {
      //call add customer api wid values
      //   message.success("customer added");
      //   const newCustomer = {
      //     ...values,
      //     id: `MB00${currentCustomer.length + 1}`,
      //   };
      //   form.resetFields();
      onAddCustomerSuccess && onAddCustomerSuccess(values);
    } else if (mode === "edit") {
      //call update customer api wid values
      //   message.success("customer updated");
      //   const updatedData = CustomerList.map((customer) =>
      //     customer.id === currentCustomer.id
      //       ? { ...customer, ...values }
      //       : customer
      //   );
      onEditCustomerSuccess && onEditCustomerSuccess(values);
    }
  };

  useEffect(() => {
    if (mode === "edit" && customer) {
      form.setFieldsValue(customer);
    } else {
      form.resetFields();
    }
  }, [mode, customer]);

  return (
    <div>
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item
          label="CustomerId"
          name="id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={mode == "edit"} />
        </Form.Item>
        {JSON.stringify({ mode, customer })}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Status" valuePropName="checked" name="status">
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            // checked={status === "Active"}
          ></Switch>
        </Form.Item>

        <Form.Item label="Risk Profile" name="risk">
          <Input />
        </Form.Item>

        <Form.Item label="Portfolio Value" name="portfolioValue">
          <InputNumber />
        </Form.Item>

        <Form.Item label="SIP Amount" name="sip">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Adhoc Inv" name="adhoc">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Model Portfolio" name="model">
          <Input />
        </Form.Item>

        <Form.Item label="Thematic Inv" name="thematic">
          <Input />
        </Form.Item>

        <Form.Item label="Last Updated" name="lastUpdated">
          <Input />
        </Form.Item>
        <Button htmlType="submit">{mode === "add" ? "Save" : "Update"}</Button>

        {/* {customer?.map((customer, index) => (
          <div key={(customer, index)}></div>
        ))} */}
      </Form>
    </div>
  );
};

export default AddEditCustomer;

import React, { useEffect } from "react";
import {
  Form,
  Input,
  Switch,
  InputNumber,
  DatePicker,
  Button,
  message,
  Row,
  Col,
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
    <div className="form-container">
      <Form form={form} onFinish={handleFormSubmit}>
        <Row style={{ padding: "10px" }}>
          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Customer Id"
              colon={true}
              wrapperCol={{ sm: { offset: 2 } }}
              name="id"
              rules={[
                { required: true, message: "Please enter your customerId" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label=" Name"
              colon={true}
              wrapperCol={{ sm: { offset: 4 } }}
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Status"
              colon={true}
              wrapperCol={{ sm: { offset: 5 } }}
              name="status"
            >
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                // checked={status === "Active"}
              ></Switch>
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Risk Profile"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="risk"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Portfolio Value"
              colon={true}
              wrapperCol={{ sm: { offset: 2 } }}
              name="portfolioValue"
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="SIP Amount"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="sip"
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Adhoc Inv"
              colon={true}
              wrapperCol={{ sm: { offset: 4 } }}
              name="adhoc"
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Model Portfolio"
              colon={true}
              wrapperCol={{ sm: { offset: 2 } }}
              name="model"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Thematic Inv"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="thematic"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Last Updated"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="lastUpdated"
            >
              <Input />
            </Form.Item>
          </Col>
          <Button htmlType="submit">
            {mode === "add" ? "Save" : "Update"}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddEditCustomer;

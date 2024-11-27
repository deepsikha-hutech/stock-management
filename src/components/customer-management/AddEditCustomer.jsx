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
import variable from "../../assets/variables";
import Cookie from "js-cookies";
import axios from "axios";

const AddEditCustomer = ({
  mode,
  customer,
  onAddCustomerSuccess,
  onEditCustomerSuccess,
  onDeleteCustomerSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "edit" && customer) {
      form.setFieldsValue(customer);
    } else {
      form.resetFields();
    }
  }, [mode, customer]);

  const handleFormSubmit = async (values) => {
    console.log({ values });
    const token = Cookie.getItem("accessToken");

    if (mode === "add") {
      try {
        const { data } = await axios.post(
          ` ${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock`,
          values,
          { headers: { Authorization: token } }
        );

        if (data?.stockinfo?._id) {
          alert("stock added");

          form.resetFields();
          onAddCustomerSuccess(data.stockinfo, "add");
        } else {
          alert(" Failed to add stock, try again");
        }
      } catch (error) {
        console.log(error);
        alert("add Failed, try again");
      }
    } else if (mode === "edit") {
      try {
        const { data } = await axios.put(
          ` ${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock/${customer?._id}`,
          values,
          { headers: { Authorization: token } }
        );

        if (data?.stockinfo?._id) {
          form.resetFields();
          onEditCustomerSuccess(data.stockinfo, "edit");
        } else {
          alert(" Failed to update stock, try again");
        }
      } catch (error) {
        console.log(error);
        alert("something went wrong, try again");
      }
    }
  };

  return (
    <div className="form-container">
      <Form form={form} onFinish={handleFormSubmit}>
        <Row style={{ padding: "10px" }}>
          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Customer Id"
              colon={true}
              wrapperCol={{ sm: { offset: 2 } }}
              name="customerid"
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
              ></Switch>
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Risk Profile"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="riskprofile"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Portfolio Value"
              colon={true}
              wrapperCol={{ sm: { offset: 2 } }}
              name="portfoliovalue"
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="SIP Amount"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="sipamount"
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Adhoc Inv"
              colon={true}
              wrapperCol={{ sm: { offset: 4 } }}
              name="adhocinv"
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Model Portfolio"
              colon={true}
              wrapperCol={{ sm: { offset: 2 } }}
              name="modelportfolio"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Thematic Inv"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="thematicinv"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18} md={12} lg={24}>
            <Form.Item
              label="Last Updated"
              colon={true}
              wrapperCol={{ sm: { offset: 3 } }}
              name="lastupdated"
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

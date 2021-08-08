import React from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { useHistory } from "react-router-dom";

import "antd/dist/antd.css";
import "../Login/Login.css";

function Login() {
  let history = useHistory();

  function handleClick(values) {
    const email = values.email;
    const pass = values.password;
    if (email !== "admin@gmail.com") {
      notification.open({
        message: "Invalid Email!!!",
      });
      return false;
    }
    if (pass !== "123") {
      notification.open({
        message: "Invalid Password!!!",
      });
      return false;
    } else if (email == "admin@gmail.com" && pass == 123) {
      notification.open({
        message: "Login successfully..",
      });
      history.push("/dashboard");
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="formContainer">
      <h1 className="title">Login</h1>

      <Form
        className="loginForm"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleClick}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Email id" name="email">
          <Input type="email" id="email" placeholder="Enter Email" />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password id="pass" type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;

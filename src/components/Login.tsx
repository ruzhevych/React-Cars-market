import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { accountService } from '../services/accounts.service';
import { tokenService } from '../services/token.service';
import { LoginField } from '../models/accounts';
import { useAccountContext } from '../contexts/accounts.context';
import api from '../services/api';

const Login: React.FC = () => {

    const { setAccount } = useAccountContext();

    const onFinish: FormProps<LoginField>['onFinish'] = (values) => {
        console.log('Success:', values);

        // using [axios] instead of [fetch]
        api.post("accounts/login", values).then(res => {
            console.log(res);
            if (res.status === 200) {
                accountService.login(res.data.accessToken);
                message.success("Success!");
                setAccount(tokenService.getPayload());
            }
        }).catch(err => {
            message.error(err.response.data.detail);
        });
    };

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Login Into Your Account</h2>

            <Form
                name="basic"
                // labelCol={{ span: 6 }}
                // wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600, margin: "auto" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<LoginField>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<LoginField>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<LoginField>
                    name="remember"
                    valuePropName="checked"
                    style={{ textAlign: "center" }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default Login;
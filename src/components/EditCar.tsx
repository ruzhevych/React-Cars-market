import { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    FormProps,
    Input,
    InputNumber,
    message,
    Select,
    Space,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryModel, CategoryOption } from '../models/categories';
import { CarFormFields } from '../models/cars';

type QueryParams = {
    id: string;
}
const { TextArea } = Input;

const apiUrl = import.meta.env.VITE_CARS_API_URL;

const EditCar = () => {

    // const [product, setProduct] = useState<ProductModel | null>(null);
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [form] = Form.useForm<CarFormFields>();
    const { id } = useParams<QueryParams>();

    useEffect(() => {
        fetch(apiUrl + "Cars/" + id).then(res => res.json()).then(data => {
            // setProduct(data);
            form.setFieldsValue(data);
            console.log(data);
        });
    }, []);

    const onSubmit: FormProps<CarFormFields>['onFinish'] = (item) => {
        console.log(item);

        // upload to server
        fetch(apiUrl + "cars", {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.status === 200) {
                message.success("Cars edited successfuly!");
                navigate(-1);
            }
            else {
                res.json().then(res => {
                    const msg = res.errors[Object.keys(res.errors)[0]][0];
                    message.error(msg);
                })
            }
        })
    }
    return (
        <>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            <h2>Edit Product</h2>

            <Form<CarFormFields>
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="horizontal"
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item<CarFormFields> name="id" hidden></Form.Item>
                <Form.Item<CarFormFields> label="Name" name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<CarFormFields> label="Price" name="price">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<CarFormFields> label="Quantity" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<CarFormFields> label="Category" name="categoryId">
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item<CarFormFields> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                {/* <Form.Item label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>
                    <Upload maxCount={1}>
                        <Button icon={<UpCircleOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item> */}
                <Form.Item<CarFormFields> label="Image" name="imageUrl">
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};
export default EditCar;
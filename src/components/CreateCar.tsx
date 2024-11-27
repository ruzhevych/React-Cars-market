import { useEffect, useState } from 'react';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    FormProps,
    Input,
    InputNumber,
    message,
    Select,
    Space,
    Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { CategoryModel, CategoryOption } from '../models/categories';
import { CarFormFields } from '../models/cars';
import api from '../services/api';

const { TextArea } = Input;

const normFile = (e: any) => {
    return e?.file.originFileObj;
};

const apiUrl = import.meta.env.VITE_API_URL;

const CreateCar = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryOption[]>([]);

    useEffect(() => {
        fetch(apiUrl + 'cars/categories').then(res => res.json()).then(data => {
            const items = data as CategoryModel[];
            setCategories(items.map(x => { return { label: x.name, value: x.id } }));
        });
    }, []);

    const onSubmit: FormProps<CarFormFields>['onFinish'] = (item) => {
        console.log(item);

        const form = new FormData();

        for (const key in item) {
            form.append(key, (item as any)[key]);
        }

        api.post("cars", form).then(res => {
            if (res.status === 200) {
                message.success("Car created successfuly!");
                navigate(-1);
            }
        }).catch(err => {
            console.log(err);

        });
    }
    return (
        <>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            <h2>Create New Product</h2>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="horizontal"
                onFinish={onSubmit}
            >
                <Form.Item<CarFormFields> label="Brand" name="brand"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<CarFormFields> label="Model" name="model"
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
                <Form.Item<CarFormFields> label="Year" name="year">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<CarFormFields> label="Category" name="categoryId">
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item<CarFormFields> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item<CarFormFields> label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>
                    <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                {/* <Form.Item<ProductFormFields> label="Image" name="imageUrl">
                    <Input />
                </Form.Item> */}
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
                            Create
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};
export default CreateCar;
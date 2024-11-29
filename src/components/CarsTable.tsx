import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd';
import { AppstoreAddOutlined, DeleteFilled, EditFilled, InfoCircleFilled, LikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CarModel } from '../models/cars';
import api from '../services/api';

const apiPath = import.meta.env.VITE_CARS_API_URL;

const CarTable = () => {

    const [cars, setCars] = useState<CarModel[]>([]);

    const columns: TableProps<CarModel>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (_, item) => <img height={50} src={item.imageUrl} alt={item.name}></img>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, item) => <Link to={`/cars/${item.id}`}>{text}</Link>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text}$</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'stock',
            render: (text) =>
                text > 0 ?
                    <Tag color="green">Available</Tag>
                    :
                    <Tag color="volcano">Out of Stock</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/cars/${record.id}`}>
                        <Button color="default" variant="outlined" icon={<InfoCircleFilled />} />
                    </Link>
                    <Link to={`/favorites`}>
                        <Button style={{ color: '#61916e' }} variant="outlined" icon={<LikeOutlined />} />
                    </Link>
                    <Link to={`/edit/${record.id}`}>
                        <Button style={{ color: '#faad14' }} variant="outlined" icon={<EditFilled />} />
                    </Link>
                    <Popconfirm
                        title="Delete the car"
                        description={`Are you sure to delete ${record.name}?`}
                        onConfirm={() => deleteItem(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button color="danger" variant="outlined" icon={<DeleteFilled />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // load data from server
    useEffect(() => {
        fetch(apiPath + "cars/all")
            .then(res => res.json())
            .then((data) => {
                const items = data as CarModel[];
                setCars(items.sort((x, y) => y.id - x.id));
            });
    }, []);

    const deleteItem = (id: number) => {

        api.delete("cars/" + id).then(res => {
            if (res.status === 200) {
                setCars(cars.filter(x => x.id !== id));
                message.success('Car deleted successfuly!');
            }
            else
                message.error("Something went wrong!");
        });

    }

    return (
        <>
            <div>
                <Link to="/create">
                    <Button type="primary" icon={<AppstoreAddOutlined />} style={{ marginBottom: '16px' }} className='BackColor'>
                        Create New Car
                    </Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={cars} rowKey="id" />
        </>
    )
}
export default CarTable;
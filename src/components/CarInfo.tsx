import { LeftOutlined } from '@ant-design/icons';
import { Image, Flex, Skeleton, Space, Button } from 'antd';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CarModel } from '../models/cars';

const apiUrl = import.meta.env.VITE_CARS_API_URL;

type Params = {
    id: string;
};

export default function CarInfo() {
    const [item, setItem] = useState<CarModel | null>(null);
    const { id } = useParams<Params>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(apiUrl + "cars/" + id)
            .then(res => res.json())
            .then(data => setItem(data));
    }, []);

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            {
                item ?
                    <div>
                        <h2>{item.name}</h2>
                        <p>{item.categoryName}</p>
                        <hr />
                        <Image
                            width={200}
                            src={item.imageUrl}
                        />
                        <p>Price: {item.price}$</p>
                        <p>Quantity: {item.quantity}%</p>
                        <p>Description: {item.description}</p>
                    </div>
                    :
                    <Flex gap="middle" vertical>
                        <Space>
                            <Skeleton.Input active />
                            <Skeleton.Input active />
                        </Space>
                        <Skeleton
                            paragraph={{
                                rows: 0,
                            }}
                        />
                        <Skeleton.Image />
                        <Skeleton active />
                    </Flex>
            }
        </div >
    )
}

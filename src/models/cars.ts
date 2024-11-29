export interface CarModel {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    categoryName?: string;
    description?: string;
}

export type CarFormFields = {
    id?: number;
    name?: string;
    price?: string;
    quantity?: number;
    categoryId?: number;
    description?: string;
    imageUrl?: string;
    image?: File;
};
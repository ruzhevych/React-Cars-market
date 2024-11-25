export interface CarModel {
    id: number;
    brand: string;
    model: string;
    price: number;
    year: number;
    imageUrl: string;
    categoryName?: string;
    description?: string;
}

export type CarFormFields = {
    id?: number;
    brand?: string;
    model?: string;
    price?: string;
    year?: number;
    categoryId?: number;
    description?: string;
    imageUrl?: string;
    image?: File;
};
import axios from "axios";
import type { IProduct, IStore } from "../types";

const instance = axios.create({
    baseURL: "https://dummyjson.com",
});

export const getAllProducts = async () => {
    const response = await instance.get<IStore>("/products");
    return response.data;
}

export const getProductById = async (id: number) => {
    const response = await instance.get<IProduct>(`/products/${id}`);
    return response.data;
}
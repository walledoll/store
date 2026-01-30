import axios from "axios";
import type { IStore } from "../types";

const instance = axios.create({
    baseURL: "https://dummyjson.com",
});

export const getAllProducts = async () => {
    const response = await instance.get<IStore>("/products");
    return response.data;
}
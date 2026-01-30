import axios from "axios";
import type { IStore } from "./store.interface";  // измените тип

const instance = axios.create({
    baseURL: "https://dummyjson.com",
});

export const getAllProducts = async () => {  // уберите Promise<IStoreResponse>
    const response = await instance.get<IStore>("/products");
    return response.data;
}
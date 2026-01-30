import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../api/store"

export const useProducts = () => {
    return useQuery({ 
        queryKey: ["products"],
        queryFn: async () => {
            const response = await getAllProducts();
            return response;
        },
    });
}
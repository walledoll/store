import { getAllProducts, getProductById } from "@api/store";
import { useQuery } from "@tanstack/react-query"

export const useProducts = () => {
    return useQuery({ 
        queryKey: ["products"],
        queryFn: async () => {
            const response = await getAllProducts();
            return response;
        },
    });
}

export const useProductById = (id: number) => {
    return useQuery({ 
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await getProductById(id);
            return response;
        },
    });
}
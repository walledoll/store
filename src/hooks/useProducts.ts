import { getAllProducts } from "@api/store";
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
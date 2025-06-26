"use client";
import { fetchProducts } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

const ProductList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return <div>hello</div>;
};

export default ProductList;

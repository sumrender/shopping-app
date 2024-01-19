import { BASE_URL, TOKEN } from "@/constants/data";
import { Product } from "@/models/product.interface";
import axios, { AxiosResponse } from "axios";

const PRODUCT_URL = BASE_URL + "/products";

interface GetProductsProps {
  name?: string;
  currentPage?: number;
  resultsPerPage?: number;
}

export const getProducts = async ({
  name,
  currentPage,
  resultsPerPage,
}: GetProductsProps = {}) => {
  const params = new URLSearchParams();
  if (name) {
    params.append("name", name);
  }
  if (currentPage && resultsPerPage) {
    params.append("currentPage", currentPage.toString());
    params.append("resultsPerPage", resultsPerPage.toString());
  }

  const { data: products }: AxiosResponse<Product[]> = await axios.get(
    `${PRODUCT_URL}?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return products;
};

interface ProductByCategoryProps {
  category?: string;
  currentPage?: number;
  resultsPerPage?: number;
}

export const getProductById = async (productId: string): Promise<Product> => {
  const { data: product }: AxiosResponse<Product> = await axios.get(
    `${PRODUCT_URL}/${productId}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return product;
};

export const getProductByCategories = async ({
  category,
  currentPage,
  resultsPerPage,
}: ProductByCategoryProps) => {
  const params = new URLSearchParams();
  if (category) {
    params.append("category", category);
  }
  if (currentPage && resultsPerPage) {
    params.append("currentPage", currentPage.toString());
    params.append("resultsPerPage", resultsPerPage.toString());
  }

  const { data: products }: AxiosResponse<Product[]> = await axios.get(
    `${PRODUCT_URL}?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return products;
};

interface FeaturedOrNewArrivalProductsProps {
  isFeatured?: boolean;
  isNew?: boolean;
  currentPage?: number;
  resultsPerPage?: number;
}
export const getFeaturedOrNewArrivalProducts = async ({
  isFeatured,
  isNew,
  currentPage,
  resultsPerPage,
}: FeaturedOrNewArrivalProductsProps) => {
  const params = new URLSearchParams();
  if (isFeatured) {
    params.append("isFeatured", "true");
  }
  if (isNew) {
    params.append("isNew", "true");
  }
  if (currentPage && resultsPerPage) {
    params.append("currentPage", currentPage.toString());
    params.append("resultsPerPage", resultsPerPage.toString());
  }

  const { data: products }: AxiosResponse<Product[]> = await axios.get(
    `${PRODUCT_URL}?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return products;
};

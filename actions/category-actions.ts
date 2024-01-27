import { BASE_URL, TOKEN } from "@/constants/data";
import { Category } from "@/models/category.interface";
import axios, { AxiosResponse } from "axios";

const CATEGORIES_URL = `${BASE_URL}/categories`;

export const getAllCategories = async (): Promise<Category[]> => {
  const { data: categories }: AxiosResponse<Category[]> = await axios.get(
    CATEGORIES_URL
  );
  return categories;
};

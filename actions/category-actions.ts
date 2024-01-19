import { BASE_URL, TOKEN } from "@/constants/data";
import { Category } from "@/models/category.interface";
import axios, { AxiosResponse } from "axios";

const CATEGORIES_URL = `${BASE_URL}/categories`;

export const getAllCategories = async (): Promise<Category[]> => {
  const { data: categories }: AxiosResponse<Category[]> = await axios.get(
    CATEGORIES_URL,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return categories;
};

export const getCategoryById = async (
  categoryId: string
): Promise<Category> => {
  const { data: category }: AxiosResponse<Category> = await axios.get(
    `${CATEGORIES_URL}/${categoryId}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return category;
};

interface CreateCategoryProps {
  name: string;
}

export const createCategory = async (
  props: CreateCategoryProps
): Promise<Category> => {
  const { data: category }: AxiosResponse<Category> = await axios.post(
    CATEGORIES_URL,
    { name: props.name },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return category;
};

interface UpdateCategoryProps {
  name: string;
}

export const updateCategory = async (
  categoryId: string,
  props: UpdateCategoryProps
): Promise<Category> => {
  const { data: category }: AxiosResponse<Category> = await axios.patch(
    `${CATEGORIES_URL}/${categoryId}`,
    { name: props.name },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return category;
};

export const deleteCategory = async (categoryId: string): Promise<Category> => {
  const { data: category }: AxiosResponse<Category> = await axios.delete(
    `${CATEGORIES_URL}/${categoryId}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return category;
};

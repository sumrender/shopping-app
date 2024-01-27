import { BASE_URL, TOKEN } from "@/constants/data";
import { Billboard } from "@/models/billboard.interface";
import axios, { AxiosResponse } from "axios";

const BILLBOARD_URL = BASE_URL + '/billboards';

export const getAllBillboards = async () => {
  const { data: billboards }: AxiosResponse<Billboard[]> = await axios.get(
    BILLBOARD_URL
  );

  return billboards;
};
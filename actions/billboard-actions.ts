import { BASE_URL, TOKEN } from "@/constants/data";
import { Billboard } from "@/models/billboard.interface";
import axios, { AxiosResponse } from "axios";

const BILLBOARD_URL = BASE_URL + '/billboards';

export const getAllBillboards = async () => {
  const { data: billboards }: AxiosResponse<Billboard[]> = await axios.get(
    BILLBOARD_URL,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return billboards;
};

export const getBillboardById = async (billboardId: string): Promise<Billboard> => {
  const { data: billboard }: AxiosResponse<Billboard> = await axios.get(
    `${BILLBOARD_URL}/${billboardId}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return billboard;
};

interface CreateBillboardProps {
  url: string;
  label: string;
}
export const createBillboard = async (props: CreateBillboardProps) => {
  const { data: billboard }: AxiosResponse<Billboard> = await axios.post(
    BILLBOARD_URL,
    {
      url: props.url,
      label: props.label,
    },
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return billboard;
};

interface UpdateBillboardProps {
  id: string;
  url?: string;
  label?: string;
}

export const updateBillboard = async (props: UpdateBillboardProps) => {
  const { data: updatedBillboard }: AxiosResponse<Billboard> = await axios.patch(
    `${BILLBOARD_URL}/${props.id}`,
    {
      url: props.url,
      label: props.label,
    },
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return updatedBillboard;
};

export const removeBillboardById = async (billboardId: string) => {
  const { data }: AxiosResponse<Billboard> = await axios.delete(`${BILLBOARD_URL}/${billboardId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  return data;
};

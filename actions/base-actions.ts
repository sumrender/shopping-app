import axios, { AxiosResponse } from "axios";

export class BaseActions<Model> {
  constructor(private readonly URL: string, private readonly TOKEN: string) {}

  async getAll(): Promise<Model[] | undefined> {
    try {
      const { data }: AxiosResponse<Model[]> = await axios.get(
        this.URL,
        { headers: { Authorization: `Bearer ${this.TOKEN}` } }
      );
      return data;
    } catch (error) {
      console.error("Error fetching getAll", error);
    }
  }

  async getOne(id: string): Promise<Model | undefined> {
    try {
      const { data }: AxiosResponse<Model> = await axios.get(
        `${this.URL}/${id}`,
        { headers: { Authorization: `Bearer ${this.TOKEN}` } }
      );
      return data;
    } catch (error) {
      console.error("Error fetching getOne", error);
    }
  }

  async create(item: Model): Promise<Model | undefined> {
    try {
      const { data }: AxiosResponse<Model> = await axios.post(
        this.URL,
        item,
        { headers: { Authorization: `Bearer ${this.TOKEN}` } }
      );
      return data;
    } catch (error) {
      console.error("Error creating item", error);
    }
  }

  async update(id: string, item: Partial<Model>): Promise<Model | undefined> {
    try {
      const { data }: AxiosResponse<Model> = await axios.put(
        `${this.URL}/${id}`,
        item,
        { headers: { Authorization: `Bearer ${this.TOKEN}` } }
      );
      return data;
    } catch (error) {
      console.error("Error updating item", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(
        `${this.URL}/${id}`,
        { headers: { Authorization: `Bearer ${this.TOKEN}` } }
      );
    } catch (error) {
      console.error("Error deleting item", error);
    }
  }
}

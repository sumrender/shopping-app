import { BASE_URL } from "@/constants/data";
import { User } from "@/models/user.interface";
import axios, { AxiosResponse } from "axios";

const USER_URL = BASE_URL + "/users";

export function isValidMobileNumber(mobileNumber: string): boolean {
  const regex = new RegExp(/(0|91)?[6-9][0-9]{9}/);

  if (!mobileNumber) {
    return false;
  }
  if (regex.test(mobileNumber)) {
    return true;
  }
  return false;
}

export async function updateUserDetails(
  accessToken: string,
  props: Partial<User>
) {
  try {
    const { data }: AxiosResponse<User> = await axios.patch(USER_URL, props, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.log("update user details error", error);
  }
}

export async function register(mobileNumber: string) {
  try {
    const res: AxiosResponse<{ success: boolean }> = await axios.post(
      `${USER_URL}/register`,
      { mobileNumber }
    );
    return res.status;
  } catch (error) {
    console.log("register error: ", error);

    if (axios.isAxiosError(error) && error.response) {
      return error.response.status;
    }
    return 500;
  }
}

export async function login(mobileNumber: string) {
  try {
    const res: AxiosResponse<{ success: boolean }> = await axios.post(
      `${USER_URL}/login`,
      { mobileNumber }
    );
    return res.status;
  } catch (error) {
    console.log("login error:  ", error);

    if (axios.isAxiosError(error) && error.response) {
      return error.response.status;
    }
    return 500;
  }
}

export async function verifyOtp(mobileNumber: string, otp: string) {
  try {
    const res: AxiosResponse<{ user: User; accessToken: string }> =
      await axios.post(`${USER_URL}/verify`, { mobileNumber, otp });
    return res.data;
  } catch (error) {
    console.log("send otp failed with error: ", error);
  }
}

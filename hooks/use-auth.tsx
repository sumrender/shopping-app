import { User } from "@/models/user.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const USER = "user";

interface LocalStorageUser {
  user: User;
  accessToken: string;
}
async function saveUserToLocalStorage(data: LocalStorageUser) {
  await AsyncStorage.setItem(USER, JSON.stringify(data));
  console.log("user saved to local storage");
}

async function removeUserFromLocalStorage() {
  await AsyncStorage.removeItem(USER);
  console.log("user removed from local storage");
}

async function getUserFromLocalStorage() {
  const data = await AsyncStorage.getItem(USER);
  if (data) {
    return JSON.parse(data) as LocalStorageUser;
  }
}

interface useAuthStore {
  user: User | null;
  accessToken: string | null;
  setUserAndAccessToken: (user: User, accessToken: string) => void;
  setUser: (user: User) => void;
  resetUser: () => void;
  fetchUserFromLocalStorage: () => void;
}

export const useAuth = create<useAuthStore>((set) => ({
  user: null,
  accessToken: null,
  setUserAndAccessToken: (user: User, accessToken: string) => {
    set({ user, accessToken });
    saveUserToLocalStorage({ user, accessToken });
  },
  setUser: (user: User) => set({ user }),
  resetUser: () => {
    set({ user: null, accessToken: null });
    removeUserFromLocalStorage();
    console.log("user removed from useAuth");
  },
  fetchUserFromLocalStorage: async () => {
    const data = await getUserFromLocalStorage();
    if (data) {
      console.log("user fetched from local storage");
      set({ user: data.user, accessToken: data.accessToken });
    }
  },
}));

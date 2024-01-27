export interface User {
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  email: string;
  mobileNumber?: string;
  role: "user";
  address: string;
  createdAt: string;
}

export interface ICustomer {
  id: number;
  name: string;
  email?: string;
  phone_number?: string;
  additional_phone_number?: string;
  note?: string;
  isDeleted: boolean;
}

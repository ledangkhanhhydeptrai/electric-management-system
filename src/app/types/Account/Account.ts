export interface Account {
  id: string;
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  createdAt: string;
  lastModifiedAt: string;
  isActive: boolean;
  avatar?: string;
}
export interface AccountTableProps {
  accounts: Account[];
  onUpdate?: (updatedAccount: Account) => void;
}
export interface UpdateAccountDTO {
  username: string;
  phoneNumber: string;
}

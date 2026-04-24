export enum Role {
  Administrator = "Administrator",
  User = "User",
  DealerManager = "Dealer Manager",
  StaffDealer = "Staff",
  EVMStaff = "EVM Staff"
}
export interface User {
  token: string;
  username: string | undefined;
  roles: Role[];
}

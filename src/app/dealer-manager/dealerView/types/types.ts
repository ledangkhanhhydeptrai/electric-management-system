export type Dealer = {
  code: string;
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
};
export type UpdateDealer = {
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  promotionId?: string;
};
export type UpdateDealerPayload = UpdateDealer & { id: string };
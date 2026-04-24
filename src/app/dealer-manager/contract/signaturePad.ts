export type SignContractRequest = {
  contractId: string;
  signerRole: "BUYER" | "SELLER" | string;
  signerName: string;
  signerIdNo: string;
};

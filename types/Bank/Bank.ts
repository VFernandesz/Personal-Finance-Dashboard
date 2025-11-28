export type Bank = {
  id: number,
  name: string,
  primaryColor: string,
  institutionUrl: string,
  country: string,
  type: string,
  credentials: Credential[],
  imageUrl: string,
  hasMFA: boolean,
  oauth: boolean,
  products: string[],
  createdAt: string,
  isSandbox: boolean,
  isOpenFinance: boolean,
  updatedAt: string,
  supportsPaymentInitiation: boolean,
  supportsScheduledPayments: boolean,
  supportsSmartTransfers: boolean,
  supportsBoletoManagement: boolean

}
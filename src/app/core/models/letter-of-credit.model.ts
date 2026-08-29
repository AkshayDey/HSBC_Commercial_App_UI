export interface LetterOfCredit {
  id: string;
  referenceNumber: string;
  applicantName: string;
  beneficiaryName: string;
  amount: number;
  currency: string;
  expiryDate: string;
  status: string;
}
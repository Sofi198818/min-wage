export type PossibleCaseDTO = {
  id: string;
  patientId: string;
  admissionTypeId: string;
  admissionDate: string;
  admissionPlace: string;
  registrationGroup: number;
  riskGroupIds: Array<string>;
  document: File | null;
};

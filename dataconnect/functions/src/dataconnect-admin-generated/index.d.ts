import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Cid_Key {
  id: UUIDString;
  __typename?: 'Cid_Key';
}

export interface CreatePrescriptionData {
  prescription_insert: Prescription_Key;
}

export interface CreatePrescriptionItemData {
  prescriptionItem_insert: PrescriptionItem_Key;
}

export interface CreatePrescriptionItemVariables {
  prescriptionId: UUIDString;
  formulaId: UUIDString;
  quantity: number;
}

export interface CreatePrescriptionVariables {
  patientId: UUIDString;
  cidId: UUIDString;
  date: DateString;
  totalKcal: number;
}

export interface DeleteCidData {
  cid_delete?: Cid_Key | null;
}

export interface DeleteCidVariables {
  id: UUIDString;
}

export interface DeleteFormulaData {
  formula_delete?: Formula_Key | null;
}

export interface DeleteFormulaVariables {
  id: UUIDString;
}

export interface DeletePatientData {
  patient_delete?: Patient_Key | null;
}

export interface DeletePatientVariables {
  id: UUIDString;
}

export interface DeletePrescriptionData {
  prescription_delete?: Prescription_Key | null;
}

export interface DeletePrescriptionItemData {
  prescriptionItem_delete?: PrescriptionItem_Key | null;
}

export interface DeletePrescriptionItemVariables {
  id: UUIDString;
}

export interface DeletePrescriptionVariables {
  id: UUIDString;
}

export interface Formula_Key {
  id: UUIDString;
  __typename?: 'Formula_Key';
}

export interface GetCidData {
  cid?: {
    cidCode: string;
    name: string;
  };
}

export interface GetCidVariables {
  id: UUIDString;
}

export interface GetFormulaData {
  formula?: {
    name: string;
    kcal: number;
  };
}

export interface GetFormulaVariables {
  id: UUIDString;
}

export interface GetPatientData {
  patient?: {
    name: string;
    weight: number;
  };
}

export interface GetPatientVariables {
  id: UUIDString;
}

export interface GetPrescriptionData {
  prescription?: {
    totalKcal: number;
    date: DateString;
  };
}

export interface GetPrescriptionItemData {
  prescriptionItem?: {
    quantity: number;
  };
}

export interface GetPrescriptionItemVariables {
  id: UUIDString;
}

export interface GetPrescriptionVariables {
  id: UUIDString;
}

export interface InsertCidData {
  cid_insert: Cid_Key;
}

export interface InsertFormulaData {
  formula_insert: Formula_Key;
}

export interface InsertPatientData {
  patient_insert: Patient_Key;
}

export interface InsertPatientVariables {
  name: string;
  birthDate: DateString;
  weight: number;
  height: number;
}

export interface ListCidsData {
  cids: ({
    cidCode: string;
    name: string;
  })[];
}

export interface ListFormulasData {
  formulas: ({
    name: string;
    kcal: number;
  })[];
}

export interface ListPatientsData {
  patients: ({
    name: string;
    birthDate: DateString;
  })[];
}

export interface ListPrescriptionItemsData {
  prescriptionItems: ({
    quantity: number;
  })[];
}

export interface ListPrescriptionsData {
  prescriptions: ({
    date: DateString;
    totalKcal: number;
  })[];
}

export interface Patient_Key {
  id: UUIDString;
  __typename?: 'Patient_Key';
}

export interface PrescriptionItem_Key {
  id: UUIDString;
  __typename?: 'PrescriptionItem_Key';
}

export interface Prescription_Key {
  id: UUIDString;
  __typename?: 'Prescription_Key';
}

export interface UpdateCidData {
  cid_update?: Cid_Key | null;
}

export interface UpdateCidVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateFormulaData {
  formula_update?: Formula_Key | null;
}

export interface UpdateFormulaVariables {
  id: UUIDString;
  kcal: number;
}

export interface UpdatePatientData {
  patient_update?: Patient_Key | null;
}

export interface UpdatePatientVariables {
  id: UUIDString;
  weight: number;
}

export interface UpdatePrescriptionData {
  prescription_update?: Prescription_Key | null;
}

export interface UpdatePrescriptionItemData {
  prescriptionItem_update?: PrescriptionItem_Key | null;
}

export interface UpdatePrescriptionItemVariables {
  id: UUIDString;
  quantity: number;
}

export interface UpdatePrescriptionVariables {
  id: UUIDString;
  totalKcal: number;
}

/** Generated Node Admin SDK operation action function for the 'InsertCid' Mutation. Allow users to execute without passing in DataConnect. */
export function insertCid(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertCidData>>;
/** Generated Node Admin SDK operation action function for the 'InsertCid' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertCid(options?: OperationOptions): Promise<ExecuteOperationResponse<InsertCidData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateCid' Mutation. Allow users to execute without passing in DataConnect. */
export function updateCid(dc: DataConnect, vars: UpdateCidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateCidData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateCid' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateCid(vars: UpdateCidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateCidData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteCid' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteCid(dc: DataConnect, vars: DeleteCidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteCidData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteCid' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteCid(vars: DeleteCidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteCidData>>;

/** Generated Node Admin SDK operation action function for the 'GetCid' Query. Allow users to execute without passing in DataConnect. */
export function getCid(dc: DataConnect, vars: GetCidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCidData>>;
/** Generated Node Admin SDK operation action function for the 'GetCid' Query. Allow users to pass in custom DataConnect instances. */
export function getCid(vars: GetCidVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCidData>>;

/** Generated Node Admin SDK operation action function for the 'ListCids' Query. Allow users to execute without passing in DataConnect. */
export function listCids(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListCidsData>>;
/** Generated Node Admin SDK operation action function for the 'ListCids' Query. Allow users to pass in custom DataConnect instances. */
export function listCids(options?: OperationOptions): Promise<ExecuteOperationResponse<ListCidsData>>;

/** Generated Node Admin SDK operation action function for the 'InsertFormula' Mutation. Allow users to execute without passing in DataConnect. */
export function insertFormula(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertFormulaData>>;
/** Generated Node Admin SDK operation action function for the 'InsertFormula' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertFormula(options?: OperationOptions): Promise<ExecuteOperationResponse<InsertFormulaData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateFormula' Mutation. Allow users to execute without passing in DataConnect. */
export function updateFormula(dc: DataConnect, vars: UpdateFormulaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFormulaData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateFormula' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateFormula(vars: UpdateFormulaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateFormulaData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteFormula' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteFormula(dc: DataConnect, vars: DeleteFormulaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFormulaData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteFormula' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteFormula(vars: DeleteFormulaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteFormulaData>>;

/** Generated Node Admin SDK operation action function for the 'GetFormula' Query. Allow users to execute without passing in DataConnect. */
export function getFormula(dc: DataConnect, vars: GetFormulaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFormulaData>>;
/** Generated Node Admin SDK operation action function for the 'GetFormula' Query. Allow users to pass in custom DataConnect instances. */
export function getFormula(vars: GetFormulaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetFormulaData>>;

/** Generated Node Admin SDK operation action function for the 'ListFormulas' Query. Allow users to execute without passing in DataConnect. */
export function listFormulas(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListFormulasData>>;
/** Generated Node Admin SDK operation action function for the 'ListFormulas' Query. Allow users to pass in custom DataConnect instances. */
export function listFormulas(options?: OperationOptions): Promise<ExecuteOperationResponse<ListFormulasData>>;

/** Generated Node Admin SDK operation action function for the 'InsertPatient' Mutation. Allow users to execute without passing in DataConnect. */
export function insertPatient(dc: DataConnect, vars: InsertPatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertPatientData>>;
/** Generated Node Admin SDK operation action function for the 'InsertPatient' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertPatient(vars: InsertPatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertPatientData>>;

/** Generated Node Admin SDK operation action function for the 'UpdatePatient' Mutation. Allow users to execute without passing in DataConnect. */
export function updatePatient(dc: DataConnect, vars: UpdatePatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePatientData>>;
/** Generated Node Admin SDK operation action function for the 'UpdatePatient' Mutation. Allow users to pass in custom DataConnect instances. */
export function updatePatient(vars: UpdatePatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePatientData>>;

/** Generated Node Admin SDK operation action function for the 'DeletePatient' Mutation. Allow users to execute without passing in DataConnect. */
export function deletePatient(dc: DataConnect, vars: DeletePatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePatientData>>;
/** Generated Node Admin SDK operation action function for the 'DeletePatient' Mutation. Allow users to pass in custom DataConnect instances. */
export function deletePatient(vars: DeletePatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePatientData>>;

/** Generated Node Admin SDK operation action function for the 'GetPatient' Query. Allow users to execute without passing in DataConnect. */
export function getPatient(dc: DataConnect, vars: GetPatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPatientData>>;
/** Generated Node Admin SDK operation action function for the 'GetPatient' Query. Allow users to pass in custom DataConnect instances. */
export function getPatient(vars: GetPatientVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPatientData>>;

/** Generated Node Admin SDK operation action function for the 'ListPatients' Query. Allow users to execute without passing in DataConnect. */
export function listPatients(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPatientsData>>;
/** Generated Node Admin SDK operation action function for the 'ListPatients' Query. Allow users to pass in custom DataConnect instances. */
export function listPatients(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPatientsData>>;

/** Generated Node Admin SDK operation action function for the 'CreatePrescription' Mutation. Allow users to execute without passing in DataConnect. */
export function createPrescription(dc: DataConnect, vars: CreatePrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePrescriptionData>>;
/** Generated Node Admin SDK operation action function for the 'CreatePrescription' Mutation. Allow users to pass in custom DataConnect instances. */
export function createPrescription(vars: CreatePrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePrescriptionData>>;

/** Generated Node Admin SDK operation action function for the 'UpdatePrescription' Mutation. Allow users to execute without passing in DataConnect. */
export function updatePrescription(dc: DataConnect, vars: UpdatePrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePrescriptionData>>;
/** Generated Node Admin SDK operation action function for the 'UpdatePrescription' Mutation. Allow users to pass in custom DataConnect instances. */
export function updatePrescription(vars: UpdatePrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePrescriptionData>>;

/** Generated Node Admin SDK operation action function for the 'DeletePrescription' Mutation. Allow users to execute without passing in DataConnect. */
export function deletePrescription(dc: DataConnect, vars: DeletePrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePrescriptionData>>;
/** Generated Node Admin SDK operation action function for the 'DeletePrescription' Mutation. Allow users to pass in custom DataConnect instances. */
export function deletePrescription(vars: DeletePrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePrescriptionData>>;

/** Generated Node Admin SDK operation action function for the 'GetPrescription' Query. Allow users to execute without passing in DataConnect. */
export function getPrescription(dc: DataConnect, vars: GetPrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPrescriptionData>>;
/** Generated Node Admin SDK operation action function for the 'GetPrescription' Query. Allow users to pass in custom DataConnect instances. */
export function getPrescription(vars: GetPrescriptionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPrescriptionData>>;

/** Generated Node Admin SDK operation action function for the 'ListPrescriptions' Query. Allow users to execute without passing in DataConnect. */
export function listPrescriptions(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPrescriptionsData>>;
/** Generated Node Admin SDK operation action function for the 'ListPrescriptions' Query. Allow users to pass in custom DataConnect instances. */
export function listPrescriptions(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPrescriptionsData>>;

/** Generated Node Admin SDK operation action function for the 'CreatePrescriptionItem' Mutation. Allow users to execute without passing in DataConnect. */
export function createPrescriptionItem(dc: DataConnect, vars: CreatePrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePrescriptionItemData>>;
/** Generated Node Admin SDK operation action function for the 'CreatePrescriptionItem' Mutation. Allow users to pass in custom DataConnect instances. */
export function createPrescriptionItem(vars: CreatePrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePrescriptionItemData>>;

/** Generated Node Admin SDK operation action function for the 'UpdatePrescriptionItem' Mutation. Allow users to execute without passing in DataConnect. */
export function updatePrescriptionItem(dc: DataConnect, vars: UpdatePrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePrescriptionItemData>>;
/** Generated Node Admin SDK operation action function for the 'UpdatePrescriptionItem' Mutation. Allow users to pass in custom DataConnect instances. */
export function updatePrescriptionItem(vars: UpdatePrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePrescriptionItemData>>;

/** Generated Node Admin SDK operation action function for the 'DeletePrescriptionItem' Mutation. Allow users to execute without passing in DataConnect. */
export function deletePrescriptionItem(dc: DataConnect, vars: DeletePrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePrescriptionItemData>>;
/** Generated Node Admin SDK operation action function for the 'DeletePrescriptionItem' Mutation. Allow users to pass in custom DataConnect instances. */
export function deletePrescriptionItem(vars: DeletePrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePrescriptionItemData>>;

/** Generated Node Admin SDK operation action function for the 'GetPrescriptionItem' Query. Allow users to execute without passing in DataConnect. */
export function getPrescriptionItem(dc: DataConnect, vars: GetPrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPrescriptionItemData>>;
/** Generated Node Admin SDK operation action function for the 'GetPrescriptionItem' Query. Allow users to pass in custom DataConnect instances. */
export function getPrescriptionItem(vars: GetPrescriptionItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPrescriptionItemData>>;

/** Generated Node Admin SDK operation action function for the 'ListPrescriptionItems' Query. Allow users to execute without passing in DataConnect. */
export function listPrescriptionItems(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPrescriptionItemsData>>;
/** Generated Node Admin SDK operation action function for the 'ListPrescriptionItems' Query. Allow users to pass in custom DataConnect instances. */
export function listPrescriptionItems(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPrescriptionItemsData>>;


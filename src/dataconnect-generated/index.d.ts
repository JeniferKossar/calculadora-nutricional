import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

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

interface InsertCidRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertCidData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertCidData, undefined>;
  operationName: string;
}
export const insertCidRef: InsertCidRef;

export function insertCid(): MutationPromise<InsertCidData, undefined>;
export function insertCid(dc: DataConnect): MutationPromise<InsertCidData, undefined>;

interface UpdateCidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCidVariables): MutationRef<UpdateCidData, UpdateCidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCidVariables): MutationRef<UpdateCidData, UpdateCidVariables>;
  operationName: string;
}
export const updateCidRef: UpdateCidRef;

export function updateCid(vars: UpdateCidVariables): MutationPromise<UpdateCidData, UpdateCidVariables>;
export function updateCid(dc: DataConnect, vars: UpdateCidVariables): MutationPromise<UpdateCidData, UpdateCidVariables>;

interface DeleteCidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCidVariables): MutationRef<DeleteCidData, DeleteCidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCidVariables): MutationRef<DeleteCidData, DeleteCidVariables>;
  operationName: string;
}
export const deleteCidRef: DeleteCidRef;

export function deleteCid(vars: DeleteCidVariables): MutationPromise<DeleteCidData, DeleteCidVariables>;
export function deleteCid(dc: DataConnect, vars: DeleteCidVariables): MutationPromise<DeleteCidData, DeleteCidVariables>;

interface GetCidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCidVariables): QueryRef<GetCidData, GetCidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCidVariables): QueryRef<GetCidData, GetCidVariables>;
  operationName: string;
}
export const getCidRef: GetCidRef;

export function getCid(vars: GetCidVariables, options?: ExecuteQueryOptions): QueryPromise<GetCidData, GetCidVariables>;
export function getCid(dc: DataConnect, vars: GetCidVariables, options?: ExecuteQueryOptions): QueryPromise<GetCidData, GetCidVariables>;

interface ListCidsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCidsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCidsData, undefined>;
  operationName: string;
}
export const listCidsRef: ListCidsRef;

export function listCids(options?: ExecuteQueryOptions): QueryPromise<ListCidsData, undefined>;
export function listCids(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCidsData, undefined>;

interface InsertFormulaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertFormulaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertFormulaData, undefined>;
  operationName: string;
}
export const insertFormulaRef: InsertFormulaRef;

export function insertFormula(): MutationPromise<InsertFormulaData, undefined>;
export function insertFormula(dc: DataConnect): MutationPromise<InsertFormulaData, undefined>;

interface UpdateFormulaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFormulaVariables): MutationRef<UpdateFormulaData, UpdateFormulaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFormulaVariables): MutationRef<UpdateFormulaData, UpdateFormulaVariables>;
  operationName: string;
}
export const updateFormulaRef: UpdateFormulaRef;

export function updateFormula(vars: UpdateFormulaVariables): MutationPromise<UpdateFormulaData, UpdateFormulaVariables>;
export function updateFormula(dc: DataConnect, vars: UpdateFormulaVariables): MutationPromise<UpdateFormulaData, UpdateFormulaVariables>;

interface DeleteFormulaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFormulaVariables): MutationRef<DeleteFormulaData, DeleteFormulaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFormulaVariables): MutationRef<DeleteFormulaData, DeleteFormulaVariables>;
  operationName: string;
}
export const deleteFormulaRef: DeleteFormulaRef;

export function deleteFormula(vars: DeleteFormulaVariables): MutationPromise<DeleteFormulaData, DeleteFormulaVariables>;
export function deleteFormula(dc: DataConnect, vars: DeleteFormulaVariables): MutationPromise<DeleteFormulaData, DeleteFormulaVariables>;

interface GetFormulaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFormulaVariables): QueryRef<GetFormulaData, GetFormulaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFormulaVariables): QueryRef<GetFormulaData, GetFormulaVariables>;
  operationName: string;
}
export const getFormulaRef: GetFormulaRef;

export function getFormula(vars: GetFormulaVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormulaData, GetFormulaVariables>;
export function getFormula(dc: DataConnect, vars: GetFormulaVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormulaData, GetFormulaVariables>;

interface ListFormulasRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFormulasData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFormulasData, undefined>;
  operationName: string;
}
export const listFormulasRef: ListFormulasRef;

export function listFormulas(options?: ExecuteQueryOptions): QueryPromise<ListFormulasData, undefined>;
export function listFormulas(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFormulasData, undefined>;

interface InsertPatientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertPatientVariables): MutationRef<InsertPatientData, InsertPatientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertPatientVariables): MutationRef<InsertPatientData, InsertPatientVariables>;
  operationName: string;
}
export const insertPatientRef: InsertPatientRef;

export function insertPatient(vars: InsertPatientVariables): MutationPromise<InsertPatientData, InsertPatientVariables>;
export function insertPatient(dc: DataConnect, vars: InsertPatientVariables): MutationPromise<InsertPatientData, InsertPatientVariables>;

interface UpdatePatientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePatientVariables): MutationRef<UpdatePatientData, UpdatePatientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePatientVariables): MutationRef<UpdatePatientData, UpdatePatientVariables>;
  operationName: string;
}
export const updatePatientRef: UpdatePatientRef;

export function updatePatient(vars: UpdatePatientVariables): MutationPromise<UpdatePatientData, UpdatePatientVariables>;
export function updatePatient(dc: DataConnect, vars: UpdatePatientVariables): MutationPromise<UpdatePatientData, UpdatePatientVariables>;

interface DeletePatientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePatientVariables): MutationRef<DeletePatientData, DeletePatientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePatientVariables): MutationRef<DeletePatientData, DeletePatientVariables>;
  operationName: string;
}
export const deletePatientRef: DeletePatientRef;

export function deletePatient(vars: DeletePatientVariables): MutationPromise<DeletePatientData, DeletePatientVariables>;
export function deletePatient(dc: DataConnect, vars: DeletePatientVariables): MutationPromise<DeletePatientData, DeletePatientVariables>;

interface GetPatientRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPatientVariables): QueryRef<GetPatientData, GetPatientVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPatientVariables): QueryRef<GetPatientData, GetPatientVariables>;
  operationName: string;
}
export const getPatientRef: GetPatientRef;

export function getPatient(vars: GetPatientVariables, options?: ExecuteQueryOptions): QueryPromise<GetPatientData, GetPatientVariables>;
export function getPatient(dc: DataConnect, vars: GetPatientVariables, options?: ExecuteQueryOptions): QueryPromise<GetPatientData, GetPatientVariables>;

interface ListPatientsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPatientsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPatientsData, undefined>;
  operationName: string;
}
export const listPatientsRef: ListPatientsRef;

export function listPatients(options?: ExecuteQueryOptions): QueryPromise<ListPatientsData, undefined>;
export function listPatients(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPatientsData, undefined>;

interface CreatePrescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePrescriptionVariables): MutationRef<CreatePrescriptionData, CreatePrescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePrescriptionVariables): MutationRef<CreatePrescriptionData, CreatePrescriptionVariables>;
  operationName: string;
}
export const createPrescriptionRef: CreatePrescriptionRef;

export function createPrescription(vars: CreatePrescriptionVariables): MutationPromise<CreatePrescriptionData, CreatePrescriptionVariables>;
export function createPrescription(dc: DataConnect, vars: CreatePrescriptionVariables): MutationPromise<CreatePrescriptionData, CreatePrescriptionVariables>;

interface UpdatePrescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePrescriptionVariables): MutationRef<UpdatePrescriptionData, UpdatePrescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePrescriptionVariables): MutationRef<UpdatePrescriptionData, UpdatePrescriptionVariables>;
  operationName: string;
}
export const updatePrescriptionRef: UpdatePrescriptionRef;

export function updatePrescription(vars: UpdatePrescriptionVariables): MutationPromise<UpdatePrescriptionData, UpdatePrescriptionVariables>;
export function updatePrescription(dc: DataConnect, vars: UpdatePrescriptionVariables): MutationPromise<UpdatePrescriptionData, UpdatePrescriptionVariables>;

interface DeletePrescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrescriptionVariables): MutationRef<DeletePrescriptionData, DeletePrescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePrescriptionVariables): MutationRef<DeletePrescriptionData, DeletePrescriptionVariables>;
  operationName: string;
}
export const deletePrescriptionRef: DeletePrescriptionRef;

export function deletePrescription(vars: DeletePrescriptionVariables): MutationPromise<DeletePrescriptionData, DeletePrescriptionVariables>;
export function deletePrescription(dc: DataConnect, vars: DeletePrescriptionVariables): MutationPromise<DeletePrescriptionData, DeletePrescriptionVariables>;

interface GetPrescriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPrescriptionVariables): QueryRef<GetPrescriptionData, GetPrescriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPrescriptionVariables): QueryRef<GetPrescriptionData, GetPrescriptionVariables>;
  operationName: string;
}
export const getPrescriptionRef: GetPrescriptionRef;

export function getPrescription(vars: GetPrescriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionData, GetPrescriptionVariables>;
export function getPrescription(dc: DataConnect, vars: GetPrescriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionData, GetPrescriptionVariables>;

interface ListPrescriptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPrescriptionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPrescriptionsData, undefined>;
  operationName: string;
}
export const listPrescriptionsRef: ListPrescriptionsRef;

export function listPrescriptions(options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionsData, undefined>;
export function listPrescriptions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionsData, undefined>;

interface CreatePrescriptionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePrescriptionItemVariables): MutationRef<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePrescriptionItemVariables): MutationRef<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;
  operationName: string;
}
export const createPrescriptionItemRef: CreatePrescriptionItemRef;

export function createPrescriptionItem(vars: CreatePrescriptionItemVariables): MutationPromise<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;
export function createPrescriptionItem(dc: DataConnect, vars: CreatePrescriptionItemVariables): MutationPromise<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;

interface UpdatePrescriptionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePrescriptionItemVariables): MutationRef<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePrescriptionItemVariables): MutationRef<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;
  operationName: string;
}
export const updatePrescriptionItemRef: UpdatePrescriptionItemRef;

export function updatePrescriptionItem(vars: UpdatePrescriptionItemVariables): MutationPromise<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;
export function updatePrescriptionItem(dc: DataConnect, vars: UpdatePrescriptionItemVariables): MutationPromise<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;

interface DeletePrescriptionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrescriptionItemVariables): MutationRef<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePrescriptionItemVariables): MutationRef<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;
  operationName: string;
}
export const deletePrescriptionItemRef: DeletePrescriptionItemRef;

export function deletePrescriptionItem(vars: DeletePrescriptionItemVariables): MutationPromise<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;
export function deletePrescriptionItem(dc: DataConnect, vars: DeletePrescriptionItemVariables): MutationPromise<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;

interface GetPrescriptionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPrescriptionItemVariables): QueryRef<GetPrescriptionItemData, GetPrescriptionItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPrescriptionItemVariables): QueryRef<GetPrescriptionItemData, GetPrescriptionItemVariables>;
  operationName: string;
}
export const getPrescriptionItemRef: GetPrescriptionItemRef;

export function getPrescriptionItem(vars: GetPrescriptionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionItemData, GetPrescriptionItemVariables>;
export function getPrescriptionItem(dc: DataConnect, vars: GetPrescriptionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionItemData, GetPrescriptionItemVariables>;

interface ListPrescriptionItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPrescriptionItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPrescriptionItemsData, undefined>;
  operationName: string;
}
export const listPrescriptionItemsRef: ListPrescriptionItemsRef;

export function listPrescriptionItems(options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionItemsData, undefined>;
export function listPrescriptionItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionItemsData, undefined>;


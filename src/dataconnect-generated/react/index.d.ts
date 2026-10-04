import { InsertCidData, UpdateCidData, UpdateCidVariables, DeleteCidData, DeleteCidVariables, GetCidData, GetCidVariables, ListCidsData, InsertFormulaData, UpdateFormulaData, UpdateFormulaVariables, DeleteFormulaData, DeleteFormulaVariables, GetFormulaData, GetFormulaVariables, ListFormulasData, InsertPatientData, InsertPatientVariables, UpdatePatientData, UpdatePatientVariables, DeletePatientData, DeletePatientVariables, GetPatientData, GetPatientVariables, ListPatientsData, CreatePrescriptionData, CreatePrescriptionVariables, UpdatePrescriptionData, UpdatePrescriptionVariables, DeletePrescriptionData, DeletePrescriptionVariables, GetPrescriptionData, GetPrescriptionVariables, ListPrescriptionsData, CreatePrescriptionItemData, CreatePrescriptionItemVariables, UpdatePrescriptionItemData, UpdatePrescriptionItemVariables, DeletePrescriptionItemData, DeletePrescriptionItemVariables, GetPrescriptionItemData, GetPrescriptionItemVariables, ListPrescriptionItemsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useInsertCid(options?: useDataConnectMutationOptions<InsertCidData, FirebaseError, void>): UseDataConnectMutationResult<InsertCidData, undefined>;
export function useInsertCid(dc: DataConnect, options?: useDataConnectMutationOptions<InsertCidData, FirebaseError, void>): UseDataConnectMutationResult<InsertCidData, undefined>;

export function useUpdateCid(options?: useDataConnectMutationOptions<UpdateCidData, FirebaseError, UpdateCidVariables>): UseDataConnectMutationResult<UpdateCidData, UpdateCidVariables>;
export function useUpdateCid(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCidData, FirebaseError, UpdateCidVariables>): UseDataConnectMutationResult<UpdateCidData, UpdateCidVariables>;

export function useDeleteCid(options?: useDataConnectMutationOptions<DeleteCidData, FirebaseError, DeleteCidVariables>): UseDataConnectMutationResult<DeleteCidData, DeleteCidVariables>;
export function useDeleteCid(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCidData, FirebaseError, DeleteCidVariables>): UseDataConnectMutationResult<DeleteCidData, DeleteCidVariables>;

export function useGetCid(vars: GetCidVariables, options?: useDataConnectQueryOptions<GetCidData>): UseDataConnectQueryResult<GetCidData, GetCidVariables>;
export function useGetCid(dc: DataConnect, vars: GetCidVariables, options?: useDataConnectQueryOptions<GetCidData>): UseDataConnectQueryResult<GetCidData, GetCidVariables>;

export function useListCids(options?: useDataConnectQueryOptions<ListCidsData>): UseDataConnectQueryResult<ListCidsData, undefined>;
export function useListCids(dc: DataConnect, options?: useDataConnectQueryOptions<ListCidsData>): UseDataConnectQueryResult<ListCidsData, undefined>;

export function useInsertFormula(options?: useDataConnectMutationOptions<InsertFormulaData, FirebaseError, void>): UseDataConnectMutationResult<InsertFormulaData, undefined>;
export function useInsertFormula(dc: DataConnect, options?: useDataConnectMutationOptions<InsertFormulaData, FirebaseError, void>): UseDataConnectMutationResult<InsertFormulaData, undefined>;

export function useUpdateFormula(options?: useDataConnectMutationOptions<UpdateFormulaData, FirebaseError, UpdateFormulaVariables>): UseDataConnectMutationResult<UpdateFormulaData, UpdateFormulaVariables>;
export function useUpdateFormula(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateFormulaData, FirebaseError, UpdateFormulaVariables>): UseDataConnectMutationResult<UpdateFormulaData, UpdateFormulaVariables>;

export function useDeleteFormula(options?: useDataConnectMutationOptions<DeleteFormulaData, FirebaseError, DeleteFormulaVariables>): UseDataConnectMutationResult<DeleteFormulaData, DeleteFormulaVariables>;
export function useDeleteFormula(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFormulaData, FirebaseError, DeleteFormulaVariables>): UseDataConnectMutationResult<DeleteFormulaData, DeleteFormulaVariables>;

export function useGetFormula(vars: GetFormulaVariables, options?: useDataConnectQueryOptions<GetFormulaData>): UseDataConnectQueryResult<GetFormulaData, GetFormulaVariables>;
export function useGetFormula(dc: DataConnect, vars: GetFormulaVariables, options?: useDataConnectQueryOptions<GetFormulaData>): UseDataConnectQueryResult<GetFormulaData, GetFormulaVariables>;

export function useListFormulas(options?: useDataConnectQueryOptions<ListFormulasData>): UseDataConnectQueryResult<ListFormulasData, undefined>;
export function useListFormulas(dc: DataConnect, options?: useDataConnectQueryOptions<ListFormulasData>): UseDataConnectQueryResult<ListFormulasData, undefined>;

export function useInsertPatient(options?: useDataConnectMutationOptions<InsertPatientData, FirebaseError, InsertPatientVariables>): UseDataConnectMutationResult<InsertPatientData, InsertPatientVariables>;
export function useInsertPatient(dc: DataConnect, options?: useDataConnectMutationOptions<InsertPatientData, FirebaseError, InsertPatientVariables>): UseDataConnectMutationResult<InsertPatientData, InsertPatientVariables>;

export function useUpdatePatient(options?: useDataConnectMutationOptions<UpdatePatientData, FirebaseError, UpdatePatientVariables>): UseDataConnectMutationResult<UpdatePatientData, UpdatePatientVariables>;
export function useUpdatePatient(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePatientData, FirebaseError, UpdatePatientVariables>): UseDataConnectMutationResult<UpdatePatientData, UpdatePatientVariables>;

export function useDeletePatient(options?: useDataConnectMutationOptions<DeletePatientData, FirebaseError, DeletePatientVariables>): UseDataConnectMutationResult<DeletePatientData, DeletePatientVariables>;
export function useDeletePatient(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePatientData, FirebaseError, DeletePatientVariables>): UseDataConnectMutationResult<DeletePatientData, DeletePatientVariables>;

export function useGetPatient(vars: GetPatientVariables, options?: useDataConnectQueryOptions<GetPatientData>): UseDataConnectQueryResult<GetPatientData, GetPatientVariables>;
export function useGetPatient(dc: DataConnect, vars: GetPatientVariables, options?: useDataConnectQueryOptions<GetPatientData>): UseDataConnectQueryResult<GetPatientData, GetPatientVariables>;

export function useListPatients(options?: useDataConnectQueryOptions<ListPatientsData>): UseDataConnectQueryResult<ListPatientsData, undefined>;
export function useListPatients(dc: DataConnect, options?: useDataConnectQueryOptions<ListPatientsData>): UseDataConnectQueryResult<ListPatientsData, undefined>;

export function useCreatePrescription(options?: useDataConnectMutationOptions<CreatePrescriptionData, FirebaseError, CreatePrescriptionVariables>): UseDataConnectMutationResult<CreatePrescriptionData, CreatePrescriptionVariables>;
export function useCreatePrescription(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePrescriptionData, FirebaseError, CreatePrescriptionVariables>): UseDataConnectMutationResult<CreatePrescriptionData, CreatePrescriptionVariables>;

export function useUpdatePrescription(options?: useDataConnectMutationOptions<UpdatePrescriptionData, FirebaseError, UpdatePrescriptionVariables>): UseDataConnectMutationResult<UpdatePrescriptionData, UpdatePrescriptionVariables>;
export function useUpdatePrescription(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePrescriptionData, FirebaseError, UpdatePrescriptionVariables>): UseDataConnectMutationResult<UpdatePrescriptionData, UpdatePrescriptionVariables>;

export function useDeletePrescription(options?: useDataConnectMutationOptions<DeletePrescriptionData, FirebaseError, DeletePrescriptionVariables>): UseDataConnectMutationResult<DeletePrescriptionData, DeletePrescriptionVariables>;
export function useDeletePrescription(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePrescriptionData, FirebaseError, DeletePrescriptionVariables>): UseDataConnectMutationResult<DeletePrescriptionData, DeletePrescriptionVariables>;

export function useGetPrescription(vars: GetPrescriptionVariables, options?: useDataConnectQueryOptions<GetPrescriptionData>): UseDataConnectQueryResult<GetPrescriptionData, GetPrescriptionVariables>;
export function useGetPrescription(dc: DataConnect, vars: GetPrescriptionVariables, options?: useDataConnectQueryOptions<GetPrescriptionData>): UseDataConnectQueryResult<GetPrescriptionData, GetPrescriptionVariables>;

export function useListPrescriptions(options?: useDataConnectQueryOptions<ListPrescriptionsData>): UseDataConnectQueryResult<ListPrescriptionsData, undefined>;
export function useListPrescriptions(dc: DataConnect, options?: useDataConnectQueryOptions<ListPrescriptionsData>): UseDataConnectQueryResult<ListPrescriptionsData, undefined>;

export function useCreatePrescriptionItem(options?: useDataConnectMutationOptions<CreatePrescriptionItemData, FirebaseError, CreatePrescriptionItemVariables>): UseDataConnectMutationResult<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;
export function useCreatePrescriptionItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePrescriptionItemData, FirebaseError, CreatePrescriptionItemVariables>): UseDataConnectMutationResult<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;

export function useUpdatePrescriptionItem(options?: useDataConnectMutationOptions<UpdatePrescriptionItemData, FirebaseError, UpdatePrescriptionItemVariables>): UseDataConnectMutationResult<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;
export function useUpdatePrescriptionItem(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePrescriptionItemData, FirebaseError, UpdatePrescriptionItemVariables>): UseDataConnectMutationResult<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;

export function useDeletePrescriptionItem(options?: useDataConnectMutationOptions<DeletePrescriptionItemData, FirebaseError, DeletePrescriptionItemVariables>): UseDataConnectMutationResult<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;
export function useDeletePrescriptionItem(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePrescriptionItemData, FirebaseError, DeletePrescriptionItemVariables>): UseDataConnectMutationResult<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;

export function useGetPrescriptionItem(vars: GetPrescriptionItemVariables, options?: useDataConnectQueryOptions<GetPrescriptionItemData>): UseDataConnectQueryResult<GetPrescriptionItemData, GetPrescriptionItemVariables>;
export function useGetPrescriptionItem(dc: DataConnect, vars: GetPrescriptionItemVariables, options?: useDataConnectQueryOptions<GetPrescriptionItemData>): UseDataConnectQueryResult<GetPrescriptionItemData, GetPrescriptionItemVariables>;

export function useListPrescriptionItems(options?: useDataConnectQueryOptions<ListPrescriptionItemsData>): UseDataConnectQueryResult<ListPrescriptionItemsData, undefined>;
export function useListPrescriptionItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListPrescriptionItemsData>): UseDataConnectQueryResult<ListPrescriptionItemsData, undefined>;

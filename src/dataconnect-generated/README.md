# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCid*](#getcid)
  - [*ListCids*](#listcids)
  - [*GetFormula*](#getformula)
  - [*ListFormulas*](#listformulas)
  - [*GetPatient*](#getpatient)
  - [*ListPatients*](#listpatients)
  - [*GetPrescription*](#getprescription)
  - [*ListPrescriptions*](#listprescriptions)
  - [*GetPrescriptionItem*](#getprescriptionitem)
  - [*ListPrescriptionItems*](#listprescriptionitems)
- [**Mutations**](#mutations)
  - [*InsertCid*](#insertcid)
  - [*UpdateCid*](#updatecid)
  - [*DeleteCid*](#deletecid)
  - [*InsertFormula*](#insertformula)
  - [*UpdateFormula*](#updateformula)
  - [*DeleteFormula*](#deleteformula)
  - [*InsertPatient*](#insertpatient)
  - [*UpdatePatient*](#updatepatient)
  - [*DeletePatient*](#deletepatient)
  - [*CreatePrescription*](#createprescription)
  - [*UpdatePrescription*](#updateprescription)
  - [*DeletePrescription*](#deleteprescription)
  - [*CreatePrescriptionItem*](#createprescriptionitem)
  - [*UpdatePrescriptionItem*](#updateprescriptionitem)
  - [*DeletePrescriptionItem*](#deleteprescriptionitem)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCid
You can execute the `GetCid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCid(vars: GetCidVariables, options?: ExecuteQueryOptions): QueryPromise<GetCidData, GetCidVariables>;

interface GetCidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCidVariables): QueryRef<GetCidData, GetCidVariables>;
}
export const getCidRef: GetCidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCid(dc: DataConnect, vars: GetCidVariables, options?: ExecuteQueryOptions): QueryPromise<GetCidData, GetCidVariables>;

interface GetCidRef {
  ...
  (dc: DataConnect, vars: GetCidVariables): QueryRef<GetCidData, GetCidVariables>;
}
export const getCidRef: GetCidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCidRef:
```typescript
const name = getCidRef.operationName;
console.log(name);
```

### Variables
The `GetCid` query requires an argument of type `GetCidVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCidVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCidData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCidData {
  cid?: {
    cidCode: string;
    name: string;
  };
}
```
### Using `GetCid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCid, GetCidVariables } from '@dataconnect/generated';

// The `GetCid` query requires an argument of type `GetCidVariables`:
const getCidVars: GetCidVariables = {
  id: ..., 
};

// Call the `getCid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCid(getCidVars);
// Variables can be defined inline as well.
const { data } = await getCid({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCid(dataConnect, getCidVars);

console.log(data.cid);

// Or, you can use the `Promise` API.
getCid(getCidVars).then((response) => {
  const data = response.data;
  console.log(data.cid);
});
```

### Using `GetCid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCidRef, GetCidVariables } from '@dataconnect/generated';

// The `GetCid` query requires an argument of type `GetCidVariables`:
const getCidVars: GetCidVariables = {
  id: ..., 
};

// Call the `getCidRef()` function to get a reference to the query.
const ref = getCidRef(getCidVars);
// Variables can be defined inline as well.
const ref = getCidRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCidRef(dataConnect, getCidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.cid);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.cid);
});
```

## ListCids
You can execute the `ListCids` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCids(options?: ExecuteQueryOptions): QueryPromise<ListCidsData, undefined>;

interface ListCidsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCidsData, undefined>;
}
export const listCidsRef: ListCidsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCids(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCidsData, undefined>;

interface ListCidsRef {
  ...
  (dc: DataConnect): QueryRef<ListCidsData, undefined>;
}
export const listCidsRef: ListCidsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCidsRef:
```typescript
const name = listCidsRef.operationName;
console.log(name);
```

### Variables
The `ListCids` query has no variables.
### Return Type
Recall that executing the `ListCids` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCidsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCidsData {
  cids: ({
    cidCode: string;
    name: string;
  })[];
}
```
### Using `ListCids`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCids } from '@dataconnect/generated';


// Call the `listCids()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCids();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCids(dataConnect);

console.log(data.cids);

// Or, you can use the `Promise` API.
listCids().then((response) => {
  const data = response.data;
  console.log(data.cids);
});
```

### Using `ListCids`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCidsRef } from '@dataconnect/generated';


// Call the `listCidsRef()` function to get a reference to the query.
const ref = listCidsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCidsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.cids);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.cids);
});
```

## GetFormula
You can execute the `GetFormula` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFormula(vars: GetFormulaVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormulaData, GetFormulaVariables>;

interface GetFormulaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFormulaVariables): QueryRef<GetFormulaData, GetFormulaVariables>;
}
export const getFormulaRef: GetFormulaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFormula(dc: DataConnect, vars: GetFormulaVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormulaData, GetFormulaVariables>;

interface GetFormulaRef {
  ...
  (dc: DataConnect, vars: GetFormulaVariables): QueryRef<GetFormulaData, GetFormulaVariables>;
}
export const getFormulaRef: GetFormulaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFormulaRef:
```typescript
const name = getFormulaRef.operationName;
console.log(name);
```

### Variables
The `GetFormula` query requires an argument of type `GetFormulaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFormulaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFormula` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFormulaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFormulaData {
  formula?: {
    name: string;
    kcal: number;
  };
}
```
### Using `GetFormula`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFormula, GetFormulaVariables } from '@dataconnect/generated';

// The `GetFormula` query requires an argument of type `GetFormulaVariables`:
const getFormulaVars: GetFormulaVariables = {
  id: ..., 
};

// Call the `getFormula()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFormula(getFormulaVars);
// Variables can be defined inline as well.
const { data } = await getFormula({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFormula(dataConnect, getFormulaVars);

console.log(data.formula);

// Or, you can use the `Promise` API.
getFormula(getFormulaVars).then((response) => {
  const data = response.data;
  console.log(data.formula);
});
```

### Using `GetFormula`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFormulaRef, GetFormulaVariables } from '@dataconnect/generated';

// The `GetFormula` query requires an argument of type `GetFormulaVariables`:
const getFormulaVars: GetFormulaVariables = {
  id: ..., 
};

// Call the `getFormulaRef()` function to get a reference to the query.
const ref = getFormulaRef(getFormulaVars);
// Variables can be defined inline as well.
const ref = getFormulaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFormulaRef(dataConnect, getFormulaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.formula);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.formula);
});
```

## ListFormulas
You can execute the `ListFormulas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFormulas(options?: ExecuteQueryOptions): QueryPromise<ListFormulasData, undefined>;

interface ListFormulasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFormulasData, undefined>;
}
export const listFormulasRef: ListFormulasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFormulas(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFormulasData, undefined>;

interface ListFormulasRef {
  ...
  (dc: DataConnect): QueryRef<ListFormulasData, undefined>;
}
export const listFormulasRef: ListFormulasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFormulasRef:
```typescript
const name = listFormulasRef.operationName;
console.log(name);
```

### Variables
The `ListFormulas` query has no variables.
### Return Type
Recall that executing the `ListFormulas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFormulasData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFormulasData {
  formulas: ({
    name: string;
    kcal: number;
  })[];
}
```
### Using `ListFormulas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFormulas } from '@dataconnect/generated';


// Call the `listFormulas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFormulas();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFormulas(dataConnect);

console.log(data.formulas);

// Or, you can use the `Promise` API.
listFormulas().then((response) => {
  const data = response.data;
  console.log(data.formulas);
});
```

### Using `ListFormulas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFormulasRef } from '@dataconnect/generated';


// Call the `listFormulasRef()` function to get a reference to the query.
const ref = listFormulasRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFormulasRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.formulas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.formulas);
});
```

## GetPatient
You can execute the `GetPatient` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPatient(vars: GetPatientVariables, options?: ExecuteQueryOptions): QueryPromise<GetPatientData, GetPatientVariables>;

interface GetPatientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPatientVariables): QueryRef<GetPatientData, GetPatientVariables>;
}
export const getPatientRef: GetPatientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPatient(dc: DataConnect, vars: GetPatientVariables, options?: ExecuteQueryOptions): QueryPromise<GetPatientData, GetPatientVariables>;

interface GetPatientRef {
  ...
  (dc: DataConnect, vars: GetPatientVariables): QueryRef<GetPatientData, GetPatientVariables>;
}
export const getPatientRef: GetPatientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPatientRef:
```typescript
const name = getPatientRef.operationName;
console.log(name);
```

### Variables
The `GetPatient` query requires an argument of type `GetPatientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPatientVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPatient` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPatientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPatientData {
  patient?: {
    name: string;
    weight: number;
  };
}
```
### Using `GetPatient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPatient, GetPatientVariables } from '@dataconnect/generated';

// The `GetPatient` query requires an argument of type `GetPatientVariables`:
const getPatientVars: GetPatientVariables = {
  id: ..., 
};

// Call the `getPatient()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPatient(getPatientVars);
// Variables can be defined inline as well.
const { data } = await getPatient({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPatient(dataConnect, getPatientVars);

console.log(data.patient);

// Or, you can use the `Promise` API.
getPatient(getPatientVars).then((response) => {
  const data = response.data;
  console.log(data.patient);
});
```

### Using `GetPatient`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPatientRef, GetPatientVariables } from '@dataconnect/generated';

// The `GetPatient` query requires an argument of type `GetPatientVariables`:
const getPatientVars: GetPatientVariables = {
  id: ..., 
};

// Call the `getPatientRef()` function to get a reference to the query.
const ref = getPatientRef(getPatientVars);
// Variables can be defined inline as well.
const ref = getPatientRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPatientRef(dataConnect, getPatientVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.patient);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.patient);
});
```

## ListPatients
You can execute the `ListPatients` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPatients(options?: ExecuteQueryOptions): QueryPromise<ListPatientsData, undefined>;

interface ListPatientsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPatientsData, undefined>;
}
export const listPatientsRef: ListPatientsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPatients(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPatientsData, undefined>;

interface ListPatientsRef {
  ...
  (dc: DataConnect): QueryRef<ListPatientsData, undefined>;
}
export const listPatientsRef: ListPatientsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPatientsRef:
```typescript
const name = listPatientsRef.operationName;
console.log(name);
```

### Variables
The `ListPatients` query has no variables.
### Return Type
Recall that executing the `ListPatients` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPatientsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPatientsData {
  patients: ({
    name: string;
    birthDate: DateString;
  })[];
}
```
### Using `ListPatients`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPatients } from '@dataconnect/generated';


// Call the `listPatients()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPatients();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPatients(dataConnect);

console.log(data.patients);

// Or, you can use the `Promise` API.
listPatients().then((response) => {
  const data = response.data;
  console.log(data.patients);
});
```

### Using `ListPatients`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPatientsRef } from '@dataconnect/generated';


// Call the `listPatientsRef()` function to get a reference to the query.
const ref = listPatientsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPatientsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.patients);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.patients);
});
```

## GetPrescription
You can execute the `GetPrescription` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPrescription(vars: GetPrescriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionData, GetPrescriptionVariables>;

interface GetPrescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPrescriptionVariables): QueryRef<GetPrescriptionData, GetPrescriptionVariables>;
}
export const getPrescriptionRef: GetPrescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPrescription(dc: DataConnect, vars: GetPrescriptionVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionData, GetPrescriptionVariables>;

interface GetPrescriptionRef {
  ...
  (dc: DataConnect, vars: GetPrescriptionVariables): QueryRef<GetPrescriptionData, GetPrescriptionVariables>;
}
export const getPrescriptionRef: GetPrescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPrescriptionRef:
```typescript
const name = getPrescriptionRef.operationName;
console.log(name);
```

### Variables
The `GetPrescription` query requires an argument of type `GetPrescriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPrescriptionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPrescription` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPrescriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPrescriptionData {
  prescription?: {
    totalKcal: number;
    date: DateString;
  };
}
```
### Using `GetPrescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPrescription, GetPrescriptionVariables } from '@dataconnect/generated';

// The `GetPrescription` query requires an argument of type `GetPrescriptionVariables`:
const getPrescriptionVars: GetPrescriptionVariables = {
  id: ..., 
};

// Call the `getPrescription()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPrescription(getPrescriptionVars);
// Variables can be defined inline as well.
const { data } = await getPrescription({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPrescription(dataConnect, getPrescriptionVars);

console.log(data.prescription);

// Or, you can use the `Promise` API.
getPrescription(getPrescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.prescription);
});
```

### Using `GetPrescription`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPrescriptionRef, GetPrescriptionVariables } from '@dataconnect/generated';

// The `GetPrescription` query requires an argument of type `GetPrescriptionVariables`:
const getPrescriptionVars: GetPrescriptionVariables = {
  id: ..., 
};

// Call the `getPrescriptionRef()` function to get a reference to the query.
const ref = getPrescriptionRef(getPrescriptionVars);
// Variables can be defined inline as well.
const ref = getPrescriptionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPrescriptionRef(dataConnect, getPrescriptionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.prescription);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.prescription);
});
```

## ListPrescriptions
You can execute the `ListPrescriptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPrescriptions(options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionsData, undefined>;

interface ListPrescriptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPrescriptionsData, undefined>;
}
export const listPrescriptionsRef: ListPrescriptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPrescriptions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionsData, undefined>;

interface ListPrescriptionsRef {
  ...
  (dc: DataConnect): QueryRef<ListPrescriptionsData, undefined>;
}
export const listPrescriptionsRef: ListPrescriptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPrescriptionsRef:
```typescript
const name = listPrescriptionsRef.operationName;
console.log(name);
```

### Variables
The `ListPrescriptions` query has no variables.
### Return Type
Recall that executing the `ListPrescriptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPrescriptionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPrescriptionsData {
  prescriptions: ({
    date: DateString;
    totalKcal: number;
  })[];
}
```
### Using `ListPrescriptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPrescriptions } from '@dataconnect/generated';


// Call the `listPrescriptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPrescriptions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPrescriptions(dataConnect);

console.log(data.prescriptions);

// Or, you can use the `Promise` API.
listPrescriptions().then((response) => {
  const data = response.data;
  console.log(data.prescriptions);
});
```

### Using `ListPrescriptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPrescriptionsRef } from '@dataconnect/generated';


// Call the `listPrescriptionsRef()` function to get a reference to the query.
const ref = listPrescriptionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPrescriptionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.prescriptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptions);
});
```

## GetPrescriptionItem
You can execute the `GetPrescriptionItem` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPrescriptionItem(vars: GetPrescriptionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionItemData, GetPrescriptionItemVariables>;

interface GetPrescriptionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPrescriptionItemVariables): QueryRef<GetPrescriptionItemData, GetPrescriptionItemVariables>;
}
export const getPrescriptionItemRef: GetPrescriptionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPrescriptionItem(dc: DataConnect, vars: GetPrescriptionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetPrescriptionItemData, GetPrescriptionItemVariables>;

interface GetPrescriptionItemRef {
  ...
  (dc: DataConnect, vars: GetPrescriptionItemVariables): QueryRef<GetPrescriptionItemData, GetPrescriptionItemVariables>;
}
export const getPrescriptionItemRef: GetPrescriptionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPrescriptionItemRef:
```typescript
const name = getPrescriptionItemRef.operationName;
console.log(name);
```

### Variables
The `GetPrescriptionItem` query requires an argument of type `GetPrescriptionItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPrescriptionItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPrescriptionItem` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPrescriptionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPrescriptionItemData {
  prescriptionItem?: {
    quantity: number;
  };
}
```
### Using `GetPrescriptionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPrescriptionItem, GetPrescriptionItemVariables } from '@dataconnect/generated';

// The `GetPrescriptionItem` query requires an argument of type `GetPrescriptionItemVariables`:
const getPrescriptionItemVars: GetPrescriptionItemVariables = {
  id: ..., 
};

// Call the `getPrescriptionItem()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPrescriptionItem(getPrescriptionItemVars);
// Variables can be defined inline as well.
const { data } = await getPrescriptionItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPrescriptionItem(dataConnect, getPrescriptionItemVars);

console.log(data.prescriptionItem);

// Or, you can use the `Promise` API.
getPrescriptionItem(getPrescriptionItemVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem);
});
```

### Using `GetPrescriptionItem`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPrescriptionItemRef, GetPrescriptionItemVariables } from '@dataconnect/generated';

// The `GetPrescriptionItem` query requires an argument of type `GetPrescriptionItemVariables`:
const getPrescriptionItemVars: GetPrescriptionItemVariables = {
  id: ..., 
};

// Call the `getPrescriptionItemRef()` function to get a reference to the query.
const ref = getPrescriptionItemRef(getPrescriptionItemVars);
// Variables can be defined inline as well.
const ref = getPrescriptionItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPrescriptionItemRef(dataConnect, getPrescriptionItemVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.prescriptionItem);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem);
});
```

## ListPrescriptionItems
You can execute the `ListPrescriptionItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPrescriptionItems(options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionItemsData, undefined>;

interface ListPrescriptionItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPrescriptionItemsData, undefined>;
}
export const listPrescriptionItemsRef: ListPrescriptionItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPrescriptionItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPrescriptionItemsData, undefined>;

interface ListPrescriptionItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListPrescriptionItemsData, undefined>;
}
export const listPrescriptionItemsRef: ListPrescriptionItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPrescriptionItemsRef:
```typescript
const name = listPrescriptionItemsRef.operationName;
console.log(name);
```

### Variables
The `ListPrescriptionItems` query has no variables.
### Return Type
Recall that executing the `ListPrescriptionItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPrescriptionItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPrescriptionItemsData {
  prescriptionItems: ({
    quantity: number;
  })[];
}
```
### Using `ListPrescriptionItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPrescriptionItems } from '@dataconnect/generated';


// Call the `listPrescriptionItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPrescriptionItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPrescriptionItems(dataConnect);

console.log(data.prescriptionItems);

// Or, you can use the `Promise` API.
listPrescriptionItems().then((response) => {
  const data = response.data;
  console.log(data.prescriptionItems);
});
```

### Using `ListPrescriptionItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPrescriptionItemsRef } from '@dataconnect/generated';


// Call the `listPrescriptionItemsRef()` function to get a reference to the query.
const ref = listPrescriptionItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPrescriptionItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.prescriptionItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItems);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## InsertCid
You can execute the `InsertCid` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertCid(): MutationPromise<InsertCidData, undefined>;

interface InsertCidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertCidData, undefined>;
}
export const insertCidRef: InsertCidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertCid(dc: DataConnect): MutationPromise<InsertCidData, undefined>;

interface InsertCidRef {
  ...
  (dc: DataConnect): MutationRef<InsertCidData, undefined>;
}
export const insertCidRef: InsertCidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertCidRef:
```typescript
const name = insertCidRef.operationName;
console.log(name);
```

### Variables
The `InsertCid` mutation has no variables.
### Return Type
Recall that executing the `InsertCid` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertCidData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertCidData {
  cid_insert: Cid_Key;
}
```
### Using `InsertCid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertCid } from '@dataconnect/generated';


// Call the `insertCid()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertCid();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertCid(dataConnect);

console.log(data.cid_insert);

// Or, you can use the `Promise` API.
insertCid().then((response) => {
  const data = response.data;
  console.log(data.cid_insert);
});
```

### Using `InsertCid`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertCidRef } from '@dataconnect/generated';


// Call the `insertCidRef()` function to get a reference to the mutation.
const ref = insertCidRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertCidRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cid_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cid_insert);
});
```

## UpdateCid
You can execute the `UpdateCid` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCid(vars: UpdateCidVariables): MutationPromise<UpdateCidData, UpdateCidVariables>;

interface UpdateCidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCidVariables): MutationRef<UpdateCidData, UpdateCidVariables>;
}
export const updateCidRef: UpdateCidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCid(dc: DataConnect, vars: UpdateCidVariables): MutationPromise<UpdateCidData, UpdateCidVariables>;

interface UpdateCidRef {
  ...
  (dc: DataConnect, vars: UpdateCidVariables): MutationRef<UpdateCidData, UpdateCidVariables>;
}
export const updateCidRef: UpdateCidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCidRef:
```typescript
const name = updateCidRef.operationName;
console.log(name);
```

### Variables
The `UpdateCid` mutation requires an argument of type `UpdateCidVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCidVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateCid` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCidData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCidData {
  cid_update?: Cid_Key | null;
}
```
### Using `UpdateCid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCid, UpdateCidVariables } from '@dataconnect/generated';

// The `UpdateCid` mutation requires an argument of type `UpdateCidVariables`:
const updateCidVars: UpdateCidVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateCid()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCid(updateCidVars);
// Variables can be defined inline as well.
const { data } = await updateCid({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCid(dataConnect, updateCidVars);

console.log(data.cid_update);

// Or, you can use the `Promise` API.
updateCid(updateCidVars).then((response) => {
  const data = response.data;
  console.log(data.cid_update);
});
```

### Using `UpdateCid`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCidRef, UpdateCidVariables } from '@dataconnect/generated';

// The `UpdateCid` mutation requires an argument of type `UpdateCidVariables`:
const updateCidVars: UpdateCidVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateCidRef()` function to get a reference to the mutation.
const ref = updateCidRef(updateCidVars);
// Variables can be defined inline as well.
const ref = updateCidRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCidRef(dataConnect, updateCidVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cid_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cid_update);
});
```

## DeleteCid
You can execute the `DeleteCid` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCid(vars: DeleteCidVariables): MutationPromise<DeleteCidData, DeleteCidVariables>;

interface DeleteCidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCidVariables): MutationRef<DeleteCidData, DeleteCidVariables>;
}
export const deleteCidRef: DeleteCidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCid(dc: DataConnect, vars: DeleteCidVariables): MutationPromise<DeleteCidData, DeleteCidVariables>;

interface DeleteCidRef {
  ...
  (dc: DataConnect, vars: DeleteCidVariables): MutationRef<DeleteCidData, DeleteCidVariables>;
}
export const deleteCidRef: DeleteCidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCidRef:
```typescript
const name = deleteCidRef.operationName;
console.log(name);
```

### Variables
The `DeleteCid` mutation requires an argument of type `DeleteCidVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCidVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCid` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCidData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCidData {
  cid_delete?: Cid_Key | null;
}
```
### Using `DeleteCid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCid, DeleteCidVariables } from '@dataconnect/generated';

// The `DeleteCid` mutation requires an argument of type `DeleteCidVariables`:
const deleteCidVars: DeleteCidVariables = {
  id: ..., 
};

// Call the `deleteCid()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCid(deleteCidVars);
// Variables can be defined inline as well.
const { data } = await deleteCid({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCid(dataConnect, deleteCidVars);

console.log(data.cid_delete);

// Or, you can use the `Promise` API.
deleteCid(deleteCidVars).then((response) => {
  const data = response.data;
  console.log(data.cid_delete);
});
```

### Using `DeleteCid`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCidRef, DeleteCidVariables } from '@dataconnect/generated';

// The `DeleteCid` mutation requires an argument of type `DeleteCidVariables`:
const deleteCidVars: DeleteCidVariables = {
  id: ..., 
};

// Call the `deleteCidRef()` function to get a reference to the mutation.
const ref = deleteCidRef(deleteCidVars);
// Variables can be defined inline as well.
const ref = deleteCidRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCidRef(dataConnect, deleteCidVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cid_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cid_delete);
});
```

## InsertFormula
You can execute the `InsertFormula` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertFormula(): MutationPromise<InsertFormulaData, undefined>;

interface InsertFormulaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertFormulaData, undefined>;
}
export const insertFormulaRef: InsertFormulaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertFormula(dc: DataConnect): MutationPromise<InsertFormulaData, undefined>;

interface InsertFormulaRef {
  ...
  (dc: DataConnect): MutationRef<InsertFormulaData, undefined>;
}
export const insertFormulaRef: InsertFormulaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertFormulaRef:
```typescript
const name = insertFormulaRef.operationName;
console.log(name);
```

### Variables
The `InsertFormula` mutation has no variables.
### Return Type
Recall that executing the `InsertFormula` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertFormulaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertFormulaData {
  formula_insert: Formula_Key;
}
```
### Using `InsertFormula`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertFormula } from '@dataconnect/generated';


// Call the `insertFormula()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertFormula();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertFormula(dataConnect);

console.log(data.formula_insert);

// Or, you can use the `Promise` API.
insertFormula().then((response) => {
  const data = response.data;
  console.log(data.formula_insert);
});
```

### Using `InsertFormula`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertFormulaRef } from '@dataconnect/generated';


// Call the `insertFormulaRef()` function to get a reference to the mutation.
const ref = insertFormulaRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertFormulaRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formula_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formula_insert);
});
```

## UpdateFormula
You can execute the `UpdateFormula` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateFormula(vars: UpdateFormulaVariables): MutationPromise<UpdateFormulaData, UpdateFormulaVariables>;

interface UpdateFormulaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFormulaVariables): MutationRef<UpdateFormulaData, UpdateFormulaVariables>;
}
export const updateFormulaRef: UpdateFormulaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFormula(dc: DataConnect, vars: UpdateFormulaVariables): MutationPromise<UpdateFormulaData, UpdateFormulaVariables>;

interface UpdateFormulaRef {
  ...
  (dc: DataConnect, vars: UpdateFormulaVariables): MutationRef<UpdateFormulaData, UpdateFormulaVariables>;
}
export const updateFormulaRef: UpdateFormulaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFormulaRef:
```typescript
const name = updateFormulaRef.operationName;
console.log(name);
```

### Variables
The `UpdateFormula` mutation requires an argument of type `UpdateFormulaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFormulaVariables {
  id: UUIDString;
  kcal: number;
}
```
### Return Type
Recall that executing the `UpdateFormula` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFormulaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFormulaData {
  formula_update?: Formula_Key | null;
}
```
### Using `UpdateFormula`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFormula, UpdateFormulaVariables } from '@dataconnect/generated';

// The `UpdateFormula` mutation requires an argument of type `UpdateFormulaVariables`:
const updateFormulaVars: UpdateFormulaVariables = {
  id: ..., 
  kcal: ..., 
};

// Call the `updateFormula()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFormula(updateFormulaVars);
// Variables can be defined inline as well.
const { data } = await updateFormula({ id: ..., kcal: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFormula(dataConnect, updateFormulaVars);

console.log(data.formula_update);

// Or, you can use the `Promise` API.
updateFormula(updateFormulaVars).then((response) => {
  const data = response.data;
  console.log(data.formula_update);
});
```

### Using `UpdateFormula`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFormulaRef, UpdateFormulaVariables } from '@dataconnect/generated';

// The `UpdateFormula` mutation requires an argument of type `UpdateFormulaVariables`:
const updateFormulaVars: UpdateFormulaVariables = {
  id: ..., 
  kcal: ..., 
};

// Call the `updateFormulaRef()` function to get a reference to the mutation.
const ref = updateFormulaRef(updateFormulaVars);
// Variables can be defined inline as well.
const ref = updateFormulaRef({ id: ..., kcal: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFormulaRef(dataConnect, updateFormulaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formula_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formula_update);
});
```

## DeleteFormula
You can execute the `DeleteFormula` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteFormula(vars: DeleteFormulaVariables): MutationPromise<DeleteFormulaData, DeleteFormulaVariables>;

interface DeleteFormulaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFormulaVariables): MutationRef<DeleteFormulaData, DeleteFormulaVariables>;
}
export const deleteFormulaRef: DeleteFormulaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFormula(dc: DataConnect, vars: DeleteFormulaVariables): MutationPromise<DeleteFormulaData, DeleteFormulaVariables>;

interface DeleteFormulaRef {
  ...
  (dc: DataConnect, vars: DeleteFormulaVariables): MutationRef<DeleteFormulaData, DeleteFormulaVariables>;
}
export const deleteFormulaRef: DeleteFormulaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFormulaRef:
```typescript
const name = deleteFormulaRef.operationName;
console.log(name);
```

### Variables
The `DeleteFormula` mutation requires an argument of type `DeleteFormulaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFormulaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFormula` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFormulaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFormulaData {
  formula_delete?: Formula_Key | null;
}
```
### Using `DeleteFormula`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFormula, DeleteFormulaVariables } from '@dataconnect/generated';

// The `DeleteFormula` mutation requires an argument of type `DeleteFormulaVariables`:
const deleteFormulaVars: DeleteFormulaVariables = {
  id: ..., 
};

// Call the `deleteFormula()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFormula(deleteFormulaVars);
// Variables can be defined inline as well.
const { data } = await deleteFormula({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFormula(dataConnect, deleteFormulaVars);

console.log(data.formula_delete);

// Or, you can use the `Promise` API.
deleteFormula(deleteFormulaVars).then((response) => {
  const data = response.data;
  console.log(data.formula_delete);
});
```

### Using `DeleteFormula`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFormulaRef, DeleteFormulaVariables } from '@dataconnect/generated';

// The `DeleteFormula` mutation requires an argument of type `DeleteFormulaVariables`:
const deleteFormulaVars: DeleteFormulaVariables = {
  id: ..., 
};

// Call the `deleteFormulaRef()` function to get a reference to the mutation.
const ref = deleteFormulaRef(deleteFormulaVars);
// Variables can be defined inline as well.
const ref = deleteFormulaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFormulaRef(dataConnect, deleteFormulaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formula_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formula_delete);
});
```

## InsertPatient
You can execute the `InsertPatient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertPatient(vars: InsertPatientVariables): MutationPromise<InsertPatientData, InsertPatientVariables>;

interface InsertPatientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertPatientVariables): MutationRef<InsertPatientData, InsertPatientVariables>;
}
export const insertPatientRef: InsertPatientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertPatient(dc: DataConnect, vars: InsertPatientVariables): MutationPromise<InsertPatientData, InsertPatientVariables>;

interface InsertPatientRef {
  ...
  (dc: DataConnect, vars: InsertPatientVariables): MutationRef<InsertPatientData, InsertPatientVariables>;
}
export const insertPatientRef: InsertPatientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertPatientRef:
```typescript
const name = insertPatientRef.operationName;
console.log(name);
```

### Variables
The `InsertPatient` mutation requires an argument of type `InsertPatientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertPatientVariables {
  name: string;
  birthDate: DateString;
  weight: number;
  height: number;
}
```
### Return Type
Recall that executing the `InsertPatient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertPatientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertPatientData {
  patient_insert: Patient_Key;
}
```
### Using `InsertPatient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertPatient, InsertPatientVariables } from '@dataconnect/generated';

// The `InsertPatient` mutation requires an argument of type `InsertPatientVariables`:
const insertPatientVars: InsertPatientVariables = {
  name: ..., 
  birthDate: ..., 
  weight: ..., 
  height: ..., 
};

// Call the `insertPatient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertPatient(insertPatientVars);
// Variables can be defined inline as well.
const { data } = await insertPatient({ name: ..., birthDate: ..., weight: ..., height: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertPatient(dataConnect, insertPatientVars);

console.log(data.patient_insert);

// Or, you can use the `Promise` API.
insertPatient(insertPatientVars).then((response) => {
  const data = response.data;
  console.log(data.patient_insert);
});
```

### Using `InsertPatient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertPatientRef, InsertPatientVariables } from '@dataconnect/generated';

// The `InsertPatient` mutation requires an argument of type `InsertPatientVariables`:
const insertPatientVars: InsertPatientVariables = {
  name: ..., 
  birthDate: ..., 
  weight: ..., 
  height: ..., 
};

// Call the `insertPatientRef()` function to get a reference to the mutation.
const ref = insertPatientRef(insertPatientVars);
// Variables can be defined inline as well.
const ref = insertPatientRef({ name: ..., birthDate: ..., weight: ..., height: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertPatientRef(dataConnect, insertPatientVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patient_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patient_insert);
});
```

## UpdatePatient
You can execute the `UpdatePatient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePatient(vars: UpdatePatientVariables): MutationPromise<UpdatePatientData, UpdatePatientVariables>;

interface UpdatePatientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePatientVariables): MutationRef<UpdatePatientData, UpdatePatientVariables>;
}
export const updatePatientRef: UpdatePatientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePatient(dc: DataConnect, vars: UpdatePatientVariables): MutationPromise<UpdatePatientData, UpdatePatientVariables>;

interface UpdatePatientRef {
  ...
  (dc: DataConnect, vars: UpdatePatientVariables): MutationRef<UpdatePatientData, UpdatePatientVariables>;
}
export const updatePatientRef: UpdatePatientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePatientRef:
```typescript
const name = updatePatientRef.operationName;
console.log(name);
```

### Variables
The `UpdatePatient` mutation requires an argument of type `UpdatePatientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePatientVariables {
  id: UUIDString;
  weight: number;
}
```
### Return Type
Recall that executing the `UpdatePatient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePatientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePatientData {
  patient_update?: Patient_Key | null;
}
```
### Using `UpdatePatient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePatient, UpdatePatientVariables } from '@dataconnect/generated';

// The `UpdatePatient` mutation requires an argument of type `UpdatePatientVariables`:
const updatePatientVars: UpdatePatientVariables = {
  id: ..., 
  weight: ..., 
};

// Call the `updatePatient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePatient(updatePatientVars);
// Variables can be defined inline as well.
const { data } = await updatePatient({ id: ..., weight: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePatient(dataConnect, updatePatientVars);

console.log(data.patient_update);

// Or, you can use the `Promise` API.
updatePatient(updatePatientVars).then((response) => {
  const data = response.data;
  console.log(data.patient_update);
});
```

### Using `UpdatePatient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePatientRef, UpdatePatientVariables } from '@dataconnect/generated';

// The `UpdatePatient` mutation requires an argument of type `UpdatePatientVariables`:
const updatePatientVars: UpdatePatientVariables = {
  id: ..., 
  weight: ..., 
};

// Call the `updatePatientRef()` function to get a reference to the mutation.
const ref = updatePatientRef(updatePatientVars);
// Variables can be defined inline as well.
const ref = updatePatientRef({ id: ..., weight: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePatientRef(dataConnect, updatePatientVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patient_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patient_update);
});
```

## DeletePatient
You can execute the `DeletePatient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePatient(vars: DeletePatientVariables): MutationPromise<DeletePatientData, DeletePatientVariables>;

interface DeletePatientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePatientVariables): MutationRef<DeletePatientData, DeletePatientVariables>;
}
export const deletePatientRef: DeletePatientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePatient(dc: DataConnect, vars: DeletePatientVariables): MutationPromise<DeletePatientData, DeletePatientVariables>;

interface DeletePatientRef {
  ...
  (dc: DataConnect, vars: DeletePatientVariables): MutationRef<DeletePatientData, DeletePatientVariables>;
}
export const deletePatientRef: DeletePatientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePatientRef:
```typescript
const name = deletePatientRef.operationName;
console.log(name);
```

### Variables
The `DeletePatient` mutation requires an argument of type `DeletePatientVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePatientVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePatient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePatientData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePatientData {
  patient_delete?: Patient_Key | null;
}
```
### Using `DeletePatient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePatient, DeletePatientVariables } from '@dataconnect/generated';

// The `DeletePatient` mutation requires an argument of type `DeletePatientVariables`:
const deletePatientVars: DeletePatientVariables = {
  id: ..., 
};

// Call the `deletePatient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePatient(deletePatientVars);
// Variables can be defined inline as well.
const { data } = await deletePatient({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePatient(dataConnect, deletePatientVars);

console.log(data.patient_delete);

// Or, you can use the `Promise` API.
deletePatient(deletePatientVars).then((response) => {
  const data = response.data;
  console.log(data.patient_delete);
});
```

### Using `DeletePatient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePatientRef, DeletePatientVariables } from '@dataconnect/generated';

// The `DeletePatient` mutation requires an argument of type `DeletePatientVariables`:
const deletePatientVars: DeletePatientVariables = {
  id: ..., 
};

// Call the `deletePatientRef()` function to get a reference to the mutation.
const ref = deletePatientRef(deletePatientVars);
// Variables can be defined inline as well.
const ref = deletePatientRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePatientRef(dataConnect, deletePatientVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patient_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patient_delete);
});
```

## CreatePrescription
You can execute the `CreatePrescription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPrescription(vars: CreatePrescriptionVariables): MutationPromise<CreatePrescriptionData, CreatePrescriptionVariables>;

interface CreatePrescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePrescriptionVariables): MutationRef<CreatePrescriptionData, CreatePrescriptionVariables>;
}
export const createPrescriptionRef: CreatePrescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPrescription(dc: DataConnect, vars: CreatePrescriptionVariables): MutationPromise<CreatePrescriptionData, CreatePrescriptionVariables>;

interface CreatePrescriptionRef {
  ...
  (dc: DataConnect, vars: CreatePrescriptionVariables): MutationRef<CreatePrescriptionData, CreatePrescriptionVariables>;
}
export const createPrescriptionRef: CreatePrescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPrescriptionRef:
```typescript
const name = createPrescriptionRef.operationName;
console.log(name);
```

### Variables
The `CreatePrescription` mutation requires an argument of type `CreatePrescriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePrescriptionVariables {
  patientId: UUIDString;
  cidId: UUIDString;
  date: DateString;
  totalKcal: number;
}
```
### Return Type
Recall that executing the `CreatePrescription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePrescriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePrescriptionData {
  prescription_insert: Prescription_Key;
}
```
### Using `CreatePrescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPrescription, CreatePrescriptionVariables } from '@dataconnect/generated';

// The `CreatePrescription` mutation requires an argument of type `CreatePrescriptionVariables`:
const createPrescriptionVars: CreatePrescriptionVariables = {
  patientId: ..., 
  cidId: ..., 
  date: ..., 
  totalKcal: ..., 
};

// Call the `createPrescription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPrescription(createPrescriptionVars);
// Variables can be defined inline as well.
const { data } = await createPrescription({ patientId: ..., cidId: ..., date: ..., totalKcal: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPrescription(dataConnect, createPrescriptionVars);

console.log(data.prescription_insert);

// Or, you can use the `Promise` API.
createPrescription(createPrescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.prescription_insert);
});
```

### Using `CreatePrescription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPrescriptionRef, CreatePrescriptionVariables } from '@dataconnect/generated';

// The `CreatePrescription` mutation requires an argument of type `CreatePrescriptionVariables`:
const createPrescriptionVars: CreatePrescriptionVariables = {
  patientId: ..., 
  cidId: ..., 
  date: ..., 
  totalKcal: ..., 
};

// Call the `createPrescriptionRef()` function to get a reference to the mutation.
const ref = createPrescriptionRef(createPrescriptionVars);
// Variables can be defined inline as well.
const ref = createPrescriptionRef({ patientId: ..., cidId: ..., date: ..., totalKcal: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPrescriptionRef(dataConnect, createPrescriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescription_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescription_insert);
});
```

## UpdatePrescription
You can execute the `UpdatePrescription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePrescription(vars: UpdatePrescriptionVariables): MutationPromise<UpdatePrescriptionData, UpdatePrescriptionVariables>;

interface UpdatePrescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePrescriptionVariables): MutationRef<UpdatePrescriptionData, UpdatePrescriptionVariables>;
}
export const updatePrescriptionRef: UpdatePrescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePrescription(dc: DataConnect, vars: UpdatePrescriptionVariables): MutationPromise<UpdatePrescriptionData, UpdatePrescriptionVariables>;

interface UpdatePrescriptionRef {
  ...
  (dc: DataConnect, vars: UpdatePrescriptionVariables): MutationRef<UpdatePrescriptionData, UpdatePrescriptionVariables>;
}
export const updatePrescriptionRef: UpdatePrescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePrescriptionRef:
```typescript
const name = updatePrescriptionRef.operationName;
console.log(name);
```

### Variables
The `UpdatePrescription` mutation requires an argument of type `UpdatePrescriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePrescriptionVariables {
  id: UUIDString;
  totalKcal: number;
}
```
### Return Type
Recall that executing the `UpdatePrescription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePrescriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePrescriptionData {
  prescription_update?: Prescription_Key | null;
}
```
### Using `UpdatePrescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePrescription, UpdatePrescriptionVariables } from '@dataconnect/generated';

// The `UpdatePrescription` mutation requires an argument of type `UpdatePrescriptionVariables`:
const updatePrescriptionVars: UpdatePrescriptionVariables = {
  id: ..., 
  totalKcal: ..., 
};

// Call the `updatePrescription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePrescription(updatePrescriptionVars);
// Variables can be defined inline as well.
const { data } = await updatePrescription({ id: ..., totalKcal: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePrescription(dataConnect, updatePrescriptionVars);

console.log(data.prescription_update);

// Or, you can use the `Promise` API.
updatePrescription(updatePrescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.prescription_update);
});
```

### Using `UpdatePrescription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePrescriptionRef, UpdatePrescriptionVariables } from '@dataconnect/generated';

// The `UpdatePrescription` mutation requires an argument of type `UpdatePrescriptionVariables`:
const updatePrescriptionVars: UpdatePrescriptionVariables = {
  id: ..., 
  totalKcal: ..., 
};

// Call the `updatePrescriptionRef()` function to get a reference to the mutation.
const ref = updatePrescriptionRef(updatePrescriptionVars);
// Variables can be defined inline as well.
const ref = updatePrescriptionRef({ id: ..., totalKcal: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePrescriptionRef(dataConnect, updatePrescriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescription_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescription_update);
});
```

## DeletePrescription
You can execute the `DeletePrescription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePrescription(vars: DeletePrescriptionVariables): MutationPromise<DeletePrescriptionData, DeletePrescriptionVariables>;

interface DeletePrescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrescriptionVariables): MutationRef<DeletePrescriptionData, DeletePrescriptionVariables>;
}
export const deletePrescriptionRef: DeletePrescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePrescription(dc: DataConnect, vars: DeletePrescriptionVariables): MutationPromise<DeletePrescriptionData, DeletePrescriptionVariables>;

interface DeletePrescriptionRef {
  ...
  (dc: DataConnect, vars: DeletePrescriptionVariables): MutationRef<DeletePrescriptionData, DeletePrescriptionVariables>;
}
export const deletePrescriptionRef: DeletePrescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePrescriptionRef:
```typescript
const name = deletePrescriptionRef.operationName;
console.log(name);
```

### Variables
The `DeletePrescription` mutation requires an argument of type `DeletePrescriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePrescriptionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePrescription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePrescriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePrescriptionData {
  prescription_delete?: Prescription_Key | null;
}
```
### Using `DeletePrescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePrescription, DeletePrescriptionVariables } from '@dataconnect/generated';

// The `DeletePrescription` mutation requires an argument of type `DeletePrescriptionVariables`:
const deletePrescriptionVars: DeletePrescriptionVariables = {
  id: ..., 
};

// Call the `deletePrescription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePrescription(deletePrescriptionVars);
// Variables can be defined inline as well.
const { data } = await deletePrescription({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePrescription(dataConnect, deletePrescriptionVars);

console.log(data.prescription_delete);

// Or, you can use the `Promise` API.
deletePrescription(deletePrescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.prescription_delete);
});
```

### Using `DeletePrescription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePrescriptionRef, DeletePrescriptionVariables } from '@dataconnect/generated';

// The `DeletePrescription` mutation requires an argument of type `DeletePrescriptionVariables`:
const deletePrescriptionVars: DeletePrescriptionVariables = {
  id: ..., 
};

// Call the `deletePrescriptionRef()` function to get a reference to the mutation.
const ref = deletePrescriptionRef(deletePrescriptionVars);
// Variables can be defined inline as well.
const ref = deletePrescriptionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePrescriptionRef(dataConnect, deletePrescriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescription_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescription_delete);
});
```

## CreatePrescriptionItem
You can execute the `CreatePrescriptionItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPrescriptionItem(vars: CreatePrescriptionItemVariables): MutationPromise<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;

interface CreatePrescriptionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePrescriptionItemVariables): MutationRef<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;
}
export const createPrescriptionItemRef: CreatePrescriptionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPrescriptionItem(dc: DataConnect, vars: CreatePrescriptionItemVariables): MutationPromise<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;

interface CreatePrescriptionItemRef {
  ...
  (dc: DataConnect, vars: CreatePrescriptionItemVariables): MutationRef<CreatePrescriptionItemData, CreatePrescriptionItemVariables>;
}
export const createPrescriptionItemRef: CreatePrescriptionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPrescriptionItemRef:
```typescript
const name = createPrescriptionItemRef.operationName;
console.log(name);
```

### Variables
The `CreatePrescriptionItem` mutation requires an argument of type `CreatePrescriptionItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePrescriptionItemVariables {
  prescriptionId: UUIDString;
  formulaId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `CreatePrescriptionItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePrescriptionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePrescriptionItemData {
  prescriptionItem_insert: PrescriptionItem_Key;
}
```
### Using `CreatePrescriptionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPrescriptionItem, CreatePrescriptionItemVariables } from '@dataconnect/generated';

// The `CreatePrescriptionItem` mutation requires an argument of type `CreatePrescriptionItemVariables`:
const createPrescriptionItemVars: CreatePrescriptionItemVariables = {
  prescriptionId: ..., 
  formulaId: ..., 
  quantity: ..., 
};

// Call the `createPrescriptionItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPrescriptionItem(createPrescriptionItemVars);
// Variables can be defined inline as well.
const { data } = await createPrescriptionItem({ prescriptionId: ..., formulaId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPrescriptionItem(dataConnect, createPrescriptionItemVars);

console.log(data.prescriptionItem_insert);

// Or, you can use the `Promise` API.
createPrescriptionItem(createPrescriptionItemVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem_insert);
});
```

### Using `CreatePrescriptionItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPrescriptionItemRef, CreatePrescriptionItemVariables } from '@dataconnect/generated';

// The `CreatePrescriptionItem` mutation requires an argument of type `CreatePrescriptionItemVariables`:
const createPrescriptionItemVars: CreatePrescriptionItemVariables = {
  prescriptionId: ..., 
  formulaId: ..., 
  quantity: ..., 
};

// Call the `createPrescriptionItemRef()` function to get a reference to the mutation.
const ref = createPrescriptionItemRef(createPrescriptionItemVars);
// Variables can be defined inline as well.
const ref = createPrescriptionItemRef({ prescriptionId: ..., formulaId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPrescriptionItemRef(dataConnect, createPrescriptionItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem_insert);
});
```

## UpdatePrescriptionItem
You can execute the `UpdatePrescriptionItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePrescriptionItem(vars: UpdatePrescriptionItemVariables): MutationPromise<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;

interface UpdatePrescriptionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePrescriptionItemVariables): MutationRef<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;
}
export const updatePrescriptionItemRef: UpdatePrescriptionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePrescriptionItem(dc: DataConnect, vars: UpdatePrescriptionItemVariables): MutationPromise<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;

interface UpdatePrescriptionItemRef {
  ...
  (dc: DataConnect, vars: UpdatePrescriptionItemVariables): MutationRef<UpdatePrescriptionItemData, UpdatePrescriptionItemVariables>;
}
export const updatePrescriptionItemRef: UpdatePrescriptionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePrescriptionItemRef:
```typescript
const name = updatePrescriptionItemRef.operationName;
console.log(name);
```

### Variables
The `UpdatePrescriptionItem` mutation requires an argument of type `UpdatePrescriptionItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePrescriptionItemVariables {
  id: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `UpdatePrescriptionItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePrescriptionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePrescriptionItemData {
  prescriptionItem_update?: PrescriptionItem_Key | null;
}
```
### Using `UpdatePrescriptionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePrescriptionItem, UpdatePrescriptionItemVariables } from '@dataconnect/generated';

// The `UpdatePrescriptionItem` mutation requires an argument of type `UpdatePrescriptionItemVariables`:
const updatePrescriptionItemVars: UpdatePrescriptionItemVariables = {
  id: ..., 
  quantity: ..., 
};

// Call the `updatePrescriptionItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePrescriptionItem(updatePrescriptionItemVars);
// Variables can be defined inline as well.
const { data } = await updatePrescriptionItem({ id: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePrescriptionItem(dataConnect, updatePrescriptionItemVars);

console.log(data.prescriptionItem_update);

// Or, you can use the `Promise` API.
updatePrescriptionItem(updatePrescriptionItemVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem_update);
});
```

### Using `UpdatePrescriptionItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePrescriptionItemRef, UpdatePrescriptionItemVariables } from '@dataconnect/generated';

// The `UpdatePrescriptionItem` mutation requires an argument of type `UpdatePrescriptionItemVariables`:
const updatePrescriptionItemVars: UpdatePrescriptionItemVariables = {
  id: ..., 
  quantity: ..., 
};

// Call the `updatePrescriptionItemRef()` function to get a reference to the mutation.
const ref = updatePrescriptionItemRef(updatePrescriptionItemVars);
// Variables can be defined inline as well.
const ref = updatePrescriptionItemRef({ id: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePrescriptionItemRef(dataConnect, updatePrescriptionItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem_update);
});
```

## DeletePrescriptionItem
You can execute the `DeletePrescriptionItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePrescriptionItem(vars: DeletePrescriptionItemVariables): MutationPromise<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;

interface DeletePrescriptionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrescriptionItemVariables): MutationRef<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;
}
export const deletePrescriptionItemRef: DeletePrescriptionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePrescriptionItem(dc: DataConnect, vars: DeletePrescriptionItemVariables): MutationPromise<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;

interface DeletePrescriptionItemRef {
  ...
  (dc: DataConnect, vars: DeletePrescriptionItemVariables): MutationRef<DeletePrescriptionItemData, DeletePrescriptionItemVariables>;
}
export const deletePrescriptionItemRef: DeletePrescriptionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePrescriptionItemRef:
```typescript
const name = deletePrescriptionItemRef.operationName;
console.log(name);
```

### Variables
The `DeletePrescriptionItem` mutation requires an argument of type `DeletePrescriptionItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePrescriptionItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePrescriptionItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePrescriptionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePrescriptionItemData {
  prescriptionItem_delete?: PrescriptionItem_Key | null;
}
```
### Using `DeletePrescriptionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePrescriptionItem, DeletePrescriptionItemVariables } from '@dataconnect/generated';

// The `DeletePrescriptionItem` mutation requires an argument of type `DeletePrescriptionItemVariables`:
const deletePrescriptionItemVars: DeletePrescriptionItemVariables = {
  id: ..., 
};

// Call the `deletePrescriptionItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePrescriptionItem(deletePrescriptionItemVars);
// Variables can be defined inline as well.
const { data } = await deletePrescriptionItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePrescriptionItem(dataConnect, deletePrescriptionItemVars);

console.log(data.prescriptionItem_delete);

// Or, you can use the `Promise` API.
deletePrescriptionItem(deletePrescriptionItemVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem_delete);
});
```

### Using `DeletePrescriptionItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePrescriptionItemRef, DeletePrescriptionItemVariables } from '@dataconnect/generated';

// The `DeletePrescriptionItem` mutation requires an argument of type `DeletePrescriptionItemVariables`:
const deletePrescriptionItemVars: DeletePrescriptionItemVariables = {
  id: ..., 
};

// Call the `deletePrescriptionItemRef()` function to get a reference to the mutation.
const ref = deletePrescriptionItemRef(deletePrescriptionItemVars);
// Variables can be defined inline as well.
const ref = deletePrescriptionItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePrescriptionItemRef(dataConnect, deletePrescriptionItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionItem_delete);
});
```


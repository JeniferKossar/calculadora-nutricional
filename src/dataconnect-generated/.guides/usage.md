# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useInsertCid, useUpdateCid, useDeleteCid, useGetCid, useListCids, useInsertFormula, useUpdateFormula, useDeleteFormula, useGetFormula, useListFormulas } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useInsertCid();

const { data, isPending, isSuccess, isError, error } = useUpdateCid(updateCidVars);

const { data, isPending, isSuccess, isError, error } = useDeleteCid(deleteCidVars);

const { data, isPending, isSuccess, isError, error } = useGetCid(getCidVars);

const { data, isPending, isSuccess, isError, error } = useListCids();

const { data, isPending, isSuccess, isError, error } = useInsertFormula();

const { data, isPending, isSuccess, isError, error } = useUpdateFormula(updateFormulaVars);

const { data, isPending, isSuccess, isError, error } = useDeleteFormula(deleteFormulaVars);

const { data, isPending, isSuccess, isError, error } = useGetFormula(getFormulaVars);

const { data, isPending, isSuccess, isError, error } = useListFormulas();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { insertCid, updateCid, deleteCid, getCid, listCids, insertFormula, updateFormula, deleteFormula, getFormula, listFormulas } from '@dataconnect/generated';


// Operation InsertCid: 
const { data } = await InsertCid(dataConnect);

// Operation UpdateCid:  For variables, look at type UpdateCidVars in ../index.d.ts
const { data } = await UpdateCid(dataConnect, updateCidVars);

// Operation DeleteCid:  For variables, look at type DeleteCidVars in ../index.d.ts
const { data } = await DeleteCid(dataConnect, deleteCidVars);

// Operation GetCid:  For variables, look at type GetCidVars in ../index.d.ts
const { data } = await GetCid(dataConnect, getCidVars);

// Operation ListCids: 
const { data } = await ListCids(dataConnect);

// Operation InsertFormula: 
const { data } = await InsertFormula(dataConnect);

// Operation UpdateFormula:  For variables, look at type UpdateFormulaVars in ../index.d.ts
const { data } = await UpdateFormula(dataConnect, updateFormulaVars);

// Operation DeleteFormula:  For variables, look at type DeleteFormulaVars in ../index.d.ts
const { data } = await DeleteFormula(dataConnect, deleteFormulaVars);

// Operation GetFormula:  For variables, look at type GetFormulaVars in ../index.d.ts
const { data } = await GetFormula(dataConnect, getFormulaVars);

// Operation ListFormulas: 
const { data } = await ListFormulas(dataConnect);


```
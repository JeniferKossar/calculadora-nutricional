import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const addFormula = (formula: Omit<FormulaData, 'id'>) =>
  addDoc(collection(db, 'formulas'), formula);

export const updateFormula = (id: string, updatedFields: Partial<FormulaData>) =>
  updateDoc(doc(db, 'formulas', id), updatedFields);

export const deleteFormula = (id: string) =>
  deleteDoc(doc(db, 'formulas', id));

export const addCid = (cid: CidData) =>
  addDoc(collection(db, 'cids'), cid);

export const updateCid = (docId: string, updatedFields: Partial<CidData>) =>
  updateDoc(doc(db, 'cids', docId), updatedFields);

export type FormulaData = {
  name: string;
  category: string;
  type: string;
  ageMinMonths?: number | null;
  ageMaxMonths?: number | null;
  allergenSoy?: boolean | null;
  allergenMilk?: boolean | null;
  allergenGluten?: boolean | null;
  kcal: number;
  prot: number;
  cho: number;
  lip: number;
  fibras: number | null;
  lataG: number;
  refG: number;
  medidaG: number;
  diluicao: number;
  na: number;
  ca: number;
  p: number;
  fe: number;
  k: number;
  cl: number;
};

export type CidData = {
  id: string;
  name: string;
  isRare: boolean;
  ptMin: number;
  ptMax: number;
  pnatMin: number;
  pnatMax: number;
};

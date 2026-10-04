import React, { useEffect, useState, useMemo } from 'react';
import { Activity, Beaker, Plus, Trash2, HeartPulse, Database, Stethoscope, CheckCircle2, Landmark, Printer, Clock, Utensils, Droplets, ShieldAlert, List, Upload, Download, FileSpreadsheet, Settings2, Edit3, Save, LogOut } from 'lucide-react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { addCid, addFormula, auth, db, deleteFormula, updateCid, updateFormula } from './firebase';

type Cid = {
  id: string;
  docId?: string;
  name: string;
  isRare: boolean;
  ptMin: number;
  ptMax: number;
  pnatMin: number;
  pnatMax: number;
};

type StaffRole = 'pending' | 'superadmin' | 'admin' | 'consultant' | 'disabled';
type StaffMember = { uid: string; email: string; role: StaffRole };

type Formula = {
  id: string;
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

type PrescriptionItem = Formula & { prescribedGrams: number; prescriptionId: number };
type FormulaImportItem = {
  rowNumber: number;
  id: string;
  data: Omit<Formula, 'id'>;
  action: 'create' | 'update';
  errors: string[];
};

const formulaCsvColumns = [
  { key: 'id', header: 'ID (Firebase)' },
  { key: 'name', header: 'Nome' },
  { key: 'category', header: 'Tipo/Categoria' },
  { key: 'ageMinMonths', header: 'Idade Min (meses)' },
  { key: 'ageMaxMonths', header: 'Idade Max (meses)' },
  { key: 'lataG', header: 'Peso Total da Lata (g)' },
  { key: 'refG', header: 'Gramas de Referencia do Rotulo (g)' },
  { key: 'medidaG', header: 'Peso da Medida/Colher-medida (g)' },
  { key: 'diluicao', header: 'Diluicao Padrao (ml de agua por medida)' },
  { key: 'kcal', header: 'Kcal' },
  { key: 'prot', header: 'Proteinas (g)' },
  { key: 'cho', header: 'Carboidratos (g)' },
  { key: 'lip', header: 'Gorduras (g)' },
  { key: 'fibras', header: 'Fibras (g)' },
  { key: 'na', header: 'Sodio (mg)' },
  { key: 'ca', header: 'Calcio (mg)' },
  { key: 'fe', header: 'Ferro (mg)' },
  { key: 'k', header: 'Potassio (mg)' },
  { key: 'cl', header: 'Cloreto (mg)' },
  { key: 'p', header: 'Fosforo (mg)' },
  { key: 'allergenSoy', header: 'Alergenico Soja (1 sim, 0 nao)' },
  { key: 'allergenMilk', header: 'Alergenico Leite (1 sim, 0 nao)' },
  { key: 'allergenGluten', header: 'Alergenico Gluten (1 sim, 0 nao)' },
] as const;

type FormulaCsvKey = typeof formulaCsvColumns[number]['key'];
type NumericFormulaKey = 'ageMinMonths' | 'ageMaxMonths' | 'lataG' | 'refG' | 'medidaG' | 'diluicao' | 'kcal' | 'prot' | 'cho' | 'lip' | 'fibras' | 'na' | 'ca' | 'fe' | 'k' | 'cl' | 'p';

const formulaCsvAliases: Record<FormulaCsvKey, string[]> = {
  id: ['id', 'idfirebase', 'idformula'],
  name: ['nome', 'name'],
  category: ['categoria', 'category', 'tipocategoria'],
  ageMinMonths: ['idademinmeses', 'idademinima', 'ageminmonths'],
  ageMaxMonths: ['idademaxmeses', 'idademaxima', 'agemaxmonths'],
  lataG: ['pesototaldalatag', 'pesolatag', 'latag'],
  refG: ['gramasdereferenciadorotulo', 'gramasdereferenciadorotulog', 'referenciag', 'refg'],
  medidaG: ['pesodamedidacolhermedidag', 'medidag', 'colhermedidag'],
  diluicao: ['diluicaopadraomldeaguapormedida', 'diluicaoml', 'diluicao'],
  kcal: ['kcal', 'calorias'],
  prot: ['proteinasg', 'proteina', 'prot', 'proteinag'],
  cho: ['carboidratosg', 'carboidratos', 'cho'],
  lip: ['gordurasg', 'gorduras', 'lip'],
  fibras: ['fibrasg', 'fibras', 'fiber'],
  na: ['sodiomg', 'sodio', 'na'],
  ca: ['calciomg', 'calcio', 'ca'],
  fe: ['ferromg', 'ferro', 'fe'],
  k: ['potassiomg', 'potassio', 'k'],
  cl: ['cloretomg', 'cloreto', 'cl'],
  p: ['fosforomg', 'fosforo', 'p'],
  allergenSoy: ['alergenicosoja1sim0nao', 'alergenicosoja', 'sojaalergenico'],
  allergenMilk: ['alergenicoleite1sim0nao', 'alergenicoleite', 'leitealergenico'],
  allergenGluten: ['alergenicogluten1sim0nao', 'alergenicogluten', 'glutenalergenico'],
};

const normalizeCsvHeader = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

const parseCsvRecords = (contents: string) => {
  const text = contents.replace(/^\uFEFF/, '');
  const firstLine = text.split(/\r?\n/, 1)[0] || '';
  let quoted = false;
  let commaCount = 0;
  let semicolonCount = 0;
  for (let index = 0; index < firstLine.length; index++) {
    if (firstLine[index] === '"') {
      if (quoted && firstLine[index + 1] === '"') index++;
      else quoted = !quoted;
    } else if (!quoted && firstLine[index] === ',') commaCount++;
    else if (!quoted && firstLine[index] === ';') semicolonCount++;
  }
  const delimiter = semicolonCount >= commaCount ? ';' : ',';
  const records: string[][] = [];
  let record: string[] = [];
  let field = '';
  quoted = false;

  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        field += '"';
        index++;
      } else quoted = !quoted;
    } else if (!quoted && character === delimiter) {
      record.push(field);
      field = '';
    } else if (!quoted && (character === '\n' || character === '\r')) {
      if (character === '\r' && text[index + 1] === '\n') index++;
      record.push(field);
      if (record.some(value => value.trim())) records.push(record);
      record = [];
      field = '';
    } else field += character;
  }

  if (field || record.length) {
    record.push(field);
    if (record.some(value => value.trim())) records.push(record);
  }
  return records;
};

const serializeFormulaCsv = (rows: Formula[], includeIds: boolean) => {
  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? '' : typeof value === 'number' ? String(value).replace('.', ',') : typeof value === 'boolean' ? value ? '1' : '0' : String(value);
    return /[;"\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const columns = includeIds ? formulaCsvColumns : formulaCsvColumns.filter(column => column.key !== 'id');
  return [
    columns.map(column => escape(column.header)).join(';'),
    ...rows.map(row => columns.map(column => escape(row[column.key])).join(';')),
  ].join('\r\n');
};

const formulaCsvExample: Formula = {
  id: 'exemplo', name: 'MMA/PA infant', category: 'Metabólica MMA/PA', type: 'Natural',
  ageMinMonths: 0, ageMaxMonths: 36, allergenSoy: null, allergenMilk: null, allergenGluten: null,
  lataG: 400, refG: 100, medidaG: 4.67, diluicao: 120, kcal: 465, prot: 13, cho: 50, lip: 23,
  fibras: null, na: 191, ca: 410, fe: 7.9, k: 505, cl: 355, p: 300,
};

const formulaAllergenStatus = (formula: Formula) => [
  `Soja: ${formula.allergenSoy === null || formula.allergenSoy === undefined ? 'não informado' : formula.allergenSoy ? 'sim' : 'não'}`,
  `Leite: ${formula.allergenMilk === null || formula.allergenMilk === undefined ? 'não informado' : formula.allergenMilk ? 'sim' : 'não'}`,
  `Glúten: ${formula.allergenGluten === null || formula.allergenGluten === undefined ? 'não informado' : formula.allergenGluten ? 'sim' : 'não'}`,
].join(' · ');

const isPositiveFinite = (value: number) => Number.isFinite(value) && value > 0;
const selectNumericInput = (event: React.FocusEvent<HTMLInputElement>) => event.currentTarget.select();

const stressFactors = [
  { label: 'Ausente (Eutrófico)', value: 1.0 },
  { label: 'Pós-operatório leve', value: 1.1 },
  { label: 'Pós-operatório grave / Trauma leve', value: 1.2 },
  { label: 'Sepse', value: 1.3 },
  { label: 'Trauma grave', value: 1.4 },
  { label: 'Queimado (> 20% SCQ)', value: 1.6 },
  { label: 'Grande Queimado', value: 2.0 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('patient');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<StaffRole | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [registrationNotice, setRegistrationNotice] = useState('');
  const [approvalPending, setApprovalPending] = useState(false);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  
  // Estados Globais de Banco de Dados
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [cids, setCids] = useState<Cid[]>([]);
  const canManageClinicalData = currentRole === 'superadmin' || currentRole === 'admin';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      void (async () => {
        setAuthError('');
        if (!user) {
          setCurrentUser(null);
          setCurrentRole(null);
          setPendingUser(null);
          setApprovalPending(false);
          setFormulas([]);
          setCids([]);
          setStaffMembers([]);
          setIsAuthLoading(false);
          return;
        }

        try {
          const staffProfile = await getDoc(doc(db, 'staff', user.uid));
          if (!staffProfile.exists()) {
            if (user.email?.toLowerCase().endsWith('@hpp.org.br')) {
              setCurrentUser(null);
              setCurrentRole(null);
              setPendingUser(user);
              setApprovalPending(true);
              return;
            }
            setAuthError('Esta conta não está autorizada para acessar o sistema.');
            await signOut(auth);
            return;
          }

          const role = staffProfile.data().role as StaffRole;
          if (role === 'pending') {
            setCurrentUser(null);
            setCurrentRole(role);
            setPendingUser(user);
            setApprovalPending(true);
          } else if (role === 'superadmin' || role === 'admin' || role === 'consultant') {
            setCurrentUser(user);
            setCurrentRole(role);
            setPendingUser(null);
            setApprovalPending(false);
          } else {
            setAuthError('Esta conta está bloqueada ou não possui um nível de acesso válido.');
            await signOut(auth);
          }
        } catch {
          setAuthError('Não foi possível validar a autorização da equipe no Firestore.');
          await signOut(auth);
        } finally {
          setIsAuthLoading(false);
        }
      })();
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (currentRole !== 'superadmin') return;
    return onSnapshot(collection(db, 'staff'), snapshot => {
      setStaffMembers(snapshot.docs.map(item => ({ uid: item.id, ...item.data() } as StaffMember)));
    });
  }, [currentRole]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribeFormulas = onSnapshot(collection(db, 'formulas'), snapshot => {
      setFormulas(snapshot.docs.map(item => ({ ...item.data(), id: item.id } as Formula)));
    });
    const unsubscribeCids = onSnapshot(collection(db, 'cids'), snapshot => {
      setCids(snapshot.docs.map(item => ({ ...item.data(), docId: item.id } as Cid)));
    });

    return () => {
      unsubscribeFormulas();
      unsubscribeCids();
    };
  }, [currentUser]);

  // ==========================================
  // ESTADOS DO PACIENTE E LÓGICA EER
  // ==========================================
  const [patient, setPatient] = useState({
    matricula: '', name: '', bed: '',
    ageValue: 0, ageUnit: 'meses',
    weight: 0, height: 0, gender: 'M',
    cidId: 'not-applicable', foodRestrictions: { soy: false, milk: false, gluten: false },
    stressFactors: [1.0], dosesPerDay: 0, viaAdmin: 'Sonda Nasogástrica (SNG)', clinicalHistory: ''
  });

  const selectedCid = useMemo(() => cids.find(c => c.id === patient.cidId), [cids, patient.cidId]);

  const { ageValue, ageUnit, weight, height, gender, stressFactors: selectedStressFactors } = patient;
  const tmb = useMemo(() => {
    if (weight <= 0 || height <= 0 || ageValue < 0) return 0;

    const ageY = (ageUnit === 'anos' ? ageValue * 12 : ageValue) / 12;
    const heightMeters = height / 100;
    let tmbValue = 0;

    if (ageY < 3) {
      tmbValue = gender === 'M'
        ? (0.167 * weight) + (1517.4 * heightMeters) - 617.6
        : (16.25 * weight) + (1023.2 * heightMeters) - 413.5;
    } else if (ageY < 10) {
      tmbValue = gender === 'M'
        ? (19.6 * weight) + (130.3 * heightMeters) + 414.9
        : (16.97 * weight) + (161.8 * heightMeters) + 371.2;
    } else if (ageY <= 18) {
      tmbValue = gender === 'M'
        ? (16.25 * weight) + (137.2 * heightMeters) + 515.5
        : (8.365 * weight) + (465 * heightMeters) + 200;
    }

    return Math.round(tmbValue * 10) / 10;
  }, [ageValue, ageUnit, weight, height, gender]);

  const eer = Math.round(selectedStressFactors.reduce((calories, factor) => calories * factor, tmb) * 10) / 10;

  const updateStressFactors = (factor: number, checked: boolean) => {
    setPatient(current => {
      const selectedFactors = factor === 1.0
        ? checked ? [1.0] : current.stressFactors.filter(value => value !== 1.0)
        : checked
          ? [...current.stressFactors.filter(value => value !== 1.0), factor]
          : current.stressFactors.filter(value => value !== factor);
      return { ...current, stressFactors: selectedFactors.length ? selectedFactors : [1.0] };
    });
  };

  // ==========================================
  // ESTADOS DE PRESCRIÇÃO E METABÓLICA
  // ==========================================
  const [prescription, setPrescription] = useState<PrescriptionItem[]>([]);
  const [strategy, setStrategy] = useState('Modular'); 
  
  // Metas Cetogênicas
  const [ketoRatio, setKetoRatio] = useState(3);
  const [ketoProtFactor, setKetoProtFactor] = useState(1.5);
  
  // Metas MMA/PA
  const [mmaFactors, setMmaFactors] = useState({ pt: 0.9, pnat: 1.2 });
  const [editLimits, setEditLimits] = useState(false);

  const metaPT = patient.weight * mmaFactors.pt;
  const metaPnat = patient.weight * mmaFactors.pnat;
  const metaPs = metaPT - metaPnat;

  const ketoGoals = useMemo(() => {
    if (!eer) return null;
    const protGrams = patient.weight * ketoProtFactor;
    const protKcal = protGrams * 4;
    
    const unit = eer / ((ketoRatio * 9) + 4);
    
    const fatGrams = unit * ketoRatio;
    const totalProChoGrams = unit;
    const choGrams = Math.max(0, totalProChoGrams - protGrams);
    
    const fatKcal = fatGrams * 9;
    const choKcal = choGrams * 4;

    return {
      protGrams, protKcal, protPct: (protKcal / eer) * 100,
      fatGrams, fatKcal, fatPct: (fatKcal / eer) * 100,
      choGrams, choKcal, choPct: (choKcal / eer) * 100,
    };
  }, [eer, patient.weight, ketoRatio, ketoProtFactor]);
  
  // UI Controles
  const [inputMode, setInputMode] = useState('grams'); 
  const [inputValue, setInputValue] = useState(100);

  const changeInputMode = (mode: string) => {
    if (mode !== inputMode && selectedFormulaObj && isPositiveFinite(selectedFormulaObj.medidaG)) {
      setInputValue(value => mode === 'grams' ? value * selectedFormulaObj.medidaG : value / selectedFormulaObj.medidaG);
    }
    setInputMode(mode);
  };

  const [selectedCategory, setSelectedCategory] = useState(formulas[0]?.category || '');
  const [selectedFormulaId, setSelectedFormulaId] = useState(formulas[0]?.id || '');

  const uniqueCategories = useMemo(() => Array.from(new Set(formulas.map(f => f.category))).sort(), [formulas]);
  const activeCategory = selectedCategory || uniqueCategories[0] || '';
  const availableFormulas = useMemo(() => formulas.filter(f => f.category === activeCategory), [formulas, activeCategory]);
  const activeFormulaId = selectedFormulaId || availableFormulas[0]?.id || '';
  const selectedFormulaObj = formulas.find(f => f.id === activeFormulaId);
  const inputGramsPerDay = selectedFormulaObj
    ? (inputMode === 'scoops' ? inputValue * selectedFormulaObj.medidaG : inputValue) * patient.dosesPerDay
    : 0;
  const prescriptionInputError = useMemo(() => {
    if (!Number.isInteger(patient.dosesPerDay) || patient.dosesPerDay <= 0) return 'Informe primeiro uma quantidade inteira de dietas por dia (mínimo: 1).';
    if (!selectedFormulaObj) return 'Selecione uma fórmula cadastrada.';
    if (!isPositiveFinite(selectedFormulaObj.refG)) return 'A fórmula selecionada precisa ter uma referência em gramas maior que zero.';
    if (!isPositiveFinite(selectedFormulaObj.medidaG)) return 'A fórmula selecionada precisa ter uma medida em gramas maior que zero.';
    if (!Number.isFinite(inputValue) || inputValue <= 0) return 'Informe uma quantidade maior que zero para prescrever.';
    if (!Number.isFinite(selectedFormulaObj.diluicao) || selectedFormulaObj.diluicao < 0) return 'A diluição da fórmula está inválida.';
    return null;
  }, [patient.dosesPerDay, selectedFormulaObj, inputValue]);
  const allergenWarning = useMemo(() => {
    if (!selectedFormulaObj) return null;
    const restrictedIngredients = [
      { patientRestricted: patient.foodRestrictions.soy, formulaContains: selectedFormulaObj.allergenSoy, name: 'soja' },
      { patientRestricted: patient.foodRestrictions.milk, formulaContains: selectedFormulaObj.allergenMilk, name: 'leite' },
      { patientRestricted: patient.foodRestrictions.gluten, formulaContains: selectedFormulaObj.allergenGluten, name: 'glúten' },
    ].filter(item => item.patientRestricted);
    const conflicts = restrictedIngredients.filter(item => item.formulaContains === true).map(item => `contém ${item.name}`);
    const unknown = restrictedIngredients.filter(item => item.formulaContains == null).map(item => `não informa se contém ${item.name}`);
    const warnings = [...conflicts, ...unknown];
    return warnings.length ? `ALERTA DE ALERGIA: paciente com restrição a ${warnings.join(' e ')}. Confira o rótulo e a composição antes de prescrever.` : null;
  }, [selectedFormulaObj, patient.foodRestrictions]);

  const patientAllergySummary = [
    patient.foodRestrictions.soy && 'soja',
    patient.foodRestrictions.milk && 'leite',
    patient.foodRestrictions.gluten && 'glúten',
  ].filter(Boolean).join(', ') || 'nenhuma registrada';

  // ==========================================
  // AGREGADORES NUTRICIONAIS E VALIDAÇÕES
  // ==========================================
  const prescriptionSummary = useMemo(() => {
    return prescription.reduce((acc, curr) => {
      const factor = isPositiveFinite(curr.refG) ? curr.prescribedGrams / curr.refG : 0;
      const volumeDiario = isPositiveFinite(curr.medidaG) && Number.isFinite(curr.diluicao) && curr.diluicao >= 0
        ? (curr.prescribedGrams / curr.medidaG) * curr.diluicao
        : 0;
      
      const protNat = curr.type === 'Natural' ? (curr.prot * factor) : 0;
      const protSint = curr.type === 'Sintética' ? (curr.prot * factor) : 0;

      return {
        kcal: acc.kcal + (curr.kcal * factor), prot: acc.prot + (curr.prot * factor),
        protNatural: acc.protNatural + protNat, protSintetica: acc.protSintetica + protSint,
        cho: acc.cho + (curr.cho * factor), lip: acc.lip + (curr.lip * factor),
        fibras: acc.fibras + ((curr.fibras || 0) * factor), na: acc.na + ((curr.na || 0) * factor),
        ca: acc.ca + ((curr.ca || 0) * factor), fe: acc.fe + ((curr.fe || 0) * factor),
        k: acc.k + ((curr.k || 0) * factor), cl: acc.cl + ((curr.cl || 0) * factor),
        p: acc.p + ((curr.p || 0) * factor), volume: acc.volume + volumeDiario
      };
    }, { kcal: 0, prot: 0, protNatural: 0, protSintetica: 0, cho: 0, lip: 0, fibras: 0, na: 0, ca: 0, fe: 0, k: 0, cl: 0, p: 0, volume: 0 });
  }, [prescription]);

  const validationAlert = useMemo(() => {
    if (!selectedFormulaObj) return null;
    const metabolicTreatmentCategories = ['Fórmula Metabólica', 'Metabólica MMA/PA'];
    if (selectedCid?.isRare && metabolicTreatmentCategories.includes(selectedFormulaObj.category)) return null;
    if (prescriptionInputError) return null;
    const simulatedFactor = inputGramsPerDay / selectedFormulaObj.refG;
    const addedProt = selectedFormulaObj.prot * simulatedFactor;
    const futureProt = prescriptionSummary.prot + addedProt;
    const cidDailyProteinLimit = selectedCid && isPositiveFinite(selectedCid.ptMax) && isPositiveFinite(patient.weight)
      ? selectedCid.ptMax * patient.weight
      : null;

    if (selectedCid && cidDailyProteinLimit !== null && futureProt > cidDailyProteinLimit) {
      return `CRÍTICO: A prescrição atingirá ${futureProt.toFixed(1)} g de proteína/dia, acima do limite máximo do CID ${selectedCid.id} (${cidDailyProteinLimit.toFixed(1)} g/dia; ${selectedCid.ptMax} g/kg).`;
    }

    if (strategy !== 'Metabolica') return null;
    const addedNat = selectedFormulaObj.type === 'Natural' ? addedProt : 0;
    const addedSint = selectedFormulaObj.type === 'Sintética' ? addedProt : 0;

    const futureNat = prescriptionSummary.protNatural + addedNat;
    const futureSint = prescriptionSummary.protSintetica + addedSint;

    if (futureNat > metaPnat) return `CRÍTICO: Atingirá ${futureNat.toFixed(1)}g de Prot. Natural (Sua Meta Diária é: ${metaPnat.toFixed(1)}g).`;
    if (futureSint > metaPs && metaPs > 0) return `CRÍTICO: Excesso de Prot. Sintética. Atingirá: ${futureSint.toFixed(1)}g (Sua Meta Diária é: ${metaPs.toFixed(1)}g).`;
    
    return null;
  }, [prescriptionInputError, strategy, selectedFormulaObj, inputGramsPerDay, patient.weight, prescriptionSummary, metaPnat, metaPs, selectedCid]);

  const handleAddPrescription = () => {
    if (prescriptionInputError) return;
    if (validationAlert) return alert(validationAlert);
    if (allergenWarning && !window.confirm(`${allergenWarning}\n\nDeseja incluir a fórmula mesmo assim?`)) return;
    if (selectedFormulaObj) {
      setPrescription([...prescription, { ...selectedFormulaObj, prescribedGrams: inputGramsPerDay, prescriptionId: Date.now() }]);
    }
  };

  const handleRemovePrescription = (id: number) => setPrescription(prescription.filter(p => p.prescriptionId !== id));
  
  const updateCidLimits = (field: 'ptMin' | 'ptMax' | 'pnatMin' | 'pnatMax', value: string) => {
    if (!canManageClinicalData) return;
    if (!selectedCid) return;
    if (!selectedCid.docId) return;
    void updateCid(selectedCid.docId, { [field]: Number(value) });
  };

  // ==========================================
  // ESTADOS E LÓGICA DO BANCO DE DADOS (ABA 4)
  // ==========================================
  const [dbSubTab, setDbSubTab] = useState('formulas');
  const [formulaImportPreview, setFormulaImportPreview] = useState<{ fileName: string; items: FormulaImportItem[] } | null>(null);
  const [isImportingFormulas, setIsImportingFormulas] = useState(false);
  const [deletingFormulaId, setDeletingFormulaId] = useState<string | null>(null);

  const downloadFormulaCsv = (fileName: string, rows: Formula[], includeIds: boolean) => {
    const blob = new Blob(['\uFEFF' + serializeFormulaCsv(rows, includeIds)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTemplate = () => downloadFormulaCsv('modelo_formulas.csv', [formulaCsvExample], false);
  const handleDownloadCatalog = () => downloadFormulaCsv('catalogo_formulas.csv', formulas, true);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    e.currentTarget.value = '';
    if (!file) return;

    try {
      const records = parseCsvRecords(await file.text());
      if (records.length < 2) return alert('Arquivo vazio ou inválido.');

      const headers = records[0].map(normalizeCsvHeader);
      const columnIndexes = new Map<FormulaCsvKey, number>();
      for (const column of formulaCsvColumns) {
        const aliases = formulaCsvAliases[column.key].map(normalizeCsvHeader);
        const index = headers.findIndex(header => aliases.includes(header));
        if (index >= 0) columnIndexes.set(column.key, index);
      }

      const requiredColumns: Array<[FormulaCsvKey, string]> = [
        ['name', 'Nome'], ['category', 'Categoria'], ['lataG', 'Peso total da lata'], ['refG', 'Gramas de referência'],
        ['medidaG', 'Peso da medida'], ['diluicao', 'Diluição'], ['kcal', 'Kcal'], ['prot', 'Proteínas'],
        ['cho', 'Carboidratos'], ['lip', 'Gorduras'], ['na', 'Sódio'], ['ca', 'Cálcio'], ['fe', 'Ferro'],
        ['k', 'Potássio'], ['cl', 'Cloreto'], ['p', 'Fósforo'], ['allergenSoy', 'Alergênico soja'],
        ['allergenMilk', 'Alergênico leite'], ['allergenGluten', 'Alergênico glúten'],
      ];
      const missingColumns = requiredColumns.filter(([key]) => !columnIndexes.has(key)).map(([, label]) => label);
      if (missingColumns.length) return alert(`Faltam colunas obrigatórias no CSV: ${missingColumns.join(', ')}.`);

      const existingIds = new Set(formulas.map(formula => formula.id));
      const existingById = new Map(formulas.map(formula => [formula.id, formula]));
      const items = records.slice(1).map((values, index): FormulaImportItem => {
        const errors: string[] = [];
        const readValue = (key: FormulaCsvKey) => {
          const columnIndex = columnIndexes.get(key);
          return columnIndex === undefined ? '' : (values[columnIndex] || '').trim();
        };
        const id = readValue('id');
        const name = readValue('name');
        const category = readValue('category');
        const existingFormula = id ? existingById.get(id) : undefined;
        if (!name) errors.push('Nome vazio');
        if (!category) errors.push('Categoria vazia');
        if (id && !existingIds.has(id)) errors.push('ID não encontrado; deixe vazio para cadastrar uma fórmula nova');

        const readNumber = (key: NumericFormulaKey, label: string, required: boolean): number | null => {
          const rawValue = readValue(key);
          if (!rawValue) {
            if (required) errors.push(`${label} vazio`);
            return null;
          }
          const normalized = rawValue.includes(',') ? rawValue.replace(/\./g, '').replace(',', '.') : rawValue;
          const number = Number(normalized);
          if (!Number.isFinite(number)) {
            errors.push(`${label} inválido`);
            return null;
          }
          return number;
        };

        const numbers: Partial<Record<NumericFormulaKey, number | null>> = {};
        const numericColumns: Array<[NumericFormulaKey, string, boolean]> = [
          ['ageMinMonths', 'Idade mínima', false], ['ageMaxMonths', 'Idade máxima', false],
          ['lataG', 'Peso da lata', true], ['refG', 'Referência em gramas', true], ['medidaG', 'Medida em gramas', true],
          ['diluicao', 'Diluição', true], ['kcal', 'Kcal', true], ['prot', 'Proteínas', true],
          ['cho', 'Carboidratos', true], ['lip', 'Gorduras', true], ['fibras', 'Fibras', false],
          ['na', 'Sódio', true], ['ca', 'Cálcio', true], ['fe', 'Ferro', true], ['k', 'Potássio', true],
          ['cl', 'Cloreto', true], ['p', 'Fósforo', true],
        ];
        for (const [key, label, required] of numericColumns) numbers[key] = readNumber(key, label, required);
        const readAllergen = (key: 'allergenSoy' | 'allergenMilk' | 'allergenGluten', label: string): boolean | null => {
          const value = readValue(key).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          if (['1', 'sim', 's', 'yes'].includes(value)) return true;
          if (['0', 'nao', 'n', 'no'].includes(value)) return false;
          errors.push(`${label}: informe 1 (sim) ou 0 (não)`);
          return null;
        };
        const allergenSoy = readAllergen('allergenSoy', 'Soja');
        const allergenMilk = readAllergen('allergenMilk', 'Leite');
        const allergenGluten = readAllergen('allergenGluten', 'Glúten');
        if (numbers.ageMinMonths != null && numbers.ageMaxMonths != null && numbers.ageMinMonths > numbers.ageMaxMonths) errors.push('Idade mínima maior que a idade máxima');
        if (numbers.lataG != null && numbers.lataG <= 0) errors.push('Peso da lata deve ser maior que zero');
        if (numbers.refG != null && numbers.refG <= 0) errors.push('Referência em gramas deve ser maior que zero');
        if (numbers.medidaG != null && numbers.medidaG <= 0) errors.push('Peso da medida deve ser maior que zero');
        const normalizedCategory = normalizeCsvHeader(category);
        const inferredType = normalizedCategory.includes('sintetica') ? 'Sintética' : normalizedCategory.includes('modulo') ? 'Modulo' : normalizedCategory === 'natural' ? 'Natural' : existingFormula?.type || 'Natural';

        return {
          rowNumber: index + 2,
          id,
          action: id ? 'update' : 'create',
          errors,
          data: {
            name,
            category,
            type: inferredType,
            ageMinMonths: numbers.ageMinMonths,
            ageMaxMonths: numbers.ageMaxMonths,
            allergenSoy,
            allergenMilk,
            allergenGluten,
            lataG: numbers.lataG ?? 0,
            refG: numbers.refG ?? 0,
            medidaG: numbers.medidaG ?? 0,
            diluicao: numbers.diluicao ?? 0,
            kcal: numbers.kcal ?? 0,
            prot: numbers.prot ?? 0,
            cho: numbers.cho ?? 0,
            lip: numbers.lip ?? 0,
            fibras: numbers.fibras ?? null,
            na: numbers.na ?? 0,
            ca: numbers.ca ?? 0,
            fe: numbers.fe ?? 0,
            k: numbers.k ?? 0,
            cl: numbers.cl ?? 0,
            p: numbers.p ?? 0,
          },
        };
      });

      const rowsById = new Map<string, FormulaImportItem[]>();
      for (const item of items) {
        if (!item.id) continue;
        rowsById.set(item.id, [...(rowsById.get(item.id) || []), item]);
      }
      for (const duplicates of rowsById.values()) {
        if (duplicates.length > 1) duplicates.forEach(item => item.errors.push('ID repetido neste arquivo'));
      }
      setFormulaImportPreview({ fileName: file.name, items });
    } catch {
      alert('Não foi possível ler o arquivo CSV. Salve a planilha como CSV UTF-8 e tente novamente.');
    }
  };

  const handleConfirmFormulaImport = async () => {
    if (!canManageClinicalData || !formulaImportPreview || formulaImportPreview.items.some(item => item.errors.length)) return;
    setIsImportingFormulas(true);
    try {
      let created = 0;
      let updated = 0;
      for (const item of formulaImportPreview.items) {
        if (item.action === 'update') {
          await updateFormula(item.id, item.data);
          updated++;
        } else {
          await addFormula(item.data);
          created++;
        }
      }
      alert(`Importação concluída. Novas: ${created}. Atualizadas: ${updated}.`);
      setFormulaImportPreview(null);
    } catch {
      alert('A importação foi interrompida por uma falha no Firebase. Confira a lista: algumas linhas anteriores podem já ter sido gravadas.');
    } finally {
      setIsImportingFormulas(false);
    }
  };

  const handleDeleteFormula = async (formula: Formula) => {
    if (!canManageClinicalData) return;
    if (prescription.some(item => item.id === formula.id)) {
      alert('Remova esta fórmula da prescrição ativa antes de excluí-la do catálogo.');
      return;
    }
    if (!window.confirm(`Excluir "${formula.name}" do catálogo? Esta ação não pode ser desfeita.`)) return;

    setDeletingFormulaId(formula.id);
    try {
      await deleteFormula(formula.id);
    } catch {
      alert('Não foi possível excluir a fórmula. Verifique sua conexão e seu nível de acesso.');
    } finally {
      setDeletingFormulaId(null);
    }
  };

  const [newCid, setNewCid] = useState<Cid>({ id: '', name: '', isRare: false, ptMin: 0, ptMax: 0, pnatMin: 0, pnatMax: 0 });
  const handleAddNewCid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canManageClinicalData) return;
    if (!newCid.id || !newCid.name) return;
    
    // Verifica se está editando ou criando um novo
    const existingIndex = cids.findIndex(c => c.id === newCid.id);
     if (existingIndex >= 0 && newCid.docId) {
       const { docId, ...cidData } = newCid;
       await updateCid(docId, cidData);
       alert("Doença/CID atualizada com sucesso!");
    } else {
       const cidData = {
        id: newCid.id,
        name: newCid.name,
        isRare: newCid.isRare,
        ptMin: newCid.ptMin,
        ptMax: newCid.ptMax,
        pnatMin: newCid.pnatMin,
        pnatMax: newCid.pnatMax,
       };
       await addCid(cidData);
       alert("Doença/CID cadastrada com sucesso!");
    }
    setNewCid({ id: '', name: '', isRare: false, ptMin: 0, ptMax: 0, pnatMin: 0, pnatMax: 0 });
  };

  const handleEditCid = (cidToEdit: Cid) => {
    if (!canManageClinicalData) return;
    setNewCid(cidToEdit);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, authEmail, authPassword);
    } catch {
      setAuthError('Não foi possível entrar. Confira as credenciais e se a conta está autorizada pela equipe.');
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    setRegistrationNotice('');
    const normalizedEmail = authEmail.trim().toLowerCase();
    if (!normalizedEmail.endsWith('@hpp.org.br')) {
      setAuthError('O cadastro está disponível somente para e-mails @hpp.org.br.');
      return;
    }
    if (authPassword.length < 8) {
      setAuthError('Use uma senha com pelo menos 8 caracteres.');
      return;
    }

    setIsRegistering(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, authPassword);
      await setDoc(doc(db, 'staff', credential.user.uid), { email: normalizedEmail, role: 'pending' });
      setPendingUser(credential.user);
      setApprovalPending(true);
      setRegistrationNotice('Cadastro solicitado. Aguarde a liberação do superadmin.');
    } catch {
      setAuthError('Não foi possível criar a conta. Verifique o e-mail e tente novamente ou entre em contato com o superadmin.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRefreshAccess = async () => {
    if (!pendingUser) return;
    try {
      const staffProfile = await getDoc(doc(db, 'staff', pendingUser.uid));
      if (!staffProfile.exists()) {
        setApprovalPending(true);
        setAuthError('Aguardando aprovação do superadmin.');
        return;
      }
      const role = staffProfile.data().role as StaffRole;
      if (role === 'superadmin' || role === 'admin' || role === 'consultant') {
        setCurrentRole(role);
        setCurrentUser(pendingUser);
        setPendingUser(null);
        setApprovalPending(false);
      } else {
        setApprovalPending(true);
        setAuthError('Aguardando aprovação do superadmin.');
      }
    } catch {
      setAuthError('Não foi possível consultar a aprovação. Confira a conexão e tente novamente.');
    }
  };

  const handleStaffRoleChange = async (uid: string, role: Exclude<StaffRole, 'superadmin'>) => {
    if (currentRole !== 'superadmin') return;
    try {
      await updateDoc(doc(db, 'staff', uid), { role });
    } catch {
      setAuthError('Não foi possível atualizar o nível de acesso desta conta.');
    }
  };

  const handlePrint = () => window.print();

  if (isAuthLoading) {
    return <main className="min-h-screen grid place-items-center bg-slate-50 text-slate-600">Verificando acesso...</main>;
  }

  if (!currentUser) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50 px-4 py-10">
        <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center gap-3 text-emerald-800">
            <Activity className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">DietCalc Pro</h1>
              <p className="text-sm text-slate-500">Acesso da equipe clínica</p>
            </div>
          </div>
          {pendingUser ? (
            <div className="space-y-4">
              <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">{registrationNotice || (approvalPending ? 'O superadmin precisa aprovar seu acesso.' : 'Aguardando ativação da conta.')}</p>
              {authError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">{authError}</p>}
              <button type="button" onClick={handleRefreshAccess} className="w-full rounded-lg bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900">Verificar aprovação</button>
              <button type="button" onClick={() => void signOut(auth)} className="w-full px-4 py-2 text-sm text-slate-600">Sair</button>
            </div>
          ) : (
          <form onSubmit={showRegistration ? handleSignUp : handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="staff-email" className="mb-1 block text-sm font-semibold text-slate-700">E-mail</label>
              <input id="staff-email" type="email" autoComplete="username" required value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 p-3" />
            </div>
            <div>
              <label htmlFor="staff-password" className="mb-1 block text-sm font-semibold text-slate-700">{showRegistration ? 'Criar senha' : 'Senha'}</label>
              <input id="staff-password" type="password" autoComplete="current-password" required value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full rounded-lg border border-slate-300 p-3" />
            </div>
            {showRegistration && <p className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">Use seu e-mail @hpp.org.br. O superadmin deverá aprovar seu acesso antes do primeiro uso.</p>}
            {authError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">{authError}</p>}
            {registrationNotice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">{registrationNotice}</p>}
            <button type="submit" disabled={isRegistering} className="w-full rounded-lg bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900 disabled:bg-slate-400">{isRegistering ? 'Enviando...' : showRegistration ? 'Solicitar cadastro' : 'Entrar'}</button>
            <button type="button" onClick={() => { setShowRegistration(!showRegistration); setAuthError(''); setRegistrationNotice(''); }} className="w-full px-4 py-2 text-sm font-semibold text-indigo-700">{showRegistration ? 'Já tenho acesso' : 'Criar conta institucional'}</button>
          </form>
          )}
        </section>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12 print:bg-white print:p-0">
      {/* HEADER */}
      <header className="bg-emerald-800 text-white shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-300" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DietCalc Pro - Clínica Hospitalar</h1>
              <p className="text-sm text-emerald-100 opacity-90">Prescrição & Banco de Dados Avançado</p>
            </div>
          </div>
          <div className="bg-emerald-900/50 px-4 py-3 rounded-lg flex flex-col items-end gap-1">
             <div className="text-sm font-semibold flex items-center gap-2"><Stethoscope className="w-4 h-4 text-emerald-300"/> Paciente: {patient.name}</div>
             <div className="text-xs text-emerald-200 bg-emerald-900 px-2 py-1 rounded">Matrícula: {patient.matricula}</div>
             <button onClick={() => void signOut(auth)} className="mt-1 flex items-center gap-1 text-xs text-emerald-100 hover:text-white"><LogOut className="h-3.5 w-3.5" /> Sair ({currentUser.email})</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 print:m-0 print:p-0 print:block">
        
        {/* MENU LATERAL */}
        <div className="md:col-span-3 space-y-2 print:hidden">
          <button onClick={() => setActiveTab('patient')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'patient' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'hover:bg-slate-200 bg-white shadow-sm'}`}>
            <Stethoscope className="w-5 h-5" /> 1. Dados e EER
          </button>
          <button onClick={() => setActiveTab('prescription')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'prescription' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'hover:bg-slate-200 bg-white shadow-sm'}`}>
            <Utensils className="w-5 h-5" /> 2. Prescrição Diária
          </button>
          <button onClick={() => setActiveTab('report')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'report' ? 'bg-blue-100 text-blue-800 border border-blue-200 shadow-md' : 'hover:bg-slate-200 bg-white shadow-sm'}`}>
            <Landmark className="w-5 h-5" /> 3. Laudo (Governo)
          </button>

          <div className="my-4 border-t border-slate-200"></div>
          <p className="px-4 text-xs font-bold text-slate-400 uppercase mb-2">Cálculos Clínicos Isolados</p>
          
          <button onClick={() => setActiveTab('mma')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'mma' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'hover:bg-slate-200 bg-white shadow-sm'}`}>
            <Beaker className="w-5 h-5" /> Meta proteica de doenças metabólicas
          </button>
          <button onClick={() => setActiveTab('keto')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'keto' ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'hover:bg-slate-200 bg-white shadow-sm'}`}>
            <HeartPulse className="w-5 h-5" /> Dieta Cetogênica
          </button>

          <div className="my-4 border-t border-slate-200"></div>
          
          <button onClick={() => setActiveTab('database')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'database' ? 'bg-slate-800 text-white shadow-md' : 'hover:bg-slate-200 bg-white shadow-sm'}`}>
            <Database className="w-5 h-5" /> Banco de Dados
          </button>
        </div>

        {/* ÁREA CENTRAL */}
        <div className="md:col-span-9 print:w-full print:block">
          
          {/* TAB: DADOS CLÍNICOS E EER */}
          {activeTab === 'patient' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in print:hidden">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-800">
                <Stethoscope className="w-6 h-6 text-emerald-600" /> Registro do Paciente e Matrícula
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                <div className="md:col-span-4"><label className="block text-sm font-semibold text-slate-600 mb-1">Matrícula / Registro</label><input type="text" value={patient.matricula} onChange={e => setPatient({...patient, matricula: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-blue-700 font-bold" /></div>
                <div className="md:col-span-8"><label className="block text-sm font-semibold text-slate-600 mb-1">Nome Completo</label><input type="text" value={patient.name} onChange={e => setPatient({...patient, name: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner">
                <div className="md:col-span-12 mb-2 border-b border-slate-200 pb-2"><h3 className="font-bold text-slate-700">Antropometria e Cálculo Energético</h3></div>
                
                {/* CAMPO DE IDADE COM TOGGLE MESES/ANOS */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-slate-600 mb-1 flex justify-between">
                    Idade
                    <div className="flex bg-slate-200 rounded text-[10px] overflow-hidden">
                      <button onClick={() => setPatient({...patient, ageUnit: 'meses'})} className={`px-2 py-0.5 ${patient.ageUnit === 'meses' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'}`}>Meses</button>
                      <button onClick={() => setPatient({...patient, ageUnit: 'anos'})} className={`px-2 py-0.5 ${patient.ageUnit === 'anos' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'}`}>Anos</button>
                    </div>
                  </label>
                  <div className="flex items-center">
                    <input type="number" value={patient.ageValue} onFocus={selectNumericInput} onChange={e => setPatient({...patient, ageValue: Number(e.target.value)})} className="w-full p-2 border rounded-l-lg border-r-0" />
                    <span className="bg-slate-100 border border-l-0 border-slate-300 p-2 rounded-r-lg text-sm text-slate-500 font-medium whitespace-nowrap">{patient.ageUnit}</span>
                  </div>
                </div>

                <div className="md:col-span-2"><label className="block text-sm font-semibold text-slate-600 mb-1">Peso (kg)</label><input type="number" value={patient.weight} onFocus={selectNumericInput} onChange={e => setPatient({...patient, weight: Number(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-semibold text-slate-600 mb-1">Estatura (cm)</label><input type="number" value={patient.height} onFocus={selectNumericInput} onChange={e => setPatient({...patient, height: Number(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-semibold text-slate-600 mb-1">Sexo</label><select value={patient.gender} onChange={e => setPatient({...patient, gender: e.target.value})} className="w-full p-2 border rounded-lg"><option value="M">Masc</option><option value="F">Fem</option></select></div>
                <fieldset className="md:col-span-12">
                  <legend className="block text-sm font-semibold text-indigo-700 mb-2">Fatores de estresse</legend>
                  <div className="flex flex-wrap gap-2">
                    {stressFactors.map(factor => (
                      <label key={factor.value} className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                        <input type="checkbox" checked={patient.stressFactors.includes(factor.value)} onChange={e => updateStressFactors(factor.value, e.target.checked)} className="h-4 w-4 accent-indigo-600" />
                        {factor.label} (x{factor.value})
                      </label>
                    ))}
                  </div>
                </fieldset>
                
                <div className="md:col-span-12 grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-slate-100 p-3 rounded-lg border border-slate-300"><p className="text-xs font-bold uppercase">TMB (Schofield)</p><p className="text-xl font-mono">{tmb.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kcal</p></div>
                  <div className="bg-emerald-100 p-3 rounded-lg border border-emerald-300"><p className="text-xs text-emerald-800 font-bold uppercase flex items-center gap-1"><Activity className="w-3 h-3"/> Meta de Energia (EER)</p><p className="text-2xl font-extrabold text-emerald-900">{eer.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kcal</p></div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Diagnóstico (CID Base)</label>
                  <select value={patient.cidId} onChange={e => setPatient({...patient, cidId: e.target.value})} className="w-full p-3 bg-white border border-slate-300 rounded-lg shadow-sm">
                    <option value="">Selecione um CID cadastrado</option>
                    <option value="not-applicable">Não se aplica</option>
                    {cids.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
                  </select>
                  {cids.length === 0 && <p className="mt-1 text-xs text-slate-500">O CID é opcional. Use “Não se aplica” quando não houver diagnóstico cadastrado ou aplicável.</p>}
                </div>
                <fieldset className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <legend className="px-1 text-sm font-bold text-amber-950">Restrições alimentares confirmadas</legend>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={patient.foodRestrictions.soy} onChange={e => setPatient({...patient, foodRestrictions: {...patient.foodRestrictions, soy: e.target.checked}})} /> Soja</label>
                    <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={patient.foodRestrictions.milk} onChange={e => setPatient({...patient, foodRestrictions: {...patient.foodRestrictions, milk: e.target.checked}})} /> Leite</label>
                    <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={patient.foodRestrictions.gluten} onChange={e => setPatient({...patient, foodRestrictions: {...patient.foodRestrictions, gluten: e.target.checked}})} /> Glúten</label>
                  </div>
                </fieldset>
                <div><label className="block text-sm font-semibold"><Utensils className="w-4 h-4 inline mr-1"/> Via Admin.</label><select value={patient.viaAdmin} onChange={e => setPatient({...patient, viaAdmin: e.target.value})} className="w-full p-2 bg-slate-50 border rounded-lg"><option>Sonda Nasogástrica (SNG)</option><option>Gastrostomia (GTT)</option><option>Via Oral</option></select></div>
              </div>
            </div>
          )}

          {/* TAB: PRESCRIÇÃO */}
          {activeTab === 'prescription' && (
            <div className="space-y-6 animate-in fade-in print:hidden">
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Utensils className="w-6 h-6 text-orange-600" /> Montagem da Prescrição</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg border border-slate-200 flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1"><Clock className="w-4 h-4"/> Qtd de Dietas/Dia:</span>
                      <input type="number" min="1" step="1" required aria-invalid={!Number.isInteger(patient.dosesPerDay) || patient.dosesPerDay <= 0} value={patient.dosesPerDay || ''} onFocus={selectNumericInput} onChange={e => setPatient({...patient, dosesPerDay: Number(e.target.value)})} className={`w-20 p-1 text-center font-bold bg-white border rounded focus:ring-2 focus:ring-orange-500 ${!Number.isInteger(patient.dosesPerDay) || patient.dosesPerDay <= 0 ? 'border-red-400' : 'border-slate-300'}`} />
                    </div>
                    <div className="bg-orange-50 p-2 rounded-lg border border-orange-200 flex items-center gap-2">
                      <span className="text-xs font-bold text-orange-800 uppercase">Estratégia Ativa:</span>
                      <select value={strategy} onChange={e => setStrategy(e.target.value)} className="text-sm font-bold bg-white border border-orange-300 text-orange-900 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500">
                        <option value="Normal">Normal / Padrão</option>
                        <option value="Cetogenica">Cetogênica Clássica</option>
                        <option value="Metabolica">Doenças metabólicas</option>
                      </select>
                    </div>
                  </div>
                </div>
                {prescriptionInputError && <p role="alert" className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-900">{prescriptionInputError}</p>}
                
                {strategy === 'Metabolica' && (
                  <div className="mt-3 text-xs text-indigo-700 bg-indigo-50 p-2 rounded flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4"/> <span>Validação metabólica ativada. As metas de proteína estão sendo puxadas da aba <b>Meta proteica de doenças metabólicas</b>.</span>
                  </div>
                )}
                {strategy === 'Cetogenica' && (
                  <div className="mt-3 text-xs text-purple-700 bg-purple-50 p-2 rounded flex items-center gap-2">
                    <HeartPulse className="w-4 h-4"/> <span>Monitoramento cetogênico ativado. A proporção e o fator proteico estão sendo puxados da aba <b>Dieta Cetogênica</b>.</span>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Categoria / Tipo</label>
                      <select value={activeCategory} onChange={e => { setSelectedCategory(e.target.value); setSelectedFormulaId(''); }} disabled={uniqueCategories.length === 0} className="w-full p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-slate-100">
                        {uniqueCategories.length === 0 && <option value="">Nenhuma categoria cadastrada</option>}
                        {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Fórmula / Suplemento</label>
                      <select value={activeFormulaId} onChange={e => setSelectedFormulaId(e.target.value)} disabled={availableFormulas.length === 0} className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold focus:ring-2 focus:ring-orange-500 disabled:bg-slate-100">
                        {availableFormulas.length === 0 && <option value="">Nenhuma fórmula cadastrada</option>}
                        {availableFormulas.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-end gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Modo de Prescrição</label>
                      <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-md">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold"><input type="radio" checked={inputMode === 'grams'} onChange={() => changeInputMode('grams')} className="w-4 h-4 text-orange-600" /> Gramas (g)</label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold"><input type="radio" checked={inputMode === 'scoops'} onChange={() => changeInputMode('scoops')} className="w-4 h-4 text-orange-600" /> Colheres (scoops)</label>
                      </div>
                    </div>
                    <div className="w-32">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{inputMode === 'grams' ? 'Gramas por Dieta (g)' : 'Colheres por Dieta'}</label>
                      <input type="number" min="0" step="any" value={inputValue} onFocus={selectNumericInput} onChange={e => setInputValue(Number(e.target.value))} className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md font-bold text-lg text-center" />
                    </div>
                    {inputMode === 'scoops' && (
                      <div className="w-32 animate-in slide-in-from-left-2">
                        <label className="block text-xs font-semibold text-indigo-600 mb-1">Peso da colher (g)</label>
                        <output className="block w-full rounded-md border border-indigo-300 bg-indigo-50 p-2 text-center text-indigo-900">{selectedFormulaObj?.medidaG ?? '—'}</output>
                      </div>
                    )}
                    <button onClick={handleAddPrescription} disabled={!!prescriptionInputError || !!validationAlert} className={`px-6 py-2 h-11 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${prescriptionInputError || validationAlert ? 'bg-slate-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-md'}`}>
                      <Plus className="w-4 h-4" /> Incluir
                    </button>
                  </div>
                  {validationAlert && (
                    <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-600 text-red-900 text-sm font-bold flex items-center gap-2 rounded shadow-sm animate-in zoom-in">
                      <ShieldAlert className="w-5 h-5 flex-shrink-0" /> {validationAlert}
                    </div>
                  )}
                  {allergenWarning && <div role="alert" className="mt-4 rounded-lg border-l-4 border-red-700 bg-red-50 p-3 text-sm font-bold text-red-900"><ShieldAlert className="mr-2 inline h-5 w-5" />{allergenWarning}</div>}
                </div>
              </div>

              {prescription.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2"><List className="w-4 h-4"/> Detalhamento da Estratégia</h3>
                    <span className="text-xs bg-slate-200 px-2 py-1 rounded-md text-slate-600 font-bold border border-slate-300">Total: {patient.dosesPerDay} Dietas ao Dia</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                        <tr>
                          <th className="px-4 py-3">Fórmula</th>
                          <th className="px-4 py-3 bg-orange-50 text-center border-x border-orange-100">TOTAL DIA</th>
                          <th className="px-4 py-3 text-emerald-800 bg-emerald-50 text-center">Porção (g) POR DIETA</th>
                          <th className="px-4 py-3 text-emerald-800 bg-emerald-50 text-center">Colheres POR DIETA</th>
                          <th className="px-4 py-3 text-blue-800 bg-blue-50 text-center border-l border-blue-100">Água (ml) POR DIETA</th>
                          <th className="px-4 py-3 text-center">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prescription.map((item) => {
                          const hasValidDoseCount = Number.isInteger(patient.dosesPerDay) && patient.dosesPerDay > 0;
                          const gPerDose = hasValidDoseCount ? item.prescribedGrams / patient.dosesPerDay : null;
                          const scoopsPerDose = gPerDose !== null && isPositiveFinite(item.medidaG) ? gPerDose / item.medidaG : null;
                          const volumePerDose = scoopsPerDose !== null && Number.isFinite(item.diluicao) && item.diluicao >= 0
                            ? scoopsPerDose * item.diluicao
                            : null;
                          
                          // Detalhamento Nutricional
                          const factor = isPositiveFinite(item.refG) ? item.prescribedGrams / item.refG : 0;
                          const iKcal = item.kcal * factor;
                          const iProt = item.prot * factor;
                          const iCho = item.cho * factor;
                          const iLip = item.lip * factor;
                          const iFib = (item.fibras || 0) * factor;
                          const iNa = (item.na || 0) * factor;
                          const iCa = (item.ca || 0) * factor;
                          const iFe = (item.fe || 0) * factor;
                          const iK = (item.k || 0) * factor;
                          const iCl = (item.cl || 0) * factor;
                          const iP = (item.p || 0) * factor;
                          const latasMes = isPositiveFinite(item.lataG) ? Math.ceil((item.prescribedGrams * 30) / item.lataG) : null;

                          return (
                            <React.Fragment key={item.prescriptionId}>
                              <tr className="hover:bg-slate-50">
                                  <td className="px-4 py-3 border-t border-slate-100"><div className="font-bold text-slate-800">{item.name}</div><div className="text-[10px] text-slate-500 uppercase mt-0.5">{item.type}</div><div className="mt-1 text-xs font-semibold text-red-700">Alergênicos: {formulaAllergenStatus(item)}</div></td>
                                  <td className="px-4 py-3 font-bold text-center bg-orange-50/30 border-x border-orange-50 border-t border-t-orange-100">{item.prescribedGrams}g</td>
                                  <td className="px-4 py-3 font-bold text-emerald-700 text-center border-t border-slate-100">{gPerDose === null ? '—' : `${gPerDose.toFixed(1)}g`}</td>
                                  <td className="px-4 py-3 font-extrabold text-emerald-800 text-center text-lg border-t border-slate-100">{scoopsPerDose === null ? '—' : <>{scoopsPerDose.toFixed(1)} <span className="text-[10px] font-normal uppercase">sc</span></>}</td>
                                  <td className="px-4 py-3 font-extrabold text-blue-700 text-center text-lg border-l border-blue-50 border-t border-t-blue-100">
                                    {volumePerDose === null ? '—' : <span className="flex items-center justify-center gap-1"><Droplets className="w-4 h-4"/> {volumePerDose.toFixed(0)} ml</span>}
                                  </td>
                                  <td className="px-4 py-3 text-center border-t border-slate-100"><button onClick={() => handleRemovePrescription(item.prescriptionId)} className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button></td>
                              </tr>
                              <tr className="bg-slate-50/50">
                                  <td colSpan={6} className="px-4 py-2 border-b-2 border-slate-200">
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
                                    <span className="font-semibold text-emerald-700">Kcal: {iKcal.toFixed(1)}</span>
                                    <span><b>Prot:</b> {iProt.toFixed(1)}g</span><span><b>CHO:</b> {iCho.toFixed(1)}g</span><span><b>Gord:</b> {iLip.toFixed(1)}g</span>
                                    <span><b>Fibras:</b> {iFib.toFixed(1)}g</span><span><b>Na:</b> {iNa.toFixed(1)}mg</span><span><b>Ca:</b> {iCa.toFixed(1)}mg</span>
                                    <span><b>Fe:</b> {iFe.toFixed(1)}mg</span><span><b>K:</b> {iK.toFixed(1)}mg</span><span><b>Cl:</b> {iCl.toFixed(1)}mg</span><span><b>P:</b> {iP.toFixed(1)}mg</span>
                                    <span className="ml-auto font-bold text-indigo-700 bg-indigo-50 px-2 rounded">Est. Mensal: {latasMes ?? '—'} Latas</span>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  
                  {strategy === 'Metabolica' && selectedCid?.isRare && (
                    <div className="bg-slate-50 p-4 border-t border-slate-200">
                      <p className="text-xs font-bold uppercase text-slate-500 mb-2">Monitoramento CID ({selectedCid.name})</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className={`p-3 rounded-lg border flex flex-col justify-center ${(prescriptionSummary.prot > metaPT) ? 'bg-red-50 border-red-300 text-red-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                          <span className="text-xs block text-slate-500">PT Ofertada vs Meta ({metaPT.toFixed(1)})</span>
                          <span className="font-bold text-lg">{prescriptionSummary.prot.toFixed(1)} g/dia</span> 
                        </div>
                        <div className={`p-3 rounded-lg border flex flex-col justify-center ${(prescriptionSummary.protNatural > metaPnat) ? 'bg-red-50 border-red-300 text-red-800' : 'bg-emerald-50 border-emerald-300 text-emerald-800'}`}>
                          <span className="text-xs block">Pnat Ofertada vs Meta ({metaPnat.toFixed(1)})</span>
                          <span className="font-bold text-lg">{prescriptionSummary.protNatural.toFixed(1)} g/dia</span> 
                        </div>
                        <div className={`p-3 rounded-lg border flex flex-col justify-center ${(prescriptionSummary.protSintetica > metaPs && metaPs > 0) ? 'bg-red-50 border-red-300 text-red-800' : 'bg-indigo-50 border-indigo-300 text-indigo-800'}`}>
                          <span className="text-xs block">Ps Ofertada vs Meta ({metaPs.toFixed(1)})</span>
                          <span className="font-bold text-lg">{prescriptionSummary.protSintetica.toFixed(1)} g/dia</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {strategy === 'Cetogenica' && ketoGoals && (
                    <div className="bg-purple-50 p-4 border-t border-purple-200">
                      <p className="text-xs font-bold uppercase text-purple-700 mb-2">Monitoramento Cetogênico</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-2 bg-white rounded border border-purple-200 text-center">
                          <span className="text-[10px] text-slate-500 uppercase block">Ratio Atual da Dieta</span>
                          <span className="font-extrabold text-purple-900 text-lg">
                             {prescriptionSummary.prot + prescriptionSummary.cho > 0 ? (prescriptionSummary.lip / (prescriptionSummary.prot + prescriptionSummary.cho)).toFixed(1) : 0} : 1
                          </span>
                        </div>
                        <div className={`p-2 rounded border text-center ${prescriptionSummary.lip > ketoGoals.fatGrams ? 'bg-red-50 border-red-300 text-red-800' : 'bg-white border-slate-200 text-amber-600'}`}>
                          <span className="text-[10px] text-slate-500 uppercase block">Gordura (Meta: {ketoGoals.fatGrams.toFixed(0)}g)</span>
                          <span className="font-extrabold text-lg">{prescriptionSummary.lip.toFixed(1)} g</span>
                        </div>
                        <div className={`p-2 rounded border text-center ${prescriptionSummary.prot > ketoGoals.protGrams ? 'bg-red-50 border-red-300 text-red-800' : 'bg-white border-slate-200 text-blue-600'}`}>
                          <span className="text-[10px] text-slate-500 uppercase block">Proteína (Meta: {ketoGoals.protGrams.toFixed(0)}g)</span>
                          <span className="font-extrabold text-lg">{prescriptionSummary.prot.toFixed(1)} g</span>
                        </div>
                        <div className={`p-2 rounded border text-center ${prescriptionSummary.cho > ketoGoals.choGrams ? 'bg-red-50 border-red-300 text-red-800' : 'bg-white border-slate-200 text-emerald-600'}`}>
                          <span className="text-[10px] text-slate-500 uppercase block">CHO (Meta: {ketoGoals.choGrams.toFixed(0)}g)</span>
                          <span className="font-extrabold text-lg">{prescriptionSummary.cho.toFixed(1)} g</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-slate-900 text-white p-5"><h3 className="text-sm font-bold"><CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400"/> Adequação Nutricional Total</h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-y-4 gap-x-2">
                      <div className="col-span-2 md:col-span-2 border-r border-slate-700 pr-2">
                        <p className="text-slate-400 text-xs">Energia Total</p>
                        <p className="text-2xl font-bold">{prescriptionSummary.kcal.toFixed(0)} <span className="text-sm">kcal</span></p>
                        {eer > 0 && (
                          <p className={`text-xs font-bold mt-1 ${prescriptionSummary.kcal / eer >= 0.9 && prescriptionSummary.kcal / eer <= 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                            Alcançou {prescriptionSummary.kcal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kcal de {eer.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kcal da meta ({((prescriptionSummary.kcal / eer) * 100).toFixed(0)}%)
                          </p>
                        )}
                      </div>
                      <div className="col-span-2 md:col-span-1 border-r border-slate-700 pr-2">
                        <p className="text-slate-400 text-xs">Macronutrientes (g)</p>
                        <p className="text-sm"><span className="text-blue-400 font-bold">PT:</span> {prescriptionSummary.prot.toFixed(1)}</p>
                        <p className="text-sm"><span className="text-emerald-400 font-bold">CHO:</span> {prescriptionSummary.cho.toFixed(1)}</p>
                        <p className="text-sm"><span className="text-amber-400 font-bold">LIP:</span> {prescriptionSummary.lip.toFixed(1)}</p>
                      </div>
                      <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-slate-300">
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Volume</span><span className="font-bold text-white">{prescriptionSummary.volume.toFixed(0)} ml</span></div>
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Fibras</span><span className="font-bold text-white">{prescriptionSummary.fibras.toFixed(1)} g</span></div>
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Sódio</span><span className="font-bold text-white">{prescriptionSummary.na.toFixed(1)} mg</span></div>
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Cálcio</span><span className="font-bold text-white">{prescriptionSummary.ca.toFixed(1)} mg</span></div>
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Fósforo</span><span className="font-bold text-white">{prescriptionSummary.p.toFixed(1)} mg</span></div>
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Ferro</span><span className="font-bold text-white">{prescriptionSummary.fe.toFixed(1)} mg</span></div>
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Potássio</span><span className="font-bold text-white">{prescriptionSummary.k.toFixed(1)} mg</span></div>
                        <div className="bg-slate-800 p-2 rounded"><span className="text-xs block text-slate-500">Cloreto</span><span className="font-bold text-white">{prescriptionSummary.cl.toFixed(1)} mg</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: META PROTEICA DE DOENÇAS METABÓLICAS */}
          {activeTab === 'mma' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in print:hidden">
              <div className="bg-indigo-50 rounded-xl shadow-inner border border-indigo-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-900"><Beaker className="w-6 h-6" /> Meta proteica de doenças metabólicas</h2>
                  {canManageClinicalData && <button onClick={() => setEditLimits(!editLimits)} className={`px-4 py-2 text-sm font-bold rounded-lg flex items-center gap-2 transition-colors ${editLimits ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-indigo-800 border border-indigo-300 hover:bg-indigo-100'}`}>
                    {editLimits ? <><Save className="w-4 h-4"/> Salvar Limites no CID</> : <><Edit3 className="w-4 h-4"/> Editar Faixas do CID</>}
                  </button>}
                </div>
                
                <p className="text-sm text-indigo-800 mb-6">Configure os fatores proteicos abaixo. Eles alimentarão o sistema de bloqueio de segurança na aba de Prescrição Diária (quando a estratégia Metabólica estiver selecionada).</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-slate-700">Faixa Segura Prot. Total (PT)</label>
                        {editLimits ? (
                          <div className="flex gap-2 items-center text-sm"><input type="number" step="0.1" value={selectedCid?.ptMin || 0} onFocus={selectNumericInput} onChange={(e)=>updateCidLimits('ptMin', e.target.value)} className="w-16 p-1 border rounded text-center"/> a <input type="number" step="0.1" value={selectedCid?.ptMax || 0} onFocus={selectNumericInput} onChange={(e)=>updateCidLimits('ptMax', e.target.value)} className="w-16 p-1 border rounded text-center"/></div>
                        ) : ( <span className="text-sm font-mono bg-slate-100 px-3 py-1 rounded-md border border-slate-200">{selectedCid?.ptMin || 0} a {selectedCid?.ptMax || 0} g/kg</span> )}
                      </div>
                      <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                        <span className="text-sm font-bold text-indigo-800">Fator PT Escolhido (g/kg):</span>
                        <input type="number" step="0.1" value={mmaFactors.pt} onFocus={selectNumericInput} onChange={e => setMmaFactors({...mmaFactors, pt: Number(e.target.value)})} className="w-24 p-2 font-bold text-xl bg-white border-b-2 border-indigo-500 focus:outline-none text-center rounded shadow-sm" />
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-slate-700">Faixa Segura Prot. Natural (Pnat)</label>
                        {editLimits ? (
                          <div className="flex gap-2 items-center text-sm"><input type="number" step="0.1" value={selectedCid?.pnatMin || 0} onFocus={selectNumericInput} onChange={(e)=>updateCidLimits('pnatMin', e.target.value)} className="w-16 p-1 border rounded text-center"/> a <input type="number" step="0.1" value={selectedCid?.pnatMax || 0} onFocus={selectNumericInput} onChange={(e)=>updateCidLimits('pnatMax', e.target.value)} className="w-16 p-1 border rounded text-center"/></div>
                        ) : ( <span className="text-sm font-mono bg-slate-100 px-3 py-1 rounded-md border border-slate-200">{selectedCid?.pnatMin || 0} a {selectedCid?.pnatMax || 0} g/kg</span> )}
                      </div>
                      <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <span className="text-sm font-bold text-emerald-800">Fator Pnat Escolhido (g/kg):</span>
                        <input type="number" step="0.1" value={mmaFactors.pnat} onFocus={selectNumericInput} onChange={e => setMmaFactors({...mmaFactors, pnat: Number(e.target.value)})} className="w-24 p-2 font-bold text-xl bg-white border-b-2 border-emerald-500 focus:outline-none text-center rounded shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {!patient.weight || patient.weight <= 0 ? (
                    <div role="alert" className="flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-100 p-4 text-sm font-semibold text-amber-950">
                      <ShieldAlert className="h-5 w-5 flex-shrink-0 text-amber-700" />
                      <p>⚠️ Informe o Peso do paciente na aba 'Dados e EER' para calcular as metas diárias em gramas.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 text-center h-full">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-center shadow-sm">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Meta - Proteína Total (PT) / Dia</p>
                        <p className="text-4xl font-extrabold text-indigo-900">{metaPT.toFixed(1)} <span className="text-lg font-normal text-slate-500">g</span></p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-center shadow-sm">
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Meta - Proteína Natural (Pnat) / Dia</p>
                        <p className="text-4xl font-extrabold text-emerald-700">{metaPnat.toFixed(1)} <span className="text-lg font-normal text-emerald-600/50">g</span></p>
                      </div>
                      <div className="bg-slate-800 p-4 rounded-xl flex flex-col justify-center shadow-lg">
                        <p className="text-xs text-slate-300 font-bold uppercase tracking-wider mb-1">Meta - Proteína Sintética (Ps) / Dia</p>
                        <p className="text-4xl font-extrabold text-white">{metaPs.toFixed(1)} <span className="text-lg font-normal text-slate-400">g</span></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CETOGÊNICA (ISOLADA) */}
          {activeTab === 'keto' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in print:hidden">
              <div className="bg-purple-50 rounded-xl shadow-inner border border-purple-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-purple-900"><HeartPulse className="w-6 h-6" /> Configuração Dieta Cetogênica</h2>
                </div>
                
                <p className="text-sm text-purple-800 mb-6">Configure a proporção e o fator proteico para o paciente. O sistema usará o EER ({eer} kcal) para distribuir as gramas de gordura e carboidrato com exatidão.</p>

                {ketoGoals ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-white p-5 rounded-xl border border-purple-200 flex justify-between items-center shadow-sm">
                        <div>
                          <label className="block text-sm font-bold text-purple-900">Proporção (Lipídios : Prot+CHO)</label>
                          <p className="text-xs text-slate-500 mt-1">Gorduras para cada 1g de componentes não-gordurosos.</p>
                        </div>
                        <select value={ketoRatio} onChange={e => setKetoRatio(Number(e.target.value))} className="p-3 bg-purple-100 border border-purple-300 text-purple-900 rounded-xl font-extrabold text-lg focus:ring-2 focus:ring-purple-500">
                          <option value={1}>1 : 1</option>
                          <option value={1.5}>1.5 : 1</option>
                          <option value={2}>2 : 1</option>
                          <option value={2.5}>2.5 : 1</option>
                          <option value={3}>3 : 1</option>
                          <option value={4}>4 : 1</option>
                        </select>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-purple-200 flex justify-between items-center shadow-sm">
                        <div>
                          <label className="block text-sm font-bold text-slate-700">Fator de Proteína (g/kg)</label>
                          <p className="text-xs text-slate-500 mt-1">Cota proteica basal (independente da dieta).</p>
                        </div>
                        <input type="number" step="0.1" value={ketoProtFactor} onFocus={selectNumericInput} onChange={e => setKetoProtFactor(Number(e.target.value))} className="w-24 p-3 font-extrabold text-xl bg-slate-100 border-b-2 border-slate-500 focus:outline-none text-center rounded-t shadow-inner" />
                      </div>
                      <div className="text-xs text-purple-700 bg-purple-100 p-3 rounded-lg">
                        <strong>EER Base:</strong> {eer} kcal <br/>
                        Distribuição calculada automaticamente isolando a cota proteica e alocando o restante em {ketoRatio} gramas de gordura para cada 1 grama de CHO.
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 text-center h-full">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col justify-center shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-400"></div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Meta Gorduras ({ketoGoals.fatPct.toFixed(0)}% VCT)</p>
                        <p className="text-3xl font-extrabold text-amber-500">{ketoGoals.fatGrams.toFixed(1)}g <span className="text-sm text-slate-400 font-normal">({ketoGoals.fatKcal.toFixed(0)} kcal)</span></p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col justify-center shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-400"></div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Meta Proteínas ({ketoGoals.protPct.toFixed(0)}% VCT)</p>
                        <p className="text-3xl font-extrabold text-blue-500">{ketoGoals.protGrams.toFixed(1)}g <span className="text-sm text-slate-400 font-normal">({ketoGoals.protKcal.toFixed(0)} kcal)</span></p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col justify-center shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-400"></div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Meta Carboidratos ({ketoGoals.choPct.toFixed(0)}% VCT)</p>
                        <p className="text-3xl font-extrabold text-emerald-500">{ketoGoals.choGrams.toFixed(1)}g <span className="text-sm text-slate-400 font-normal">({ketoGoals.choKcal.toFixed(0)} kcal)</span></p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-white rounded-xl border border-red-200 text-center text-red-600 font-bold flex flex-col items-center gap-2">
                    <ShieldAlert className="w-8 h-8"/>
                    Para calcular a Dieta Cetogênica, primeiro informe os dados de Peso, Idade e Fator de Estresse na aba "Dados e EER".
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: BANCO DE DADOS (ABA 4 REFINADA) */}
          {activeTab === 'database' && (
            <div className="space-y-6 animate-in fade-in print:hidden">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-800"><Database className="w-6 h-6 text-indigo-600" /> Central de Dados e Cadastros</h2>
                
                <div className="flex border-b border-slate-200 mb-6">
                  <button onClick={() => setDbSubTab('formulas')} className={`px-6 py-3 font-bold text-sm transition-colors border-b-2 ${dbSubTab === 'formulas' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>1. Fórmulas e Suplementos</button>
                  <button onClick={() => setDbSubTab('cids')} className={`px-6 py-3 font-bold text-sm transition-colors border-b-2 ${dbSubTab === 'cids' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>2. Doenças (CIDs) e Limites</button>
                  {currentRole === 'superadmin' && <button onClick={() => setDbSubTab('staff')} className={`px-6 py-3 font-bold text-sm transition-colors border-b-2 ${dbSubTab === 'staff' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>3. Acessos da equipe</button>}
                </div>

                {dbSubTab === 'formulas' && (
                  <div className="space-y-8 animate-in slide-in-from-left-2">
                    {canManageClinicalData && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2"><FileSpreadsheet className="w-5 h-5"/> Fórmulas e suplementos</h3>
                        <div className="flex flex-wrap items-center gap-4">
                        <button onClick={handleDownloadTemplate} className="text-indigo-700 text-sm font-bold flex items-center gap-1 hover:underline"><Download className="w-4 h-4" /> Baixar exemplo</button>
                        <button onClick={handleDownloadCatalog} className="text-indigo-700 text-sm font-bold flex items-center gap-1 hover:underline"><Download className="w-4 h-4" /> Exportar catálogo</button>
                        <div className="relative">
                          <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="file-upload" />
                          <label htmlFor="file-upload" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow-sm"><Upload className="w-5 h-5" /> Importar CSV</label>
                        </div>
                      </div>
                      </div>
                    </div>
                    )}

                    {canManageClinicalData && formulaImportPreview && (
                      <div className="border border-indigo-200 rounded-xl overflow-hidden">
                        <div className="bg-indigo-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-indigo-950">Prévia: {formulaImportPreview.fileName}</h3>
                            <p className="text-sm text-indigo-800">{formulaImportPreview.items.filter(item => item.action === 'create' && !item.errors.length).length} novas · {formulaImportPreview.items.filter(item => item.action === 'update' && !item.errors.length).length} atualizações · {formulaImportPreview.items.filter(item => item.errors.length).length} com erro</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setFormulaImportPreview(null)} disabled={isImportingFormulas} className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold disabled:opacity-50">Descartar</button>
                            <button onClick={handleConfirmFormulaImport} disabled={isImportingFormulas || formulaImportPreview.items.some(item => item.errors.length)} className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-bold disabled:bg-slate-400">{isImportingFormulas ? 'Importando...' : 'Confirmar importação'}</button>
                          </div>
                        </div>
                        {formulaImportPreview.items.some(item => item.errors.length) && <p className="px-4 py-3 bg-red-50 text-red-800 text-sm">Corrija as linhas indicadas na planilha e selecione o arquivo novamente. Nenhuma linha será gravada enquanto houver erros.</p>}
                        <div className="max-h-72 overflow-auto">
                          <table className="w-full min-w-[760px] text-sm text-left">
                            <thead className="sticky top-0 bg-white text-xs uppercase text-slate-500"><tr><th className="p-3">Linha</th><th className="p-3">Operação</th><th className="p-3">ID</th><th className="p-3">Fórmula</th><th className="p-3">Validação</th></tr></thead>
                            <tbody>{formulaImportPreview.items.map(item => <tr key={item.rowNumber} className="border-t border-slate-100"><td className="p-3">{item.rowNumber}</td><td className="p-3 font-semibold">{item.action === 'update' ? 'Atualizar' : 'Cadastrar'}</td><td className="p-3 font-mono text-xs">{item.id || 'Novo'}</td><td className="p-3">{item.data.name || '—'}</td><td className={`p-3 ${item.errors.length ? 'text-red-700' : 'text-emerald-700'}`}>{item.errors.length ? item.errors.join('; ') : 'Pronta'}</td></tr>)}</tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="bg-slate-100 px-4 py-3 font-bold text-slate-700 text-sm">Fórmulas disponíveis ({formulas.length})</div>
                      <div className="max-h-[32rem] overflow-auto">
                        <table className="w-full min-w-[2200px] text-xs text-left">
                          <thead className="bg-slate-50 sticky top-0 uppercase text-slate-500">
                            <tr><th className="p-3">Nome</th><th className="p-3">Tipo/Categoria</th><th className="p-3">Idade mínima (meses)</th><th className="p-3">Idade máxima (meses)</th><th className="p-3">Lata (g)</th><th className="p-3">Referência (g)</th><th className="p-3">Medida (g)</th><th className="p-3">Diluição (ml)</th><th className="p-3">Kcal</th><th className="p-3">Proteínas (g)</th><th className="p-3">Carboidratos (g)</th><th className="p-3">Gorduras (g)</th><th className="p-3">Fibras (g)</th><th className="p-3">Sódio (mg)</th><th className="p-3">Cálcio (mg)</th><th className="p-3">Ferro (mg)</th><th className="p-3">Potássio (mg)</th><th className="p-3">Cloreto (mg)</th><th className="p-3">Fósforo (mg)</th><th className="p-3">Soja</th><th className="p-3">Leite</th><th className="p-3">Glúten</th>{canManageClinicalData && <th className="p-3 text-center">Ações</th>}</tr>
                          </thead>
                          <tbody>
                            {formulas.map(f => (
                              <tr key={f.id} className="border-b hover:bg-slate-50">
                                <td className="p-3 font-bold text-slate-800">{f.name}</td><td className="p-3">{f.category}</td><td className="p-3">{f.ageMinMonths ?? '—'}</td><td className="p-3">{f.ageMaxMonths ?? '—'}</td><td className="p-3">{f.lataG}</td><td className="p-3">{f.refG}</td><td className="p-3">{f.medidaG}</td><td className="p-3">{f.diluicao}</td><td className="p-3">{f.kcal}</td><td className="p-3">{f.prot}</td><td className="p-3">{f.cho}</td><td className="p-3">{f.lip}</td><td className="p-3">{f.fibras ?? '—'}</td><td className="p-3">{f.na}</td><td className="p-3">{f.ca}</td><td className="p-3">{f.fe}</td><td className="p-3">{f.k}</td><td className="p-3">{f.cl}</td><td className="p-3">{f.p}</td><td className="p-3">{f.allergenSoy == null ? '—' : f.allergenSoy ? '1 (sim)' : '0 (não)'}</td><td className="p-3">{f.allergenMilk == null ? '—' : f.allergenMilk ? '1 (sim)' : '0 (não)'}</td><td className="p-3">{f.allergenGluten == null ? '—' : f.allergenGluten ? '1 (sim)' : '0 (não)'}</td>{canManageClinicalData && <td className="p-3 text-center"><button type="button" onClick={() => void handleDeleteFormula(f)} disabled={deletingFormulaId === f.id} aria-label={`Excluir ${f.name}`} title="Excluir fórmula" className="rounded p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button></td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {dbSubTab === 'cids' && (
                  <div className="space-y-8 animate-in slide-in-from-right-2">
                    {canManageClinicalData && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                      <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                        {newCid.id ? <><Edit3 className="w-5 h-5"/> Editando CID</> : <><Settings2 className="w-5 h-5"/> Cadastrar Novo Diagnóstico (CID)</>}
                      </h3>
                      <form onSubmit={handleAddNewCid} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
                        <div className="md:col-span-1"><label className="block text-xs font-semibold">Código CID</label><input required type="text" value={newCid.id} onChange={e => setNewCid({...newCid, id: e.target.value})} disabled={!!newCid.id && cids.some(c=> c.id === newCid.id)} placeholder="Ex: E71.1" className="w-full p-2 border rounded disabled:bg-slate-200" /></div>
                        <div className="md:col-span-3"><label className="block text-xs font-semibold">Descrição da Doença</label><input required type="text" value={newCid.name} onChange={e => setNewCid({...newCid, name: e.target.value})} className="w-full p-2 border rounded" /></div>
                        <div className="md:col-span-2 flex items-end pb-2">
                          <label className="flex items-center gap-2 text-sm font-bold text-orange-700 cursor-pointer"><input type="checkbox" checked={newCid.isRare} onChange={e => setNewCid({...newCid, isRare: e.target.checked})} className="w-5 h-5 accent-orange-600"/> É Doença Rara (Abre Painel Metabólico)?</label>
                        </div>
                        {newCid.isRare && (
                          <div className="md:col-span-6 grid grid-cols-4 gap-4 p-4 bg-white border border-orange-200 rounded-lg animate-in fade-in">
                            <p className="col-span-4 text-xs font-bold text-slate-500 uppercase">Definir Faixas de Proteína Recomendadas (g/kg)</p>
                            <div><label className="block text-xs font-semibold">PT Mínima</label><input type="number" step="0.1" value={newCid.ptMin} onFocus={selectNumericInput} onChange={e => setNewCid({...newCid, ptMin: Number(e.target.value)})} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-xs font-semibold">PT Máxima</label><input type="number" step="0.1" value={newCid.ptMax} onFocus={selectNumericInput} onChange={e => setNewCid({...newCid, ptMax: Number(e.target.value)})} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-xs font-semibold">Pnat Mínima</label><input type="number" step="0.1" value={newCid.pnatMin} onFocus={selectNumericInput} onChange={e => setNewCid({...newCid, pnatMin: Number(e.target.value)})} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-xs font-semibold">Pnat Máxima</label><input type="number" step="0.1" value={newCid.pnatMax} onFocus={selectNumericInput} onChange={e => setNewCid({...newCid, pnatMax: Number(e.target.value)})} className="w-full p-2 border rounded" /></div>
                          </div>
                        )}
                        <div className="md:col-span-6 mt-2 flex gap-2">
                           <button type="submit" className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {newCid.id && cids.some(c=> c.id === newCid.id) ? 'Salvar Edição do CID' : 'Cadastrar CID'}</button>
                           {newCid.id && cids.some(c=> c.id === newCid.id) && <button type="button" onClick={() => setNewCid({ id: '', name: '', isRare: false, ptMin: 0, ptMax: 0, pnatMin: 0, pnatMax: 0 })} className="px-4 py-2 bg-orange-200 text-orange-800 font-bold rounded-lg hover:bg-orange-300">Cancelar</button>}
                        </div>
                      </form>
                    </div>
                    )}

                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="bg-slate-100 px-4 py-3 font-bold text-slate-700 text-sm">Doenças Cadastradas ({cids.length})</div>
                      <div className="max-h-64 overflow-y-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 sticky top-0 uppercase text-slate-500">
                            <tr><th className="p-3">CID</th><th className="p-3">Doença</th><th className="p-3">Limites (PT)</th>{canManageClinicalData && <th className="p-3 text-center">Ações</th>}</tr>
                          </thead>
                          <tbody>
                            {cids.map(c => (
                              <tr key={c.id} className="border-b hover:bg-slate-50">
                                <td className="p-3 font-bold text-slate-800">{c.id}</td>
                                <td className="p-3">{c.name}</td>
                                <td className="p-3">{c.isRare ? `${c.ptMin} a ${c.ptMax} g/kg` : 'Sem limites restritos'}</td>
                                {canManageClinicalData && <td className="p-3 text-center">
                                  <button onClick={() => handleEditCid(c)} className="text-orange-600 hover:bg-orange-100 p-1.5 rounded transition-colors flex items-center justify-center mx-auto" title="Editar CID">
                                    <Edit3 className="w-4 h-4"/>
                                  </button>
                                </td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {dbSubTab === 'staff' && currentRole === 'superadmin' && (
                  <section className="space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-800">Contas e níveis de acesso</h3>
                      <p className="text-sm text-slate-600">Aprove contas institucionais como admin ou consultor. Admin pode alterar cadastros; consultor só consulta e usa os cálculos.</p>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full min-w-[540px] text-sm text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">E-mail</th><th className="p-3">UID</th><th className="p-3">Nível</th></tr></thead>
                        <tbody>{staffMembers.map(member => <tr key={member.uid} className="border-t border-slate-100"><td className="p-3 font-medium">{member.email || 'E-mail não informado'}</td><td className="p-3 font-mono text-xs">{member.uid}</td><td className="p-3">{member.role === 'superadmin' ? <span className="font-bold text-indigo-700">Superadmin</span> : <select value={member.role} onChange={event => void handleStaffRoleChange(member.uid, event.target.value as Exclude<StaffRole, 'superadmin'>)} className="rounded border border-slate-300 p-2"><option value="pending">Pendente</option><option value="admin">Admin</option><option value="consultant">Consultor</option><option value="disabled">Bloqueado</option></select>}</td></tr>)}</tbody>
                      </table>
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}

          {/* TAB: RELATÓRIO / LME */}
          {activeTab === 'report' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in print:shadow-none print:border-none print:p-0 print:text-[12px]">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200 print:hidden">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Landmark className="w-6 h-6 text-blue-600"/> Laudo para Processo Administrativo</h2>
                </div>
                <button onClick={handlePrint} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 shadow-sm">
                  <Printer className="w-5 h-5" /> Imprimir Relatório Oficial
                </button>
              </div>

              <div className="print:text-black">
                <div className="text-center mb-6 border-b-2 border-black pb-4">
                  <h1 className="text-xl font-extrabold uppercase">Prescrição e Adequação Nutricional</h1>
                  <p className="text-sm uppercase text-slate-600 print:text-black mt-1">Solicitação de Fórmula Enteral / Modulares</p>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-6 border border-slate-800 p-4 rounded-md">
                  <p><strong>Paciente:</strong> {patient.name}</p>
                  <p><strong>Matrícula:</strong> {patient.matricula}</p>
                  <p><strong>Idade:</strong> {patient.ageValue} {patient.ageUnit} ({patient.gender})</p>
                  <p><strong>Peso / Altura:</strong> {patient.weight} kg / {patient.height} cm</p>
                  <p><strong>Meta Energética Calculada:</strong> {eer} kcal/dia</p>
                  <p><strong>Diagnóstico:</strong> {selectedCid?.name || (patient.cidId === 'not-applicable' ? 'Não se aplica' : 'Não informado')}</p>
                  <p><strong>Restrições alimentares registradas:</strong> {patientAllergySummary}</p>
                  <div className="col-span-2 mt-2"><p><strong>Justificativa Clínica:</strong> {patient.clinicalHistory}</p></div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-md border-b border-slate-800 mb-2 uppercase">1. Esquema Dietético Fragmentado</h3>
                  <p className="text-sm mb-2">Via de Administração: <strong>{patient.viaAdmin}</strong>. Ofertado em <strong>{patient.dosesPerDay} dietas/porções diárias</strong>.</p>
                  <table className="w-full text-sm border-collapse border border-slate-800 mt-2">
                    <thead className="bg-slate-200 print:bg-gray-200 text-[11px] uppercase">
                      <tr>
                        <th className="border border-slate-800 p-2 text-left">Fórmula/Componente</th>
                        <th className="border border-slate-800 p-2 text-center">Grama Total (Dia)</th>
                        <th className="border border-slate-800 p-2 text-center">Grama (Por Dieta)</th>
                        <th className="border border-slate-800 p-2 text-center">Água (Por Dieta)</th>
                        <th className="border border-slate-800 p-2 text-center bg-gray-300 font-bold">LATAS / MÊS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription.map(item => {
                        const hasValidDoseCount = Number.isInteger(patient.dosesPerDay) && patient.dosesPerDay > 0;
                        const doseG = hasValidDoseCount ? item.prescribedGrams / patient.dosesPerDay : null;
                        const scoopsPerDose = doseG !== null && isPositiveFinite(item.medidaG) ? doseG / item.medidaG : null;
                        const doseV = scoopsPerDose !== null && Number.isFinite(item.diluicao) && item.diluicao >= 0
                          ? scoopsPerDose * item.diluicao
                          : null;
                        const latas = isPositiveFinite(item.lataG) ? Math.ceil((item.prescribedGrams * 30) / item.lataG) : null;
                        
                        const factor = isPositiveFinite(item.refG) ? item.prescribedGrams / item.refG : 0;
                        const iKcal = item.kcal * factor;
                        const iProt = item.prot * factor;
                        const iCho = item.cho * factor;
                        const iLip = item.lip * factor;
                        const iFib = (item.fibras || 0) * factor;
                        const iNa = (item.na || 0) * factor;
                        const iCa = (item.ca || 0) * factor;
                        const iFe = (item.fe || 0) * factor;
                        const iK = (item.k || 0) * factor;
                        const iCl = (item.cl || 0) * factor;
                        const iP = (item.p || 0) * factor;

                        return (
                          <React.Fragment key={item.prescriptionId}>
                            <tr>
                              <td className="border-l border-t border-r border-slate-800 p-2 font-bold">{item.name}<div className="text-xs font-normal text-red-700">Alergênicos: {formulaAllergenStatus(item)}</div></td>
                              <td className="border border-slate-800 p-2 text-center bg-gray-100">{item.prescribedGrams} g</td>
                              <td className="border border-slate-800 p-2 text-center font-bold">{doseG === null ? '—' : `${doseG.toFixed(1)} g`}</td>
                              <td className="border border-slate-800 p-2 text-center">{doseV === null ? '—' : `${doseV.toFixed(0)} ml`}</td>
                              <td className="border border-slate-800 p-2 text-center font-extrabold bg-gray-100">{latas ?? '—'}</td>
                            </tr>
                            <tr>
                              <td colSpan={5} className="border-l border-b border-r border-slate-800 p-1.5 bg-slate-50 print:bg-white text-[10px] text-gray-700">
                                <b>Detalhamento:</b> Kcal: {iKcal.toFixed(1)} | Prot: {iProt.toFixed(1)}g | CHO: {iCho.toFixed(1)}g | Gord: {iLip.toFixed(1)}g | Fibras: {iFib.toFixed(1)}g | Na: {iNa.toFixed(1)}mg | Ca: {iCa.toFixed(1)}mg | Fe: {iFe.toFixed(1)}mg | K: {iK.toFixed(1)}mg | Cl: {iCl.toFixed(1)}mg | P: {iP.toFixed(1)}mg
                              </td>
                            </tr>
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-md border-b border-slate-800 mb-2 uppercase">2. Adequação Nutricional Alcançada</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-sm bg-slate-50 print:bg-white border border-slate-800 p-3 rounded-md">
                    <div className="p-2 border-r border-b border-slate-300 col-span-2">
                      <span className="font-semibold block text-slate-600 text-xs">Energia Ofertada</span> 
                      <span className="font-bold text-lg">{prescriptionSummary.kcal.toFixed(1)} kcal</span>
                      {eer > 0 && <span className="text-xs font-bold print:text-black ml-2">({((prescriptionSummary.kcal / eer) * 100).toFixed(1)}% Meta)</span>}
                    </div>
                    <div className="p-2 border-r border-b border-slate-300">
                      <span className="font-semibold block text-slate-600 text-xs">Volume Hídrico (Dieta)</span> 
                      <span className="font-bold">{prescriptionSummary.volume.toFixed(0)} ml</span>
                    </div>
                    <div className="p-2 border-r border-b border-slate-300">
                      <span className="font-semibold block text-slate-600 text-xs">Proteína</span> 
                      <span className="font-bold">{prescriptionSummary.prot.toFixed(1)} g</span>
                    </div>
                    <div className="p-2 border-r border-b border-slate-300">
                      <span className="font-semibold block text-slate-600 text-xs">Carboidratos</span> 
                      <span className="font-bold">{prescriptionSummary.cho.toFixed(1)} g</span>
                    </div>
                    <div className="p-2 border-b border-slate-300">
                      <span className="font-semibold block text-slate-600 text-xs">Lipídios</span> 
                      <span className="font-bold">{prescriptionSummary.lip.toFixed(1)} g</span>
                    </div>

                    {/* Micros */}
                    <div className="p-2 border-r border-slate-300"><span className="text-xs block text-slate-600">Fibras</span> <span className="font-bold">{prescriptionSummary.fibras.toFixed(1)}g</span></div>
                    <div className="p-2 border-r border-slate-300"><span className="text-xs block text-slate-600">Sódio</span> <span className="font-bold">{prescriptionSummary.na.toFixed(1)}mg</span></div>
                    <div className="p-2 border-r border-slate-300"><span className="text-xs block text-slate-600">Cálcio</span> <span className="font-bold">{prescriptionSummary.ca.toFixed(1)}mg</span></div>
                    <div className="p-2 border-r border-slate-300"><span className="text-xs block text-slate-600">Fósforo</span> <span className="font-bold">{prescriptionSummary.p.toFixed(1)}mg</span></div>
                    <div className="p-2 border-r border-slate-300"><span className="text-xs block text-slate-600">Ferro</span> <span className="font-bold">{prescriptionSummary.fe.toFixed(1)}mg</span></div>
                    <div className="p-2"><span className="text-xs block text-slate-600">Potássio</span> <span className="font-bold">{prescriptionSummary.k.toFixed(1)}mg</span></div>
                  </div>
                </div>

                <div className="mt-16 pt-6 border-t border-black text-center max-w-sm mx-auto">
                  <p className="font-bold text-sm">Assinatura e Carimbo (Nutrição / Medicina)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
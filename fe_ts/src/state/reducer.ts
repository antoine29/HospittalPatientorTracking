import { State } from "./state";
import { Patient } from "../types/PatientTypes";
import { Diagnosis } from "../types/EntryTypes";

export type Action =
  {
    type: "SET_PATIENTS";
    payload: Patient[];
  } |
  {
    type: "ADD_PATIENT";
    payload: Patient;
  } |
  {
    type: "UPDATE_PATIENT";
    payload: Patient | undefined;
  } |
  {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENTS":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":{
      if(action.payload){
        const updatedPatients = { ...state.patients };
        updatedPatients[action.payload.id] = action.payload;
        return {
          ...state,
          patients: updatedPatients
        };
      }

      return { ...state };
    }
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: [
          ...action.payload,
          ...state.diagnoses
        ]
      };
    default:
      return state;
  }
};

export const setPatients = (patients: Patient[]): Action => ({
  type: "SET_PATIENTS",
  payload: patients
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient
});

export const updatePatient = (patient: Patient | undefined): Action => ({
  type: "UPDATE_PATIENT",
  payload: patient
});

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES",
  payload: diagnoses
});
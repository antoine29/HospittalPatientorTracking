import { Entry } from './EntryTypes';

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export interface CreatePatientResponse {
  createPatient: Patient;
}

export interface NewPatient extends Omit<Patient, 'id' | 'entries'>{};

export interface GetPatientsResponse {
  Patients: Patient[];
}

export interface GetPatientResponse {
  Patient: Patient;
}
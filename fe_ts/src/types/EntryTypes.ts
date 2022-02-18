export interface Diagnosis {
    id: string;
    code: string;
    name: string;
    latin: string;
}

export interface GetDiagnosesResponse {
    Diagnoses: Array<Diagnosis>;
}

export enum EntryTypes {
    HospitalEntry = "Hospital",
    OccupationalHealthEntry = 'OccupationalHealth',
    HealthCheckEntry = 'HealthCheck'
}

export interface Entry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnoses: Array<Diagnosis>;
    type: EntryTypes;
    patientId: string;
}

export interface NewEntry extends Omit<Entry, 'id' | 'diagnoses'> {
    diagnosisIDs: Array<Diagnosis['code']>;
}

export interface FormEntry extends NewEntry {
    //healthCheck
    healthCheckRating: HealthCheckRating;

    //hospital
    //discharge: HospitalDischarge;

    //occupational
    employerName: string;
    sickLeave: SickLeave;
}

export enum HealthCheckRating {
    Healthy = 'Healthy',
    LowRisk = 'LowRisk',
    HighRisk = 'HighRisk',
    CriticalRisk ='CriticalRisk'
}

export interface HealthCheckEntry extends Entry {
    healthCheckRating: HealthCheckRating;
}

export interface NewHealthCheckEntry extends NewEntry {
    healthCheckRating: HealthCheckRating;
};

export interface CreateNewHealthCheckEntryResponse {
    HealthCheckEntry: HealthCheckEntry;
}

interface HospitalDischarge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends Entry {
    discharge?: HospitalDischarge;
}

export interface NewHospitalEntry extends NewEntry {}

export interface CreateNewHospitalEntryResponse {
    HospitalEntry: HospitalEntry;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthEntry extends Entry {
    type: EntryTypes;
    employerName: string;
    sickLeave?: SickLeave;
}

export interface NewOccupationalHealthEntry extends Omit<OccupationalHealthEntry, 'id' | 'diagnoses' | 'sickLeave'> {
    diagnosisIDs: Array<Diagnosis['code']>;
}

export interface CreateNewOccupationalHealthEntryResponse {
    OccupationalHealthEntry: OccupationalHealthEntry;
}

export type NewEntries =
    | NewHospitalEntry
    | NewOccupationalHealthEntry
    | NewHealthCheckEntry;
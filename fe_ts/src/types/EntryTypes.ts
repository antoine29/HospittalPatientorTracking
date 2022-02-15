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
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends Entry {
    healthCheckRating: HealthCheckRating;
}

export interface NewHealthCheckEntry extends NewEntry {
    healthCheckRating: HealthCheckRating;
};

interface HospitalDischarge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends Entry {
    discharge?: HospitalDischarge;
}

export interface NewHospitalEntry extends NewEntry {}

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

export type NewEntries =
    | NewHospitalEntry
    | NewOccupationalHealthEntry
    | NewHealthCheckEntry;
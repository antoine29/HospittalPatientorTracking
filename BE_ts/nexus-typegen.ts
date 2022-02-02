/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  HospitalDischargeInput: { // input type
    criteria?: string | null; // String
    date?: string | null; // String
  }
}

export interface NexusGenEnums {
  Gender: "Female" | "Male" | "Other"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Diagnosis: { // root type
    code?: string | null; // String
    id: string; // String!
    latin?: string | null; // String
    name?: string | null; // String
  }
  HealthCheckEntry: { // root type
    date?: string | null; // String
    description?: string | null; // String
    diagnoses?: Array<NexusGenRootTypes['Diagnosis'] | null> | null; // [Diagnosis]
    healthCheckRating?: string | null; // String
    id: string; // String!
    patient?: NexusGenRootTypes['Patient'] | null; // Patient
    specialist?: string | null; // String
    type?: string | null; // String
  }
  HospitalDischarge: { // root type
    criteria?: string | null; // String
    date?: string | null; // String
    hospitalEntry?: NexusGenRootTypes['HospitalEntry'] | null; // HospitalEntry
    id: string; // String!
  }
  HospitalEntry: { // root type
    date?: string | null; // String
    description?: string | null; // String
    diagnoses?: Array<NexusGenRootTypes['Diagnosis'] | null> | null; // [Diagnosis]
    discharge?: NexusGenRootTypes['HospitalDischarge'] | null; // HospitalDischarge
    healthCheckRating?: string | null; // String
    id: string; // String!
    patient?: NexusGenRootTypes['Patient'] | null; // Patient
    specialist?: string | null; // String
    type?: string | null; // String
  }
  Mutation: {};
  Patient: { // root type
    dateOfBirth?: string | null; // String
    gender?: NexusGenEnums['Gender'] | null; // Gender
    healthCheckEntries?: Array<NexusGenRootTypes['HealthCheckEntry'] | null> | null; // [HealthCheckEntry]
    id: string; // String!
    name?: string | null; // String
    occupation?: string | null; // String
    ssn?: string | null; // String
  }
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Diagnosis: { // field return type
    code: string | null; // String
    id: string; // String!
    latin: string | null; // String
    name: string | null; // String
  }
  HealthCheckEntry: { // field return type
    date: string | null; // String
    description: string | null; // String
    diagnoses: Array<NexusGenRootTypes['Diagnosis'] | null> | null; // [Diagnosis]
    healthCheckRating: string | null; // String
    id: string; // String!
    patient: NexusGenRootTypes['Patient'] | null; // Patient
    specialist: string | null; // String
    type: string | null; // String
  }
  HospitalDischarge: { // field return type
    criteria: string | null; // String
    date: string | null; // String
    hospitalEntry: NexusGenRootTypes['HospitalEntry'] | null; // HospitalEntry
    id: string; // String!
  }
  HospitalEntry: { // field return type
    date: string | null; // String
    description: string | null; // String
    diagnoses: Array<NexusGenRootTypes['Diagnosis'] | null> | null; // [Diagnosis]
    discharge: NexusGenRootTypes['HospitalDischarge'] | null; // HospitalDischarge
    healthCheckRating: string | null; // String
    id: string; // String!
    patient: NexusGenRootTypes['Patient'] | null; // Patient
    specialist: string | null; // String
    type: string | null; // String
  }
  Mutation: { // field return type
    Diagnosis: NexusGenRootTypes['Diagnosis']; // Diagnosis!
    HealthCheckEntry: NexusGenRootTypes['HealthCheckEntry']; // HealthCheckEntry!
    HospitalEntry: NexusGenRootTypes['HospitalEntry']; // HospitalEntry!
    HospitalEntryDischarge: NexusGenRootTypes['HospitalEntry'] | null; // HospitalEntry
    Patient: NexusGenRootTypes['Patient']; // Patient!
  }
  Patient: { // field return type
    dateOfBirth: string | null; // String
    gender: NexusGenEnums['Gender'] | null; // Gender
    healthCheckEntries: Array<NexusGenRootTypes['HealthCheckEntry'] | null> | null; // [HealthCheckEntry]
    id: string; // String!
    name: string | null; // String
    occupation: string | null; // String
    ssn: string | null; // String
  }
  Query: { // field return type
    Diagnoses: Array<NexusGenRootTypes['Diagnosis'] | null> | null; // [Diagnosis]
    HealthCheckEntry: Array<NexusGenRootTypes['HealthCheckEntry'] | null> | null; // [HealthCheckEntry]
    HospitalEntries: Array<NexusGenRootTypes['HospitalEntry'] | null> | null; // [HospitalEntry]
    Patient: NexusGenRootTypes['Patient'] | null; // Patient
    Patients: Array<NexusGenRootTypes['Patient'] | null> | null; // [Patient]
  }
}

export interface NexusGenFieldTypeNames {
  Diagnosis: { // field return type name
    code: 'String'
    id: 'String'
    latin: 'String'
    name: 'String'
  }
  HealthCheckEntry: { // field return type name
    date: 'String'
    description: 'String'
    diagnoses: 'Diagnosis'
    healthCheckRating: 'String'
    id: 'String'
    patient: 'Patient'
    specialist: 'String'
    type: 'String'
  }
  HospitalDischarge: { // field return type name
    criteria: 'String'
    date: 'String'
    hospitalEntry: 'HospitalEntry'
    id: 'String'
  }
  HospitalEntry: { // field return type name
    date: 'String'
    description: 'String'
    diagnoses: 'Diagnosis'
    discharge: 'HospitalDischarge'
    healthCheckRating: 'String'
    id: 'String'
    patient: 'Patient'
    specialist: 'String'
    type: 'String'
  }
  Mutation: { // field return type name
    Diagnosis: 'Diagnosis'
    HealthCheckEntry: 'HealthCheckEntry'
    HospitalEntry: 'HospitalEntry'
    HospitalEntryDischarge: 'HospitalEntry'
    Patient: 'Patient'
  }
  Patient: { // field return type name
    dateOfBirth: 'String'
    gender: 'Gender'
    healthCheckEntries: 'HealthCheckEntry'
    id: 'String'
    name: 'String'
    occupation: 'String'
    ssn: 'String'
  }
  Query: { // field return type name
    Diagnoses: 'Diagnosis'
    HealthCheckEntry: 'HealthCheckEntry'
    HospitalEntries: 'HospitalEntry'
    Patient: 'Patient'
    Patients: 'Patient'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    Diagnosis: { // args
      code: string; // String!
      latin: string; // String!
      name: string; // String!
    }
    HealthCheckEntry: { // args
      date: string; // String!
      description: string; // String!
      diagnosisIDs: string[]; // [String!]!
      healthCheckRating: string; // String!
      patientId: string; // String!
      specialist: string; // String!
    }
    HospitalEntry: { // args
      date: string; // String!
      description: string; // String!
      diagnosisIDs: string[]; // [String!]!
      patientId: string; // String!
      specialist: string; // String!
    }
    HospitalEntryDischarge: { // args
      discharge: NexusGenInputs['HospitalDischargeInput']; // HospitalDischargeInput!
      hospitalEntryId: string; // String!
    }
    Patient: { // args
      dateOfBirth: string; // String!
      gender: string; // String!
      name: string; // String!
      occupation: string; // String!
      ssn: string; // String!
    }
  }
  Query: {
    Patient: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}
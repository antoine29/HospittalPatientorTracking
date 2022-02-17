import { gql } from '@apollo/client';
import { PATIENT_MIN, ENTRY } from './fragments'

export const CREATE_PATIENT = gql`
mutation createPatient(
  $name: String!,
  $ssn: String!,
  $gender: Gender!,
  $occupation: String!,
  $dateOfBirth: String!
	) {
  createPatient(
		name: $name,
    ssn: $ssn,
    gender: $gender,
    occupation: $occupation,
		dateOfBirth: $dateOfBirth) {
      ...patientMin
  }
}
${PATIENT_MIN}
`

export const CREATE_HEALTHCHECKENTRY = gql`
mutation createHealthCheckEntry(
  $description: String!,
  $date: String!,
  $specialist: String!,
  $patientId: String!,
  $diagnosisIDs: [String!]!,
  $healthCheckRating: HealthCheckRating!){
  HealthCheckEntry(
    description: $description
    date: $date
    specialist: $specialist
    patientId: $patientId
    diagnosisIDs: $diagnosisIDs
    healthCheckRating: $healthCheckRating) {
      ...entry
      healthCheckRating
  }
}
${ENTRY}
`

export const CREATE_HOSPITALENTRY = gql`
mutation createHospitalEntry(
  $description: String!,
  $date: String!,
  $specialist: String!,
  $patientId: String!,
  $diagnosisIDs: [String!]!){
    HospitalEntry(
      description: $description
      date: $date
      specialist: $specialist
      patientId: $patientId
      diagnosisIDs: $diagnosisIDs) {
        ...entry
      }
  }
${ENTRY}
`

export const CREATE_OCCUPATIONALENTRY = gql`
mutation createOccupationalHealthEntry(
  $description: String!,
  $date: String!,
  $specialist: String!,
  $patientId: String!,
  $diagnosisIDs: [String!]!,
  $employerName: String!){
    OccupationalHealthEntry(
      description: $description
      date: $date
      specialist: $specialist
      patientId: $patientId
      diagnosisIDs: $diagnosisIDs
      employerName: $employerName) {
        ...entry
        employerName
  }
}
${ENTRY}
`

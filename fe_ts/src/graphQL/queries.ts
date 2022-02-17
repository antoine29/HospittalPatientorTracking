import { gql } from '@apollo/client';
import { PATIENT_MIN, PATIENT_FULL, DIAGNOSIS } from './fragments'

export const GET_PATIENTS = gql`
query getPatients{
  Patients{
    ...patientMin
  }
}
${PATIENT_MIN}
`

export const GET_PATIENT = gql`
query getPatient($patientId: String!) {
  Patient(id: $patientId){
    ...patientFull
  }
}
${PATIENT_FULL}
`

export const GET_DIAGNOSES = gql`
query getDiagnoses{
  Diagnoses{
    ...diagnosis
  }
}
${DIAGNOSIS}
`

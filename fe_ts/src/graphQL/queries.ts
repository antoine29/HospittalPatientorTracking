import { gql } from '@apollo/client';

const PATIENT = gql`
  fragment Patient_basic on Patient {
    id
    name
    ssn
    gender
    occupation
    dateOfBirth
  }
`

const PATIENT_FULL = gql`
  fragment Patient_full on Patient {
    ...Patient_basic
    entries{
      id
      description
      type
      date
      diagnoses{
        id
        code
        name
      }
    }
  }
${PATIENT}
`

export const GET_PATIENTS = gql`
query getPatients{
    Patients{
      ...Patient_basic
    }
  }
${PATIENT}
`

export const GET_PATIENT = gql`
query getPatient($patientId: String!) {
  Patient(id: $patientId){
    ...Patient_full
  }
}
${PATIENT_FULL}
`

export const GET_DIAGNOSES = gql`
query getDiagnoses{
  Diagnoses{
    id
    code
    name
    latin
  }
}
`


import { gql } from '@apollo/client';

export const PATIENT_MIN = gql`
fragment patientMin on Patient {
  id
  name
  dateOfBirth
  ssn
  gender
  occupation
}
`

export const PATIENT_FULL = gql`
fragment patientFull on Patient {
  ...patientMin
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
${PATIENT_MIN}
`

export const DIAGNOSIS = gql`
fragment diagnosis on Diagnosis {
    id
    code
    name
    latin
}
`

export const ENTRY = gql`
fragment entry on Entry {
    id
    description
    type
    date
    diagnoses {
      ...diagnosis
    }
}
${DIAGNOSIS}
`

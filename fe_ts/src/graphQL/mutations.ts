import { gql } from '@apollo/client';

export const CREATE_PATIENT = gql`
mutation createPatient(
  $name: String!,
  $dateOfBirth: String!,
  $ssn: String!,
  $gender: Gender!,
  $occupation: String!
	) {
  createdPatient(
		name: $name,
		dateOfBirth: $dateOfBirth,
    ssn: $ssn,
    gender: $gender,
    occupation: $occupation) {
    id
    name
    dateOfBirth
    ssn
    gender
    occupation
  }
}
`

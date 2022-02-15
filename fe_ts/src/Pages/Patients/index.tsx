import React from "react";
import { Link } from 'react-router-dom';
import { Container, Table, Button } from "semantic-ui-react";
import { useMutation } from '@apollo/client';

import { CREATE_PATIENT } from '../../graphQL/mutations'
import { useStateValue, addPatient } from "../../state";
import { CreatePatientResponse, NewPatient, Patient } from "../../types/PatientTypes";

import AddPatientModal from "../../components/AddPatientModal";
import HealthRatingBar from "../../components/HealthRatingBar";

const PatientList: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [errorOnComp, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    console.log('closing modal');
    setModalOpen(false);
    setError(undefined);
  };

  const [createPatient] = useMutation<CreatePatientResponse>(CREATE_PATIENT, {
    onError: error => {
      console.error('Error creating patient:', error);
    },
    onCompleted: data => {
      console.log('Created patient:', data.createdPatient);
      dispatch(addPatient(data.createdPatient));
      closeModal();
    }
  })

  const submitNewPatient = async (newPatient: NewPatient) => {
    console.log("NewPatientValues", newPatient);
    createPatient({ variables: { ...newPatient }});
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell>
                <Link to={`/patients/${patient.id}`}> {patient.name} </Link>
              </Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={errorOnComp}
        onClose={closeModal}/>
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientList;

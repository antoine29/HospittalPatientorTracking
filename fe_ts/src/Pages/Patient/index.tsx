import React from "react";
import { useParams } from 'react-router-dom';
import { Table, Icon, Container, List, Card, Button, Grid, SemanticICONS } from "semantic-ui-react";
import { useQuery, useMutation, ApolloError } from "@apollo/client";

import { GET_PATIENT }  from '../../graphQL/queries'
import { CREATE_HEALTHCHECKENTRY, CREATE_HOSPITALENTRY, CREATE_OCCUPATIONALENTRY }  from '../../graphQL/mutations'

import {
  Entry, FormEntry, EntryTypes,
  CreateNewHealthCheckEntryResponse, NewHealthCheckEntry,
  CreateNewHospitalEntryResponse, NewHospitalEntry,
  CreateNewOccupationalHealthEntryResponse, NewOccupationalHealthEntry
} from "../../types/EntryTypes";
import { GetPatientResponse, Patient } from "../../types/PatientTypes";

import AddEntryModal from '../../components/AddEntryModal';

const createNewHealthCheckEntry = (
  newEntry: FormEntry,
  createHealthCheckEntry: any,
  createHospitalEntry: any,
  createOccupationalEntry: any
  ): void => {
    //console.log('form entry:', newEntry);
    switch(newEntry.type)
    {
      case EntryTypes.HealthCheckEntry: {
        const newHealthCheckEntry = newEntry as NewHealthCheckEntry;
        //console.log('newHealthCheckEntry:', newHealthCheckEntry);
        createHealthCheckEntry({variables: { ...newHealthCheckEntry }});
        return;
      }
      case EntryTypes.HospitalEntry: {
        const newHospitalEntry = newEntry as NewHospitalEntry;
        //console.log('newHpspitalEntry:', newHospitalEntry);
        createHospitalEntry({variables: { ...newHospitalEntry }});
        return;
      }
      case EntryTypes.OccupationalHealthEntry: {
        const newOccupationalHealthEntry = newEntry as NewOccupationalHealthEntry;
        //console.log('newOccuptionalEntry:', newOccupationalHealthEntry);
        createOccupationalEntry({variables: { ...newOccupationalHealthEntry }});
        return;
      }
      default: return;
    }
}

const iconResolver = (icon: string): SemanticICONS => {
  switch (icon){
    case 'Male': return 'mars';
    case 'Female': return 'venus'
    case 'Other': return 'venus mars'

    case "Hospital": return "hospital";
    case "OccupationalHealth": return "medkit";
    case "HealthCheck": return "checked calendar";

    default: {
      console.error(`Icon: ${icon} is not a valid semantic-ui icon.`);
      return "question circle outline";
    }
  }
}

const PatientInfo: React.FC = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [modalOpeness, setModalOpeness] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();  
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

  const onCreatingEntryError = (error: ApolloError): void => {console.error('Error creating entry:', error);};

  const addEntryToState = (createdEntry : Entry): void => {
    console.log('Created entry:', createdEntry);
    if(patient?.entries){
      const updatedPatient:Patient = { ...patient, entries: [...patient.entries, createdEntry] };
      setPatient(updatedPatient);
    }
    closeModal();
  }

  const [createHealthCheckEntry] = useMutation<CreateNewHealthCheckEntryResponse>(CREATE_HEALTHCHECKENTRY, {
    onError: onCreatingEntryError,
    onCompleted: data => {addEntryToState(data.HealthCheckEntry);}
  });

  const [createHospitalEntry] = useMutation<CreateNewHospitalEntryResponse>(CREATE_HOSPITALENTRY, {
    onError: onCreatingEntryError,
    onCompleted: data => {addEntryToState(data.HospitalEntry);}
  });

  const [createOccupationalHealthEntry] = useMutation<CreateNewOccupationalHealthEntryResponse>(CREATE_OCCUPATIONALENTRY, {
    onError: onCreatingEntryError,
    onCompleted: data => {addEntryToState(data.OccupationalHealthEntry);}
  });

  const { loading: loadingGetPatient, error: errorGetPatient, data } = useQuery<GetPatientResponse>(GET_PATIENT, {
    variables: { patientId },
    onCompleted: (data) => {
      console.log('patient:', data.Patient)
      setPatient(data.Patient)
    }
  });
  
  const openModal = (): void => setModalOpeness(true);
  const closeModal = (): void => setModalOpeness(false);

  if(loadingGetPatient){
    return <div>Loading...</div>
  }

  if(errorGetPatient){
    return <div>Error</div>
  }

  if(patient){
    return(
      <Container>
        <AddEntryModal
          modalOpenness={modalOpeness}
          closeModal={closeModal}
          onSubmit={(formEntry: FormEntry) => {
            formEntry.patientId = patientId || formEntry.patientId
            createNewHealthCheckEntry(formEntry, createHealthCheckEntry, createHospitalEntry, createOccupationalHealthEntry)
          }}
          error={error}/>
        <h2>
          {patient.name + " "}
          <Icon fitted name={iconResolver(patient.gender)} />
        </h2>
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>SSN:</Table.Cell>
              <Table.Cell>{patient.ssn}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Occupation:</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Grid stretched columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <h3>Entries:</h3>
            </Grid.Column>
            <Grid.Column>
              <div>
                <Button compact animated floated='right' onClick={() => openModal()}>
                  <Button.Content visible>Add Entry</Button.Content>
                  <Button.Content hidden>
                    <Icon name='add circle' />
                  </Button.Content>
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group itemsPerRow='1'>
          {patient.entries && patient.entries.map(entry =>
          <Card key={entry.id}>
            <Card.Content>
              <Card.Header as="h3">
                <Icon size='large' name={iconResolver(entry.type)} />
                {entry.date}
              </Card.Header>
              <Card.Description>
                <b>{entry.type}</b><br />{entry.description}
              </Card.Description>
              {(entry.diagnoses && entry.diagnoses.length > 0) &&
              <List divided>
                  <List.Header><b>Diagnoses:</b></List.Header>
                  {entry.diagnoses.map(diagnosis =>
                  <List.Item key={diagnosis.id}>
                    <List.Header>{diagnosis.code}</List.Header>
                    <List.Content>{diagnosis.name}</List.Content>
                  </List.Item>)}
              </List>}
            </Card.Content>
          </Card>)}
        </Card.Group>
      </Container>
    );
  }

  return <div>wtf bro</div>
};

export default PatientInfo;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { GET_PATIENTS, GET_DIAGNOSES }  from './graphQL/queries'
import { useStateValue, setPatients, setDiagnoses } from "./state";
import { GetPatientsResponse } from "./types/PatientTypes";
import { GetDiagnosesResponse } from "./types/EntryTypes";

import PatientList from "./Pages/Patients";
import PatientInfo from "./Pages/Patient";

import { PrintFormatedJson } from "./tools";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  const { loading: getPatientsLoading, error: getPatientsError } = useQuery<GetPatientsResponse>(GET_PATIENTS, {
    onCompleted: (data: GetPatientsResponse) => {
      dispatch(setPatients(data.Patients));
    }
  });

  const { loading: getDiagnosesLoading , error: getDiagnosesError } = useQuery<GetDiagnosesResponse>(GET_DIAGNOSES, {
    onCompleted: (data: GetDiagnosesResponse) => {
      dispatch(setDiagnoses(data.Diagnoses));
    }
  });
  
  if(getPatientsLoading || getDiagnosesLoading){
    return (<div>Loading...</div>)
  }

  if(getPatientsError || getDiagnosesError){
    return (
      <div>
        <div>Error:</div>
        {getPatientsError &&
        <div>{PrintFormatedJson(getPatientsError)}</div>}
        {getDiagnosesError &&
        <div>{PrintFormatedJson(getDiagnosesError)}</div>}
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientInfo />} />
            <Route path="/" element={<PatientList />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

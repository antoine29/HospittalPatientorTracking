//import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient()

import { GetPatients, GetPatient, CreatePatient } from './src/dao/patients'
import { GetDiagnoses, CreateDiagnosis } from './src/dao/diagnoses'
import { GetHealthCheckEntries, CreateHealthCheckEntry } from './src/dao/healthCheckEntries'
import { GetHospitalEntries, CreateHospitalEntry } from './src/dao/hospitalEntries'
import { CreateOccupationalHealthEntry } from './src/dao/occupationalHealthEntries'
import { HospitalEntry } from '@prisma/client'

const createPatient = async () => {
	var createdpatient = await CreatePatient({
		name: 'patientEMPTY',
		dateOfBirth: 'date0',
		ssn: 'ssn1',
		gender: 'Male',
		occupation: 'occupation0'
	})
	console.log("createdpatient:", createdpatient)
}

const runPatients = async () => {

	//var patients = await GetPatients();
	//console.log("patients:", patients)

	var patient = await GetPatient("61f98a9100c0e19e00017179");
	console.log("patient:", patient)

	

	//const patients = await prisma.patient.findMany();
	//console.log(patients)

	//let res = await prisma.patient.findUnique({where: {id: '61f81e2700bb86a500688290'}})
	//console.log(res)
}

/*
const runDiagnoses = async () => {
	//var diagnoses = await GetDiagnoses()
	//console.log("diagnoses:", diagnoses)

	var createdDiagnosis = await CreateDiagnosis({
		code: "diag1",
		name: "diag1",
		latin: "diag1"
	})
	console.log("created diag:", createdDiagnosis)	
}
*/

const runHealthCheckEntries = async () => {
	//var healthCheckEntries = await GetHealthCheckEntries();
	//console.log("healthCheckEntries:", healthCheckEntries)

	var createdHealthCheckEntry = await CreateHealthCheckEntry({
		description: "hc0",
		date: "hc0",
		specialist: "spec0",
		healthCheckRating: "Healthy",
		patientId: "61f9b77b007dfbcc00168013",
		diagnosisIDs: ["61f9b8ce003aff3d00ab0776"]
	})
	console.log("created entry:", createdHealthCheckEntry)

	//const patientHealthCheckEntries = await GetPatientHealthCheckEntries();
}

const getHospitalEntries = async () => {
	var hospitalEntries = await GetHospitalEntries();
	console.log("hospitalEntries:", hospitalEntries)
}

const createOccupationalEntry = async () => {
	try{
		var createdOccupationalEntry = await CreateOccupationalHealthEntry({
			description: 'hc0',
			date: 'hc0',
			specialist: "spec0",
			patientId: '620e7353001c56d200d4735b',
			diagnosisIDs: ['61fd69c700bc6a1200b7ed20'],
			employerName : ""
		})
		console.log("created occupational entry:", createdOccupationalEntry)
	}
	catch(error){
		console.error('error creating occupational entry: \n', JSON.stringify(error));
	}
}

const createHospitalEntry = async () => {
	try{
		var createdHospitalEntry = await CreateHospitalEntry({
			description: 'hc0',
			date: 'hc0',
			specialist: "spec0",
			patientId: '620e7353001c56d200d4735b',
			diagnosisIDs: ['61fd69c700bc6a1200b7ed20']
		})
		console.log("created entry:", createdHospitalEntry)
	}
	catch(error){
		console.error('error:', JSON.stringify(error));
	}
}

/*
const upsertHospitalEntryDischarge = async () => {
	let discharge = {
		criteria: "criteria-1",
		date: "date-1"
	}
	let updatedEntry = await CreateHospitalEntryDischarge("61fae34f00d18a3f00fc7665", discharge);
	console.log("updated entry:", updatedEntry)
}
*/

//runPatients()
//runDiagnoses();
//runHealthCheckEntries()
//runHospitalEntries()
//createOccupationalEntry();
//createHospitalEntry();

createPatient();
console.log("completed!")

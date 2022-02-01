//import { PrismaClient } from '@prisma/client'
//const prisma = new PrismaClient()

import { GetPatients, GetPatient, CreatePatient } from './src/dao/patients'
import { GetHealthCheckEntries, CreateHealthCheckEntry } from './src/dao/healthCheckEntries'
import { GetDiagnoses, CreateDiagnosis } from './src/dao/diagnoses'

const runPatients = async () => {

	var patients = await GetPatients();
	console.log("patients:", patients)

	//var createdpatient = await CreatePatient({
	//	name: 'patient0',
	//	dateOfBirth: 'date0',
	//	ssn: 'ssn0',
	//	gender: 'male',
	//	occupation: 'occupation0'
	//})
	//console.log("createdpatient:", createdpatient)

	//const patients = await prisma.patient.findMany();
	//console.log(patients)

	//let res = await prisma.patient.findUnique({where: {id: '61f81e2700bb86a500688290'}})
	//console.log(res)
}

const runHelathCheckEntries = async () => {
	//var healthCheckEntries = await GetHealthCheckEntries();
	//console.log("healthCheckEntries:", healthCheckEntries)

	var createdHealthCheckEntry = await CreateHealthCheckEntry({
		description: "desc0",
		date: "date0",
		specialist: "sepc0",
		healthCheckRating: "Healthy",
		patientId: "61f98a9100c0e19e00017179",
		diagnosisIDs: ['61f9913c0067473900bcb2d8']
	})
	console.log("created entry:", createdHealthCheckEntry)

	//const patients = await prisma.patient.findMany();
	//console.log(patients)

	//let res = await prisma.patient.findUnique({where: {id: '61f81e2700bb86a500688290'}})
	//console.log(res)
}

const runDiagnoses = async () => {
	//var diagnoses = await GetDiagnoses()
	//console.log("diagnoses:", diagnoses)

	var createdDiagnosis = await CreateDiagnosis({
		code: "diag1",
		name: "diag1",
		latin: "diag1"
	})
	console.log("created diag:", createdDiagnosis)

	//const patients = await prisma.patient.findMany();
	//console.log(patients)

	//let res = await prisma.patient.findUnique({where: {id: '61f81e2700bb86a500688290'}})
	//console.log(res)
}

//runPatients()
runHelathCheckEntries()
//runDiagnoses();
console.log("completed!")
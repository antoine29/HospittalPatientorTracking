import { prismaClient, Patient } from '../../prisma'
import { NexusGenFieldTypes } from '../../nexus-typegen'

type NexusPatient = NexusGenFieldTypes['Patient'] | null;
type NewPatient = Omit<Patient, 'id'>
export const GetPatients = async () => {
	return await prismaClient.patient.findMany();
}

export const GetPatient = async (patientId: string) => {
	const patient = await prismaClient.patient.findUnique({
		where: { id: patientId },
		include: {
			healthCheckEntries: true,
			hospitalEntries: true,
			occupationalHealthEntries: true
		}
	});

	if(patient){
        const mergedEntries = [
            ...patient.healthCheckEntries,
            ...patient.hospitalEntries,
            ...patient.occupationalHealthEntries
		]
        
		// ToDo: check if all the implementation fields are present
        const fixedPatient: NexusPatient = {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            ssn: patient.ssn,
            gender: patient.gender,
            occupation: patient.occupation,
            entries: mergedEntries
        };

        return fixedPatient;
    } 
	
	return null;
}

export const CreatePatient = async (patient: NewPatient) => {
	return await prismaClient.patient.create({
		data: {
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
			ssn: patient.ssn,
			gender: patient.gender,
			occupation: patient.occupation
		}
	});
}
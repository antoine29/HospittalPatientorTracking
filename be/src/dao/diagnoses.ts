import { prismaClient, Diagnosis } from '../../prisma'

type NewDiagnosis = Omit<Diagnosis, 'id' | 'healthCheckEntryIDs' | 'hospitalEntryIDs' | 'occupationalHealthEntryIDs'>;

export const GetDiagnoses = async () => {
	return await prismaClient.diagnosis.findMany();
}

export const CreateDiagnosis = async (newDiagnosis: NewDiagnosis) => {
	return await prismaClient.diagnosis.create({
		data: {
			code: newDiagnosis.code,
			name: newDiagnosis.name,
			latin: newDiagnosis.latin,
		}
	});
}
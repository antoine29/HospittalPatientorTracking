import { prismaClient, Diagnosis } from './prisma'

export const GetDiagnoses = async () => {
	return await prismaClient.diagnosis.findMany();
}

export const CreateDiagnosis = async (diagnosis: Diagnosis) => {
	return await prismaClient.diagnosis.create({
		data: {
			code: diagnosis.code,
			name: diagnosis.name,
			latin: diagnosis.latin,
		}
	});
}
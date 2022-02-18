import { prismaClient, Patient } from '.'
import { diagnoses, patients } from './initialData.json'

const setDiagnoses = async () => {
    for (const diagnosis of diagnoses) {
        await prismaClient.diagnosis.create({ data: diagnosis });
    }
}

const setPatients = async () => {
    console.log(patients.length)
    for (const patient of patients) {
        await prismaClient.patient.create({ data: patient as Patient });
    }
}

const seedData = async () => {
    await setDiagnoses();
    await setPatients();
    process.exit(1)
}

seedData()

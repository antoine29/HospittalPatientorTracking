import { PrismaClient } from '@prisma/client'
export const prismaClient = new PrismaClient()

export {
    Patient,
    Diagnosis,
    HealthCheckEntry,
    HospitalEntry,
    HospitalDischarge,
    OccupationalHealthEntry,
    SickLeave,

    Gender,
    HealthCheckRating,  
} from '@prisma/client'
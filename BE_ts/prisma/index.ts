import { PrismaClient } from '@prisma/client'
export const prismaClient = new PrismaClient()

export {
    Patient,
    Diagnosis,
    HealthCheckEntry,

    Gender,
    HealthCheckRating,  
} from '@prisma/client'
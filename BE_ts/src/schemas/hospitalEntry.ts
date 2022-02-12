import { objectType, extendType, nonNull, stringArg, list, arg, extendInputType } from "nexus";
import { GetHospitalEntries, CreateHospitalEntry, UpsertHospitalEntryDischarge } from '../dao/hospitalEntries'

export const HospitalEntry = objectType({
	name: 'HospitalEntry',
	definition(t) {
		t.nonNull.string('id');
		t.string('description');
		t.string('date');
		t.string('specialist');
		t.string('type');
		t.string('healthCheckRating');
        t.field('discharge', {
			type: 'HospitalDischarge'
		});
		t.field('patient', {
			type: 'Patient'
		});
		t.list.field('diagnoses', {
			type: 'Diagnosis'
		});
	},
});

export const HospitalEntryQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('HospitalEntries', {
			type: 'HospitalEntry',
			resolve(_root, _args, ctx) {
				return GetHospitalEntries();
			},
		});
	},
});

export const hospitalDischargeInput = extendInputType({
    type: 'HospitalDischargeInput',
    definition(t) {
        t.string('date');
        t.string('criteria');
    }
});

export const HospitalEntryMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('HospitalEntry', {
			type: 'HospitalEntry',
			args: {
				description: nonNull(stringArg()),
				date: nonNull(stringArg()),
				specialist: nonNull(stringArg()),
				patientId: nonNull(stringArg()),
				diagnosisIDs: nonNull(list(nonNull(stringArg())))
			},
			resolve(_root, args, ctx) {
				return CreateHospitalEntry(args);
			},
		});
        t.field('HospitalEntryDischarge', {
            type: 'HospitalEntry',
            args: {
                hospitalEntryId: nonNull(stringArg()),
                discharge: arg({
                    type: nonNull('HospitalDischargeInput')
                })
            },
            resolve(_root, args, ctx) {
				return UpsertHospitalEntryDischarge(args.hospitalEntryId, args.discharge);
			},
        })
	},
});


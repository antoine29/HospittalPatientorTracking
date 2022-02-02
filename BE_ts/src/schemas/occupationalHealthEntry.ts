import { objectType, extendType, nonNull, stringArg, list, arg, extendInputType } from "nexus";
import {
    GetOccupationalHealthEntries,
    CreateOccupationalHealthEntry,
    UpsertOccupationalHealthEntrySickLeave } from '../dao/occupationalHealthEntries'

export const OccupationalHealthEntry = objectType({
	name: 'OccupationalHealthEntry',
	definition(t) {
		t.nonNull.string('id');
		t.string('description');
		t.string('date');
		t.string('specialist');
		t.string('type');
        t.string('employerName');
        t.field('sickLeave', {
			type: 'SickLeave'
		});
		t.field('patient', {
			type: 'Patient'
		});
		t.list.field('diagnoses', {
			type: 'Diagnosis'
		});
	},
});

export const OccupationalHealthEntryQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('OccupationalHealthEntries', {
			type: 'OccupationalHealthEntry',
			resolve(_root, _args, ctx) {
				return GetOccupationalHealthEntries();
			},
		});
	},
});

// todo: check if can use the types fopr the inputTypes
export const SickLeaveInput = extendInputType({
    type: 'SickLeaveInput',
    definition(t) {
        t.string('startDate');
        t.string('endDate');
    }
});

export const OccupationalHealthEntryMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('OccupationalHealthEntry', {
			type: 'OccupationalHealthEntry',
			args: {
				description: nonNull(stringArg()),
				date: nonNull(stringArg()),
				specialist: nonNull(stringArg()),
                employerName: nonNull(stringArg()),
				patientId: nonNull(stringArg()),
				diagnosisIDs: nonNull(list(nonNull(stringArg())))
			},
			resolve(_root, args, ctx) {
				return CreateOccupationalHealthEntry(args);
			},
		});
        t.field('OccupationalHealthEntrySickLeave', {
            type: 'OccupationalHealthEntry',
            args: {
                occupationalHealthEntryId: nonNull(stringArg()),
                sickLeave: arg({
                    type: nonNull('SickLeaveInput')
                })
            },
            resolve(_root, args, ctx) {
				return UpsertOccupationalHealthEntrySickLeave(args.occupationalHealthEntryId, args.sickLeave);
			},
        })
	},
});


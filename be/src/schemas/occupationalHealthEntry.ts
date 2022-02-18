import { objectType, extendType, nonNull, stringArg, arg, extendInputType } from "nexus";
import {
    GetOccupationalHealthEntries,
    CreateOccupationalHealthEntry,
    UpsertOccupationalHealthEntrySickLeave } from '../dao/occupationalHealthEntries';
import { NewEntryInput } from ".";
import { NexusGenFieldTypes } from '../../nexus-typegen'

type NexusOccupationalEntry = NexusGenFieldTypes['OccupationalHealthEntry'];
type NexusSickLeave = NexusGenFieldTypes['SickLeave'];

type CustomNexusSickLeave = NexusSickLeave & {
	active: boolean
};
type CustomOccupationalEntry = Omit<NexusOccupationalEntry, 'sickLeave'> & {
	sickLeave: CustomNexusSickLeave
};


export const OccupationalHealthEntry = objectType({
	name: 'OccupationalHealthEntry',
	definition(t) {
		t.implements('Entry')
        t.string('employerName');
        t.field('sickLeave', {
			type: 'SickLeave',
			resolve: (root) => {
				const casted = root as CustomOccupationalEntry;
				return casted.sickLeave?.active ? casted.sickLeave : null;
			}
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
        t.nonNull.string('startDate');
        t.nonNull.string('endDate');
    }
});

const NewOccupationalHealthEntryInput = {
	...NewEntryInput,
	employerName: nonNull(stringArg())
}

export const OccupationalHealthEntryMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('OccupationalHealthEntry', {
			type: 'OccupationalHealthEntry',
			args: NewOccupationalHealthEntryInput,
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


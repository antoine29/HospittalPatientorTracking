import { interfaceType, nonNull, stringArg, list } from "nexus";
import { AbstractTypeResolver, NexusInterfaceTypeConfig } from "nexus/dist/core";

const entryTypeResolver: AbstractTypeResolver<'Entry'> = (root, ctx, info) => {
	switch(root.type)
	{
		case 'HealthCheck' : return 'HealthCheckEntry'
		case 'Hospital' : return 'HospitalEntry'
		case 'OccupationalHealth': return 'OccupationalHealthEntry'
	}

	//'MaybePromise<"HealthCheckEntry" | "HospitalEntry" | null>'
	return null
}

const entryConfig: NexusInterfaceTypeConfig<string> = {
	name: 'Entry',
	definition(t) {
		t.id('id');
		t.string('description');
		t.string('date');
		t.string('specialist');
		t.string('type');
	
		t.field('patient', { type: 'Patient' })
		t.list.field('diagnoses', { type: 'Diagnosis' })
	},
	resolveType: entryTypeResolver
};
export const Entry = interfaceType(entryConfig);

// neither 'inputObjectType' or 'extendInputType' can implement interfaces or other types
export const NewEntryInput = {
	description: nonNull(stringArg()),
	date: nonNull(stringArg()),
	specialist: nonNull(stringArg()),
	patientId: nonNull(stringArg()),
	diagnosisIDs: nonNull(list(nonNull(stringArg())))
}
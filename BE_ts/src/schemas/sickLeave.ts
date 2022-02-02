import { objectType } from "nexus";

export const SickLeave = objectType({
	name: 'SickLeave',
	definition(t) {
		t.nonNull.string('id');
        t.string('startDate');
        t.string('endDate');
		t.field('occupationalHealthEntry', {
			type: 'OccupationalHealthEntry'
		});
	},
});
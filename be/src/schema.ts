import { makeSchema, objectType, extendType } from "nexus";
import { join } from 'path';
//import * as patientSchemas from './schemas/patient'
import * as schemas from './schemas'


export const schema = makeSchema({
	// GraphQL types that will be used to construct your GraphQL schema.
	types: {
		schemas
	},
	outputs: {
		// Output path to where nexus should write the generated TypeScript definition types derived from your schema. This is mandatory to benefit from Nexus' type-safety.
		typegen: join(__dirname, '..', 'nexus-typegen.ts'),
		// Output path to where nexus should write the SDL (schema definition language) version of your GraphQL schema.
		schema: join(__dirname, '..', 'schema.GraphQL'),
	},
	//contextType: {
	//	// Path to the module where the context type is exported
	//	module: join(__dirname, './context.ts'),
	//	// Name of the export in that module
	//	export: 'Context',
	//},
});
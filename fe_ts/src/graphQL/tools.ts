import { DocumentNode, parse } from 'graphql';
import { print } from 'graphql/language/printer'

const printGql = (gql: DocumentNode) => {
    console.log("GQL:", print(gql))
}

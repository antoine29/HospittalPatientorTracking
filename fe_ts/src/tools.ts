import { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';

export const PrintFormatedJson = (_object: object | undefined): string => {
    // ToDo: print _object name instead
    const formattedJson = JSON.stringify(_object, null, 1);
    console.log("_object:", formattedJson);
    return formattedJson;
}

export const PrintGql = (gql: DocumentNode) => {
    console.log("GQL:", print(gql))
}

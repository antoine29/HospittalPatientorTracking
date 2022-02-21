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

export const getBackendUrl = (): string => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/'
    console.log(`Using Backend url: ${backendUrl}`)
    return backendUrl
  }
  
export const getRouterType = (): string => {
  const deploymentServer = process.env.REACT_APP_DEPLOYMENT_SERVER
  const router = deploymentServer === 'gh-pages' ? 'hash' : 'browser'
  console.log(`Using '${router}' router for ${deploymentServer} deployment server:`)
  return router; 
}
/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateWorkstation($title: String!, $description: String!, $ipAddress: String) {\n    createWorkstation(title: $title, description: $description, ipAddress: $ipAddress) {\n      workstation {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        createdAt\n      }\n    }\n  }\n": typeof types.CreateWorkstationDocument,
    "\n  mutation UpdateWorkstation($id: Int!, $title: String, $description: String, $ipAddress: String) {\n    updateWorkstation(id: $id, title: $title, description: $description, ipAddress: $ipAddress) {\n      workstation {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        updatedAt\n      }\n    }\n  }\n": typeof types.UpdateWorkstationDocument,
    "\n  mutation DeleteWorkstation($id: Int!) {\n    deleteWorkstation(id: $id) {\n      success\n    }\n  }\n": typeof types.DeleteWorkstationDocument,
    "\n  query Workstations($page: Int!, $pageSize: Int!) {\n    workstations(page: $page, pageSize: $pageSize) {\n      total\n      page\n      pageSize\n      hasNext\n      hasPrevious\n      results {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.WorkstationsDocument,
    "\n  query Workstation($id: Int!) {\n    workstation(id: $id) {\n      id\n      title\n      description\n      ipAddress\n      hasPc\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.WorkstationDocument,
};
const documents: Documents = {
    "\n  mutation CreateWorkstation($title: String!, $description: String!, $ipAddress: String) {\n    createWorkstation(title: $title, description: $description, ipAddress: $ipAddress) {\n      workstation {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        createdAt\n      }\n    }\n  }\n": types.CreateWorkstationDocument,
    "\n  mutation UpdateWorkstation($id: Int!, $title: String, $description: String, $ipAddress: String) {\n    updateWorkstation(id: $id, title: $title, description: $description, ipAddress: $ipAddress) {\n      workstation {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        updatedAt\n      }\n    }\n  }\n": types.UpdateWorkstationDocument,
    "\n  mutation DeleteWorkstation($id: Int!) {\n    deleteWorkstation(id: $id) {\n      success\n    }\n  }\n": types.DeleteWorkstationDocument,
    "\n  query Workstations($page: Int!, $pageSize: Int!) {\n    workstations(page: $page, pageSize: $pageSize) {\n      total\n      page\n      pageSize\n      hasNext\n      hasPrevious\n      results {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.WorkstationsDocument,
    "\n  query Workstation($id: Int!) {\n    workstation(id: $id) {\n      id\n      title\n      description\n      ipAddress\n      hasPc\n      createdAt\n      updatedAt\n    }\n  }\n": types.WorkstationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWorkstation($title: String!, $description: String!, $ipAddress: String) {\n    createWorkstation(title: $title, description: $description, ipAddress: $ipAddress) {\n      workstation {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        createdAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateWorkstationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWorkstation($id: Int!, $title: String, $description: String, $ipAddress: String) {\n    updateWorkstation(id: $id, title: $title, description: $description, ipAddress: $ipAddress) {\n      workstation {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateWorkstationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkstation($id: Int!) {\n    deleteWorkstation(id: $id) {\n      success\n    }\n  }\n"): typeof import('./graphql').DeleteWorkstationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Workstations($page: Int!, $pageSize: Int!) {\n    workstations(page: $page, pageSize: $pageSize) {\n      total\n      page\n      pageSize\n      hasNext\n      hasPrevious\n      results {\n        id\n        title\n        description\n        ipAddress\n        hasPc\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').WorkstationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Workstation($id: Int!) {\n    workstation(id: $id) {\n      id\n      title\n      description\n      ipAddress\n      hasPc\n      createdAt\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').WorkstationDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

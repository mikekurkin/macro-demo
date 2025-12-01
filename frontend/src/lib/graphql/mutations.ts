import { graphql } from './codegen/gql';


export const CREATE_WORKSTATION = graphql(`
  mutation CreateWorkstation($title: String!, $description: String!, $ipAddress: String) {
    createWorkstation(title: $title, description: $description, ipAddress: $ipAddress) {
      workstation {
        id
        title
        description
        ipAddress
        hasPc
        createdAt
      }
    }
  }
`);

export const UPDATE_WORKSTATION = graphql(`
  mutation UpdateWorkstation($id: Int!, $title: String, $description: String, $ipAddress: String) {
    updateWorkstation(id: $id, title: $title, description: $description, ipAddress: $ipAddress) {
      workstation {
        id
        title
        description
        ipAddress
        hasPc
        updatedAt
      }
    }
  }
`);

export const DELETE_WORKSTATION = graphql(`
  mutation DeleteWorkstation($id: Int!) {
    deleteWorkstation(id: $id) {
      success
    }
  }
`);

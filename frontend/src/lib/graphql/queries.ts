import { graphql } from './codegen/gql';

export const GET_WORKSTATIONS = graphql(`
  query Workstations {
    workstations {
      id
      title
      description
      ipAddress
      hasPc
      createdAt
      updatedAt
    }
  }
`);

export const GET_WORKSTATION = graphql(`
  query Workstation($id: Int!) {
    workstation(id: $id) {
      id
      title
      description
      ipAddress
      hasPc
      createdAt
      updatedAt
    }
  }
`);

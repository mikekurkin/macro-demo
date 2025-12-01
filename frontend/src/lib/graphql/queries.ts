import { graphql } from './codegen/gql';

export const GET_WORKSTATIONS = graphql(`
  query Workstations($page: Int!, $pageSize: Int!) {
    workstations(page: $page, pageSize: $pageSize) {
      total
      page
      pageSize
      hasNext
      hasPrevious
      results {
        id
        title
        description
        ipAddress
        hasPc
        createdAt
        updatedAt
      }
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

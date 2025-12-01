/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
};

export type CreateWorkstation = {
  __typename?: 'CreateWorkstation';
  workstation?: Maybe<WorkstationType>;
};

export type DeleteWorkstation = {
  __typename?: 'DeleteWorkstation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createWorkstation?: Maybe<CreateWorkstation>;
  deleteWorkstation?: Maybe<DeleteWorkstation>;
  updateWorkstation?: Maybe<UpdateWorkstation>;
};


export type MutationCreateWorkstationArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationDeleteWorkstationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateWorkstationArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  workstation?: Maybe<WorkstationType>;
  workstations: WorkstationConnection;
};


export type QueryWorkstationArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryWorkstationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateWorkstation = {
  __typename?: 'UpdateWorkstation';
  workstation?: Maybe<WorkstationType>;
};

export type WorkstationConnection = {
  __typename?: 'WorkstationConnection';
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  results: Array<WorkstationType>;
  total: Scalars['Int']['output'];
};

export type WorkstationType = {
  __typename?: 'WorkstationType';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hasPc: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateWorkstationMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  ipAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateWorkstationMutation = { __typename?: 'Mutation', createWorkstation?: { __typename?: 'CreateWorkstation', workstation?: { __typename?: 'WorkstationType', id: string, title: string, description?: string | null, ipAddress?: string | null, hasPc: boolean, createdAt: any } | null } | null };

export type UpdateWorkstationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ipAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateWorkstationMutation = { __typename?: 'Mutation', updateWorkstation?: { __typename?: 'UpdateWorkstation', workstation?: { __typename?: 'WorkstationType', id: string, title: string, description?: string | null, ipAddress?: string | null, hasPc: boolean, updatedAt: any } | null } | null };

export type DeleteWorkstationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteWorkstationMutation = { __typename?: 'Mutation', deleteWorkstation?: { __typename?: 'DeleteWorkstation', success?: boolean | null } | null };

export type WorkstationsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type WorkstationsQuery = { __typename?: 'Query', workstations: { __typename?: 'WorkstationConnection', total: number, page: number, pageSize: number, hasNext: boolean, hasPrevious: boolean, results: Array<{ __typename?: 'WorkstationType', id: string, title: string, description?: string | null, ipAddress?: string | null, hasPc: boolean, createdAt: any, updatedAt: any }> } };

export type WorkstationQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type WorkstationQuery = { __typename?: 'Query', workstation?: { __typename?: 'WorkstationType', id: string, title: string, description?: string | null, ipAddress?: string | null, hasPc: boolean, createdAt: any, updatedAt: any } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CreateWorkstationDocument = new TypedDocumentString(`
    mutation CreateWorkstation($title: String!, $description: String!, $ipAddress: String) {
  createWorkstation(
    title: $title
    description: $description
    ipAddress: $ipAddress
  ) {
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
    `) as unknown as TypedDocumentString<CreateWorkstationMutation, CreateWorkstationMutationVariables>;
export const UpdateWorkstationDocument = new TypedDocumentString(`
    mutation UpdateWorkstation($id: Int!, $title: String, $description: String, $ipAddress: String) {
  updateWorkstation(
    id: $id
    title: $title
    description: $description
    ipAddress: $ipAddress
  ) {
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
    `) as unknown as TypedDocumentString<UpdateWorkstationMutation, UpdateWorkstationMutationVariables>;
export const DeleteWorkstationDocument = new TypedDocumentString(`
    mutation DeleteWorkstation($id: Int!) {
  deleteWorkstation(id: $id) {
    success
  }
}
    `) as unknown as TypedDocumentString<DeleteWorkstationMutation, DeleteWorkstationMutationVariables>;
export const WorkstationsDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<WorkstationsQuery, WorkstationsQueryVariables>;
export const WorkstationDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<WorkstationQuery, WorkstationQueryVariables>;
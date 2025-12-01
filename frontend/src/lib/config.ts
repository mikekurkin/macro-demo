/// <reference types="vite/client" />

export const config = {
  graphqlEndpoint: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8000/graphql/',
} as const;

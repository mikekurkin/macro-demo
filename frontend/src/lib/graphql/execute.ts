import { config } from '../config';
import type { TypedDocumentString } from './codegen/graphql';

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(config.graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();

  if (Array.isArray(json.errors) && json.errors.length > 0) {
    throw new Error(json.errors.at(0).message);
  }

  // return response.json().then(json => {
  return json.data as TResult;
  // });
}

/**
 * @name "Mutation.<%= mutationName %>"
 * @method
 * @memberof <%= upperCasePluginName %>/GraphQL
 * @summary resolver for the <%= mutationName %> GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} <%= upperCaseMutationName %>Payload
 */
export default async function <%= mutationName %>(parentResult, { input }, context) {
  const { clientMutationId = null } = input;
  // TODO: decode incoming IDs here
  const renameMe = await context.mutations.<%= lowerCasePluginName %>.<%= mutationName %>(context);
  return {
    renameMe,
    clientMutationId
  };
}

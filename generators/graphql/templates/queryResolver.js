/**
 * @name "Query.<%= queryName %>"
 * @method
 * @memberof <%= upperCasePluginName %>/GraphQL
 * @summary resolver for the <%= queryName %> GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} TODO
 */
export default async function <%= queryName %>(parentResult, { /* TODO */ }, context) {
  // TODO: decode incoming IDs here
  return context.queries.<%= lowerCasePluginName %>.<%= queryName %>(context);
}

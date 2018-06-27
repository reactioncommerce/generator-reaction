import <%= mutationName %> from "./<%= mutationName %>";

test("correctly passes through to mutations.<%= lowerCasePluginName %>.<%= mutationName %>", async () => {
  const fakeResult = { /* TODO */ };

  const mockMutation = jest.fn().mockName("mutations.<%= lowerCasePluginName %>.<%= mutationName %>");
  mockMutation.mockReturnValueOnce(Promise.resolve(fakeResult));
  const context = {
    mutations: {
      <%= lowerCasePluginName %>: {
        <%= mutationName %>: mockMutation
      }
    }
  };

  const result = await <%= mutationName %>(null, {
    input: {
      /* TODO */
      clientMutationId: "clientMutationId"
    }
  }, context);

  expect(result).toEqual({
    renameMe: fakeResult,
    clientMutationId: "clientMutationId"
  });
});

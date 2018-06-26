import <%= queryName %> from "./<%= queryName %>";

test("calls queries.<%= lowerCasePluginName %>.<%= queryName %> and returns the result", async () => {
  const mockResponse = "MOCK_RESPONSE";
  const mockQuery = jest.fn().mockName("queries.<%= lowerCasePluginName %>.<%= queryName %>").mockReturnValueOnce(Promise.resolve(mockResponse));

  const result = await <%= queryName %>(null, { /* TODO */ }, {
    queries: { <%= lowerCasePluginName %>: { <%= queryName %>: mockQuery } },
    userId: "123"
  });

  expect(result).toEqual(mockResponse);
  expect(mockQuery).toHaveBeenCalled();
});

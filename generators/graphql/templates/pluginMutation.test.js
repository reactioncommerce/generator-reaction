import mockContext from "/imports/test-utils/helpers/mockContext";
import <%= mutationName %> from "./<%= mutationName %>";

test("expect to return a Promise that resolves to TODO", async () => {
  const result = await <%= mutationName %>(mockContext);
  expect(result).toEqual(null);
});

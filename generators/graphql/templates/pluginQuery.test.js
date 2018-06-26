import mockContext from "/imports/test-utils/helpers/mockContext";
import <%= queryName %> from "./<%= queryName %>";

test("expect to return a Promise that resolves to TODO", async () => {
  const result = await <%= queryName %>(mockContext);
  expect(result).toEqual(null);
});

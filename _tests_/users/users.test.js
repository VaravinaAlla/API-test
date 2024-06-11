const { UsersController } = require("../../src/controllers/UsersController.js");

const usersController = new UsersController();

test("Get current user profile", async () => {
  await usersController.login();
  const res = await usersController.getUserProfile();
  expect(res.status).toBe(200);
  expect(res.data.data.userId).toBe(128906);
  expect(res.data.data.name).toBe("Alla");
  expect(res.data.data.lastName).toBe("Test");
});

test("Check users settings", async () => {});

const axios = require("axios");

const axiosInstanse = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
  validateStatus: () => true,
});

describe("JSONPlaceholder", () => {
  test("GET /posts status code is 200", async () => {
    const response = await axiosInstanse.get("/posts");
    expect(response.status).toBe(200);
  });

  test("GET /posts/1/comments status code is 200", async () => {
    const response = await axiosInstanse.get("/posts/1/comments");
    expect(response.status).toBe(200);
  });

  test("GET /posts/1 title is equels", async () => {
    const response = await axiosInstanse.get("/posts/1");
    expect(response.data).toHaveProperty(
      "title",
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    );
  });

  test("GET /albums/2 userId = 1", async () => {
    const response = await axiosInstanse.get("/albums/2");
    expect(response.data).toHaveProperty("userId", 1);
  });

  test("POST /posts check response id = 101", async () => {
    const response = await axiosInstanse.post("/posts", {
      body: {
        id: 1,
        title: "foo",
        body: "bar",
        userId: 2,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    expect(response.data).toHaveProperty("id", 101);
  });
});

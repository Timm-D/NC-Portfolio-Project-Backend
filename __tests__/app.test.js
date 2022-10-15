process.env.NODE_ENV = "test";

const request = require("supertest");
require("jest-sorted");

const testData = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const { forEach } = require("../db/data/test-data/categories");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

// TICKET 03

describe("GET/api/categories", () => {
  test("200: responds with a categories object containing an array of objects, each with properties of 'slug' and 'description'", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories.length).toBe(4);
        expect(Array.isArray(categories)).toBe(true);

        categories.forEach((category) => {
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

test("404: returns 'Not found' when url is incorrect", () => {
  return request(app)
    .get("/api/nothingdoinghere")
    .expect(404)
    .then((response) => {
      expect(response.body).toEqual({ msg: "Not Found" });
    });
});

//TICKET 04
describe("GET/api/reviews/:review_id", () => {
  test("200: responds with an object containing the properties of a given review_id", () => {
    return request(app)
      .get("/api/reviews/13")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 13,
            title: "Settlers of Catan: Don't Settle For Less",
            designer: "Klaus Teuber",
            owner: "mallionaire",
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            review_body:
              "You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.",
            category: "social deduction",
            created_at: expect.any(String),
            votes: 16,
          })
        );
      });
  });
  test("400: return 'invalid input' when given an invalid id type", () => {
    return request(app)
      .get("/api/reviews/string")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid Input" });
      });
  });
  test("404: returns 'Not Found' when given an ID number not contained in the db", () => {
    return request(app)
      .get("/api/reviews/999")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Not Found" });
      });
  });
  test("200: returned object also contains a comment_count property", () => {
    return request(app)
    .get("/api/reviews/13")
    .expect(200)
    .then(({body}) =>{
      const {review} = body;
      expect(review).toHaveProperty("comment_count")
    } )
  })
});

// TICKET 05

describe("GET api/users", () => {
  test("200: responds with an array of users objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users.length).toBe(4);
        expect(Array.isArray(users)).toBe(true);

        users.forEach((user) => {
          expect.objectContaining({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  test("404: returns 'Not Found' when url is incorrect", () => {
    return request(app)
      .get("/api/nousersherethen")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Not Found" });
      });
  });
  
});

//TICKET 06

describe("PATCH api/reviews/:review_id", () => {
  test("200: responds with review object updated to reflect impact of newVote", () => {
    const requestObject = { inc_votes: 10 };

    return request(app)
      .patch("/api/reviews/13")
      .send(requestObject)
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 13,
            title: "Settlers of Catan: Don't Settle For Less",
            designer: "Klaus Teuber",
            owner: "mallionaire",
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            review_body:
              "You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.",
            category: "social deduction",
            created_at: expect.any(String),
            votes: 26,
          })
        );
      });
  });
  test("400: returns 'Invalid Data' when given inc_votes of the wrong type", () => {
    const requestObject = { inc_votes: "null" };

    return request(app)
      .patch("/api/reviews/13")
      .send(requestObject)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid Input" });
      });
  });
  test("400: returns 'Invalid' when given review_id of incorrect type", () => {
    const requestObject = { inc_votes: 10 };

    return request(app)
      .patch("/api/reviews/random")
      .send(requestObject)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid Input" });
      });
  });
  test("400: returns 'Invalid' when given broken requestObject", () => {
    const requestObject = { cni_setov: 10 };

    return request(app)
      .patch("/api/reviews/13")
      .send(requestObject)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Invalid Input" });
      });
  });
  test("404: returns 'Not Found' when given a review_id which does not exist in the db", () => {
    const requestObject = { inc_votes: 10 };

    return request(app)
      .patch("/api/reviews/999")
      .send(requestObject)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Not Found" });
      });
  });
  test.only("200: returned object also contains a comment_count property", () => {
    return request(app)
    .get("/api/reviews/13")
    .expect(200)
    .then(({body}) =>{
      const {review} = body;
      expect(review).toHaveProperty("comment_count")
    } )
  })
});


//TICKET 08

describe.only("/api/reviews", () => {
  describe('/api/reviews', () => {
    test("200: responds with all reviews if no query is set in descending order", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((reviews) => {
          const body = reviews.body.reviews;
          expect(body.length === 13).toBe(true);
          body.forEach((review) => {
            expect(review.hasOwnProperty("review_id")).toBe(true);
            expect(review.hasOwnProperty("title")).toBe(true);
            expect(review.hasOwnProperty("category")).toBe(true);
            expect(review.hasOwnProperty("designer")).toBe(true);
            expect(review.hasOwnProperty("owner")).toBe(true);
            expect(review.hasOwnProperty("review_body")).toBe(true);
            expect(review.hasOwnProperty("review_img_url")).toBe(true);
            expect(review.hasOwnProperty("created_at")).toBe(true);
            expect(review.hasOwnProperty("votes")).toBe(true);
            expect(review.hasOwnProperty("comment_count")).toBe(true);
          });
          expect(body).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("200: responds with reviews matching a query in descending date order", () => {
      return request(app)
        .get("/api/reviews?category=social deduction")
        .expect(200)
        .then((reviews) => {
          const body = reviews.body.reviews;
          expect(body.length === 11).toBe(true);
          body.forEach((review) => {
            expect(review.hasOwnProperty("review_id")).toBe(true);
            expect(review.hasOwnProperty("title")).toBe(true);
            expect(review.hasOwnProperty("category")).toBe(true);
            expect(review.hasOwnProperty("designer")).toBe(true);
            expect(review.hasOwnProperty("owner")).toBe(true);
            expect(review.hasOwnProperty("review_body")).toBe(true);
            expect(review.hasOwnProperty("review_img_url")).toBe(true);
            expect(review.hasOwnProperty("created_at")).toBe(true);
            expect(review.hasOwnProperty("votes")).toBe(true);
            expect(review.hasOwnProperty("comment_count")).toBe(true);
            expect(review.category).toBe("social deduction");
          });
          expect(body).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("200: responds with a 200 and an empty array when passed a valid query that has no reviews associated", () => {
      return request(app)
        .get("/api/reviews?category=children's games")
        .expect(200)
        .then((reviews) => {
          const body = reviews.body.reviews;
          expect(body.length === 0);
        });
    });
    test("404: responds 404 and an error message when passed a query that does not match a category", () => {
      return request(app)
        .get("/api/reviews?category=randoms")
        .expect(404)
        .then((response) => {
          expect(response.body.message).toEqual(
            "Not Found"
          );
        });
    })
  })
})



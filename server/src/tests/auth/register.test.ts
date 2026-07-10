import app from '../../app.js';
import { afterEach, describe, expect, test } from 'vitest';
import request from 'supertest';
import { db } from '../../config/db.config.js';

const testUser = {
  username: "testUser123",
  email: "testuser@abc.com",
  password: "12345678"
}

// INCOMPLETE
describe("POST /register", () => {
  afterEach(async () => {
    await db.query(
      "DELETE FROM users WHERE email = $1",
      [testUser.email]
    );
  });

  test("should register a new user", async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser)

    expect(res.status)
      .toBe(201);
  })


  test("should reject invalid body.", async () => {
    const invalidUser = {
      username: "ab",
      email: "testuser123",
      password: "1234"
    }

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(invalidUser)

    expect(res.status)
      .toBe(400);
  })


  test("should reject duplicate email.", async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.status)
      .toBe(409);
  })
});

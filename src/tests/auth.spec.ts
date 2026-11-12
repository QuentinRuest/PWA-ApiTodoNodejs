import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { app } from '../server';

describe('POST /auth/login', () => {
  it('retourne 401 si le mot de passe est incorrect', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'MauvaisMotDePasse',
      })
      .expect(401);

    assert.equal(response.body.error, 'Invalid email or password');
  });
});

describe('POST /auth/register', () => {
  it('retourne 409 si le courriel existe déjà', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'Utilisateur',
        email: 'test@example.com',
        password: 'TestPassword123!',
        role: 'client',
      })
      .expect(409);

    assert.equal(response.body.error, 'Ce courriel est déjà utilisé');
  });
});
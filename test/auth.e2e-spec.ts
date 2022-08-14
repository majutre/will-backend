import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const emailSample = 'e2e@teste.com';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should handle a registration request', () => {
    return request(app.getHttpServer())
      .post('/users/sign_up')
      .send({ email: emailSample, password: '1a2b3c' })
      .expect(201)
      .then((res) => {
        const id = res.body;
        expect(id).toBeDefined();
      });
  });

  it('get currently logged in user, if any', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/sign_up')
      .send({ email: emailSample, password: '1a2b3c' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/users/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(emailSample);
  });
});

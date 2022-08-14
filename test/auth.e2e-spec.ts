import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should handle a registration request', () => {
    const reqEmail = 'e2e@teste.com'
    return request(app.getHttpServer())
      .post('/users/sign_up')
      .send({ email: reqEmail, password: '1a2b3c' })
      .expect(201)
      .then((res) => {
        const id = res.body;
        expect(id).toBeDefined();
      });
  });
});

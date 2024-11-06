import { expect, test } from 'vitest';
import got from 'got';

const client = got.extend({
    prefixUrl: 'http://localhost:3000/',
    responseType: 'json',
    throwHttpErrors: false,
});

test('POST /signup', async ()=> {
    const res = await client.post('signup', {
        json: {
            email: 'johndoe@gmail.com',
            password: 'password'
        },
        responseType: 'json'
    });
    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.email).toBe('johndoe@gmail.com');
    expect(data).to.not.have.property('password');
});
const request = require('supertest')

const app = require('../index')

describe('GET /v1', () => {
  it('Parcel Pending API Test', () => {
    return request(app)
      .get('/v1')
      .expect(200)
      .then(res => {
        expect(typeof res.body.message).toBe('string')
        expect(res.body.message).toBe('Parcel Pending API')
      })
  })
})

describe('POST /v1/users - register', () => {
  let newUser = {
    firstname: 'tim',
    lastname: 'lengline',
    username: 'tlenglin',
    email: 'tim@gmail.com',
    password: 'tim'
  }
  it('should accept and add a valid new user', () => {
    return request(app)
      .post('/v1/users')
      .send(newUser)
      .then(res => {
        expect(res.body.status).toBe(201)
        expect(res.body.message).toBe('Successfully created new user.')
        return request(app)
          .post('/v1/users/login')
          .send(newUser)
      })
      .then(res => {
        expect(res.body.status).toBe(200)
        expect(res.body.user).not.toBeUndefined()
        expect(res.body.token).not.toBeUndefined()
      })
  })
  // it('should reject post without email or password', () => {
  //   let badUsers = [
  //     {
  //       firstname: 'max',
  //       lastname: 'martin',
  //       username: 'mmartin',
  //       password: 'max'
  //     },
  //     {
  //       firstname: 'marine',
  //       lastname: 'haziz',
  //       username: 'mhaziz',
  //       email: 'marine@gmail.com'
  //     }
  //   ]
  //   return Promise.all(
  //     badUsers.map(badUser => {
  //       return request(app)
  //         .post('/v1/users')
  //         .send(badUser)
  //         .then(res => {
  //           expect(res.body.status).toBe(400)
  //           expect(res.error.message.startsWith('Please enter')).toBe(true)
  //         })
  //     })
  //   )
  // })
})

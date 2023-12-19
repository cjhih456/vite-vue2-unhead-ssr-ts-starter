import express from 'express'
import JWT from 'jsonwebtoken'
import {faker} from '@faker-js/faker'
export default function createMockApi() {
  const router = express.Router()
  router.use(express.json())
  const key = 'SECRET_KEY'
  const tokenOptions = {
    algorithm: 'HS512',
    expiresIn: '1d',
    issuer: process.env.NODE_ENV
  }
  const refreshTokenOptions = {
    algorithm: 'HS512',
    expiresIn: '2d',
    issuer: process.env.NODE_ENV
  }
  const mockUserInfo = {
  1: {
      idx: 1,
      id: 'cjhih4',
      desc: 'du?',
      thumb: '',
      phone: '',
      email: '',
      password: '123123'
    }
  }
  const mockContentInfo = {
    1: {
      idx: 1,
      content: '123123123',
      uid: 1
    }
  }
  for(let length = 0; length < 100; length = Object.values(mockContentInfo).length) {
    const uid = faker.number.int({min: 1, max: 100})
    mockContentInfo[length + 1] = {
      idx: length + 1,
      content: faker.lorem.lines({min: 2, max: 5}),
      uid: uid
    }
    if(!mockUserInfo[uid]) {
      mockUserInfo[uid] = {
        idx: uid,
        id: faker.finance.accountName(),
        desc: 'du?',
        thumb: faker.image.urlLoremFlickr({
          width: 240,
          height: 240,
          category: 'mountain'
        }),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: '123123'
      }
    }
  }

  function makeTokens(idx) {
    const token = JWT.sign({
      idx,
      originToken: false
    }, key, tokenOptions)
    const refreshToken = JWT.sign({
      idx,
      originToken: token
    }, key, tokenOptions)
    return { token, refreshToken }
  }
  router.post('/user/login', (req, res) => {
    const id = req.body['id']
    const pw = req.body['pw']
    const userInfo = Object.values(mockUserInfo).find((user) => user.id === id && user.password === pw)
    if(!userInfo) return res.json({ message: 'user not found' }).status(500)
    res.json(makeTokens(userInfo.idx))
  })
  const authMiddle = (req, res, next) => {
    const auth = req.headers['authorization']
    if(!auth) {
      res.status(401).send()
      next(401)
      return
    }
    const [type, token] = auth.split(' ')
    try{
      JWT.verify(token, key, tokenOptions)
      next()
    }catch (e) {
      res.status(403)
      return
    }
  }
  router.get('/user/me', authMiddle, (req, res) => {
    const auth = req.headers['authorization']
    const [type, token] = auth.split(' ')
    const tokenValues = JWT.decode(token, tokenOptions)
    res.json({
      userInfo: mockUserInfo[tokenValues.idx]
    })
  })
  router.get('/user/refreshToken', (req, res) => {
    const token = req.body['refreshToken']
    if(!token) {
      res.status(401).json({errorMessage: 'Auth Error'})
      return
    }
    try {
      JWT.verify(token, key, refreshTokenOptions)
      const tokenValues = JWT.decode(token, tokenOptions)
      res.json(makeTokens(tokenValues.idx))
    } catch(e) {
      res.status(401).json({errorMessage: 'Auth Error'})
    }
  })
  router.get('/contents', (req, res) => {
    const pageSize = req.query.pageSize || 10
    const offset = req.query.offset || 0
    const contentList = Object.values(mockContentInfo).slice(offset, pageSize).map(v => {v.writer = mockUserInfo[v.uid]; return v})
    res.json({
      content: contentList,
      page: { offset, pageSize }
    })
  })
  router.get('/contents/:id(\d+)', (req, res) => {
    const content = mockContentInfo[req.params.id]
    if(!content) return res.status(404).json({errorMessage: 'not found'})
    content.writer = mockUserInfo[content.uid]
    res.json({
      content: content
    })
  })
  router.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({errorMessage: 'Something broke!'})
  })
  return router
}
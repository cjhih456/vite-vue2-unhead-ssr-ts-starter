import express from 'express'
import JWT from 'jsonwebtoken'
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
  const mockUserInfo = [
    {
      idx: 1,
      id: 'cjhih4',
      desc: 'du?',
      thumb: '',
      phone: '',
      email: '',
      password: '123123'
    }
  ]
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
    const userInfo = mockUserInfo.find((user) => user.id === id && user.password === pw)
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
      userInfo: mockUserInfo[tokenValues.idx - 1]
    })
  })
  router.get('/user/refreshToken', (req, res) => {
    const token = req.body['refreshToken']
    if(!token) {
      res.status(401)
      return
    }
    try {
      JWT.verify(token, key, refreshTokenOptions)
      const tokenValues = JWT.decode(token, tokenOptions)
      res.json(makeTokens(tokenValues.idx))
    } catch(e) {
      res.status(401)
      return 
    }
  })

  router.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  return router
}
const jwt = require('jsonwebtoken')

function auth (req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).send('Login Required')
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decodedToken
   
  
      next()
    } catch (error) {
      res.status(401).send('Failed to Authorize!')
    }
  }

module.exports={auth}
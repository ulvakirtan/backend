const jwt = require('jsonwebtoken');

function auth(requiredRole = null) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ msg: 'Missing token' });

    const token = authHeader.split(' ')[1]; // Format: 'Bearer <token>'
    if (!token) return res.status(401).json({ msg: 'Missing token' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'campussecret');
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ msg: 'Forbidden, insufficient permissions' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  }
}

module.exports = auth;


const jwt = require('jsonwebtoken');

exports.verify_action_auth = (changedUser, token) => { 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return changedUser == decodedToken.UserId || decodedToken.isAdmin ;
  } 
const jwt = require('jsonwebtoken');
const commonHelper = require('all-in-one');

const config = require('../infra');

const wrapper = commonHelper.Wrapper;
const { ERROR } = commonHelper;
const { ForbiddenError } = commonHelper.Error;
const jwtPrivateKey = String(config.get('/jwt/privateKey'));
const jwtPublicKey = String(config.get('/jwt/publicKey'));

const signOptions = {
  algorithm: config.get('/jwt/signOptions/algorithm'),
  audience: config.get('/jwt/signOptions/audience'),
  issuer: config.get('/jwt/signOptions/issuer'),
  expiresIn: config.get('/jwt/signOptions/expiresIn'),
};

const verifyOptions = {
  algorithms: [config.get('/jwt/verifyOptions/algorithm')],
  audience: config.get('/jwt/verifyOptions/audience'),
  issuer: config.get('/jwt/verifyOptions/issuer'),
};

const decodeKey = (secret) => Buffer.from(secret, 'base64').toString('ascii');

const generateToken = async (payload) => {
  const privateKey = decodeKey(jwtPrivateKey);
  return jwt.sign(payload, privateKey, signOptions);
};

const getToken = (headers) => {
  if (String(headers.authorization).startsWith('Bearer ')) {
    const token = headers.authorization;
    return token.substring(7, token.length);
  }
  return undefined;
};

const verifyToken = async (req, res,next) => {
  const result = { err: null, data: null };
  const publicKey = decodeKey(jwtPublicKey);
  const token = getToken(req.headers);
  if (!token) {
    result.err = new ForbiddenError('Invalid authorization!');
    return wrapper.response(res, 'fail', result, 'Invalid authorization!', ERROR.FORBIDDEN);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, publicKey, verifyOptions);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.err = new ForbiddenError('Access token expired!');
      return wrapper.response(res, 'fail', result, 'Access token expired!', ERROR.FORBIDDEN);
    }
    result.err = new ForbiddenError('Token is not valid!');
    return wrapper.response(res, 'fail', result, 'Token is not valid!', ERROR.FORBIDDEN);
  }
  req.userMeta = decodedToken.metadata;
  next()
};

module.exports = {
  generateToken,
  verifyToken,
};

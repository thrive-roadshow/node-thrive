const config = require('../infra');
const commonHelper = require('all-in-one');
const wrapper = commonHelper.Wrapper;
const { UnauthorizedError } = commonHelper.Error;
const validate = require('validate.js');

const isAuthenticated = async (req, res) => {
  const result = { err: null, data: null };
  if (validate.isEmpty(req?.authorization?.basic)) {
    result.err = new UnauthorizedError();
    return wrapper.response(res, 'fail', result, 'Token is not valid!', 401);
  }
  const { username } = req.authorization.basic;
  const { password } = req.authorization.basic;
  const userDatas = config.get('/basicAuthApi');
  userDatas.forEach((value) => {
    if ((value.username !== username) || (value.password !== password)) {
      result.err = new UnauthorizedError();
      return wrapper.response(res, 'fail', result, 'Token is not valid!', 401);
    }
  });
};

module.exports = {
  isAuthenticated
};

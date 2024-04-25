const sinon = require('sinon');
const supertest = require('supertest');
const app = require('../../app'); // Assuming this is your Express app
const commonHelper = require('../helpers/commonHelper');
const commandModel = require('../models/commandModel');
const commandHandler = require('../handlers/commandHandler');
const wrapper = require('../helpers/wrapper');
const httpError = require('../constants/httpError');
const http = require('../constants/http');

describe('getRefreshToken', () => {
  let request;

  beforeEach(() => {
    request = supertest(app);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return success response when valid payload is provided', async () => {
    const payload = {
      /* your valid payload here */
    };
    const expectedResult = {
      /* your expected result here */
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(payload);
    sinon.stub(commandHandler, 'getRefreshToken').resolves(expectedResult);
    sinon.stub(wrapper, 'response');

    await request.post('/api/refresh-token').send(payload).expect(http.OK);

    sinon.assert.calledWith(wrapper.response, sinon.match.any, 'success', expectedResult, 'Refresh token success', http.OK);
  });

  it('should return fail response when invalid payload is provided', async () => {
    const payload = {
      /* your invalid payload here */
    };
    const expectedResult = {
      /* your expected result here */
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(payload);
    sinon.stub(wrapper, 'response');

    await request.post('/api/refresh-token').send(payload).expect(httpError.CONFLICT);

    sinon.assert.calledWith(wrapper.response, sinon.match.any, 'fail', expectedResult, 'Refresh token fail', httpError.CONFLICT);
  });
});

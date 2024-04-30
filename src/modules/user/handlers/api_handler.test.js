const sinon = require('sinon');
// const request = require('supertest');
// const app = require('../../app'); // Assuming this is your Express app
const commonHelper = require('all-in-one');
const commandHandler = require('../repositories/commands/command_handler');
const wrapper = commonHelper.Wrapper;

describe('getRefreshToken', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return success response with valid payload', async () => {
    const req = {
      body: {
        // Add your valid payload here
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(true);
    sinon.stub(commandHandler, 'getRefreshToken').returns({ data: 'your-refresh-token' });
    sinon.stub(wrapper, 'response');

    await getRefreshToken(req, res);

    sinon.assert.calledWith(wrapper.response, res, 'success', { data: 'your-refresh-token' }, 'Refresh token success', 200);
  });

  it('should return fail response with invalid payload', async () => {
    const req = {
      body: {
        // Add your invalid payload here
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(false);
    sinon.stub(wrapper, 'response');

    await getRefreshToken(req, res);

    sinon.assert.calledWith(wrapper.response, res, 'fail', sinon.match.any, 'Refresh token fail', 409);
  });

  it('should make a POST request with the validated payload', async () => {
    const req = {
      body: {
        // Add your payload here
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(true);
    sinon.stub(commandHandler, 'getRefreshToken').returns({ data: 'your-refresh-token' });
    sinon.stub(wrapper, 'response');

    await getRefreshToken(req, res);

    sinon.assert.calledWith(commandHandler.getRefreshToken, sinon.match({ data: req.body }));
  });

  it('should send the response returned by the postRequest function', async () => {
    const req = {
      body: {
        // Add your payload here
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(true);
    sinon.stub(commandHandler, 'getRefreshToken').returns({ data: 'your-refresh-token' });
    sinon.stub(wrapper, 'response');

    await getRefreshToken(req, res);

    sinon.assert.calledWith(wrapper.response, res, sinon.match.any, { data: 'your-refresh-token' }, sinon.match.any, sinon.match.any);
  });

  it('should call the sendResponse function', async () => {
    const req = {
      body: {
        // Add your payload here
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(true);
    sinon.stub(commandHandler, 'getRefreshToken').returns({ data: 'your-refresh-token' });
    sinon.stub(wrapper, 'response');
    const sendResponseStub = sinon.stub().resolves();

    await getRefreshToken(req, res);

    sinon.assert.calledWith(sendResponseStub, { data: 'your-refresh-token' });
  });

  it('should call the postRequest function with the validated payload', async () => {
    const req = {
      body: {
        // Add your payload here
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(true);
    const postRequestStub = sinon.stub().resolves();
    sinon.stub(commandHandler, 'getRefreshToken').returns({ data: 'your-refresh-token' });
    sinon.stub(wrapper, 'response');

    await getRefreshToken(req, res);

    sinon.assert.calledWith(postRequestStub, sinon.match({ data: req.body }));
  });

  it('should call the response function with the correct arguments when postRequest returns an error', async () => {
    const req = {
      body: {
        // Add your payload here
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(commonHelper, 'isValidPayload').returns(true);
    const postRequestStub = sinon.stub().resolves({ err: true });
    sinon.stub(commandHandler, 'getRefreshToken').returns({ data: 'your-refresh-token' });
    sinon.stub(wrapper, 'response');

    await getRefreshToken(req, res);

    sinon.assert.calledWith(wrapper.response, res, 'fail', { err: true }, 'Refresh token fail', 409);
  });
});

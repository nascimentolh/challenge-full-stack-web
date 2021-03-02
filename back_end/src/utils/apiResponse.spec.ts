import { mockResponse } from '../tests/unit/apiMock';
import apiResponse from './apiResponse';

describe('utilities/ApiResponse', () => {
  let response = mockResponse();
  beforeEach(() => {
    response = mockResponse();
  });
  test('Api result with body', () => {
    apiResponse.result(response, {});
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      data: {},
      success: true,
    });
  });

  test('Api error with body', () => {
    apiResponse.error(response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: {
        message: 'Bad Request',
      },
      override: null,
      success: false,
    });
  });
});

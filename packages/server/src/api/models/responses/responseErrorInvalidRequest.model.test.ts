import * as HttpStatus from 'http-status-codes';
import { ResponseErrorInvalidRequest } from './responseErrorInvalidRequest.model';
import { InputValidationError } from '../inputValidationError.model';

describe(`[${ResponseErrorInvalidRequest.name}]`, () => {
  it('should set the message', () => {
    const responseError = new ResponseErrorInvalidRequest([]);

    expect(responseError.message).toBeDefined();
    expect(responseError.message.trim().length).toBeGreaterThan(0);
  });

  it('should return a bad request status code', () => {
    const responseError = new ResponseErrorInvalidRequest([]);

    expect(responseError.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should set the errors property to the given validation errors', () => {
    const validationErrors: InputValidationError[] = [];
    const responseError = new ResponseErrorInvalidRequest(validationErrors);

    expect(responseError.errors).toBe(validationErrors);
  });
});
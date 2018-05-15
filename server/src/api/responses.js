// @flow

export const Success = {
    USER_CREATED: {
        isError: false,
        code: 201,
        message: 'User created',
    },
    DATA_CREATED: {
        isError: false,
        code: 201,
        message: 'Data created',
    },
    AUTH_SUCCESS: {
        isError: false,
        code: 200,
        message: 'Authorized',
    },
    EMAIL_CONFIRMED: {
        isError: false,
        code: 200,
        message: 'Email confirmed',
    },
    DATA_FOUND: {
        isError: false,
        code: 200,
        message: 'Data found',
    },
};

export const ClientError = {
    AUTH_FAILED: {
        isError: true,
        code: 401,
        message: 'Authentication failed',
    },
    INVALID_REGISTRATION: {
        isError: true,
        code: 400,
        message: 'Invalid registration',
    },
    EMAIL_CONFIRMATION_FAILED: {
        isError: true,
        code: 400,
        message: 'Email confirmation failed',
    },
    DATA_NOT_FOUND: {
        isError: true,
        code: 404,
        message: 'Data not found',
    },
    BAD_BODY: {
        isError: true,
        code: 400,
        message: 'Bad body',
    },
};

export const ServerError = {
    REGISTRATION_FAILED: {
        isError: true,
        code: 500,
        message: 'Registration failed',
    },
};

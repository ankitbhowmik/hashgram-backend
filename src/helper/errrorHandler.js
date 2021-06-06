module.exports.responseMethod = (
    req,
    res,
    data,
    code,
    success = true,
    message = ""
) =>
    res.status(code).send({
        code,
        message: message,
        success: success,
        data,
    });

const responseCode = {
    OK: 200,
    NO_con: 204,
    CREATED: 201,
    ACCEPTED: 202,
    RESET_CONTENT: 205,
    NON_AUTHORITATIVE_INFORMATION: 203,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    IM_USED: 226,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    GATEWAY_TIMEOUT: 504,
    NOT_EXTENDED: 510,
    SERVICE_UNAVAILABLE: 503,
    HTTP_VERSION_NOT_SUPPORTED: 505,
};


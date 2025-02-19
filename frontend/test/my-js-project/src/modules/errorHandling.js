// filepath: /my-js-project/my-js-project/src/modules/errorHandling.js

class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}

const handleError = (error) => {
    if (error instanceof CustomError) {
        console.error(`Error Code: ${error.code} - ${error.message}`);
    } else {
        console.error(`Unexpected Error: ${error.message}`);
    }
};

const throwError = (message, code) => {
    throw new CustomError(message, code);
};

export { handleError, throwError, CustomError };
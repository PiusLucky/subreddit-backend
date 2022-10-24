export class BasicError extends Error {
  /**
   * A custom error if the fault is from the user.
   * @param message the error message
   * @param code Optional error code, usually of numbers
   */
  constructor(message: string, public code?: string) {
    super(message);
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    this.code = code || "0";
  }
}

export class UserError extends Error {
  /**
   * A custom error if the fault is from the user.
   * @param message the error message
   * @param code Optional error code, usually of numbers
   */
  constructor(message: string, public code?: string) {
    super(message);
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    this.code = code || "0";
  }
}

export class UserUnauthorizedError extends Error {
  /**
   * A custom error if the fault is from the user.
   * @param message the error message
   * @param code Optional error code, usually of numbers
   */
  constructor(message: string, public code?: string) {
    super(message);
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    this.code = code || "0";
  }
}

export class UserConflictError extends Error {
  /**
   * A custom error if the fault is from the user.
   * @param message the error message
   * @param code Optional error code, usually of numbers
   */
  constructor(message: string, public code?: string) {
    super(message);
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    this.code = code || "0";
  }
}

export class DataNotFoundError extends Error {
  /**
   * A custom error if the fault is from the user.
   * @param message the error message
   * @param code Optional error code, usually of numbers
   */
  constructor(message: string, public code?: string) {
    super(message);
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    this.code = code || "0";
  }
}

export class ForbiddenError extends Error {
  /**
   * A custom error if the fault is from the user.
   * @param message the error message
   * @param code Optional error code, usually of numbers
   */
  constructor(message: string, public code?: string) {
    super(message);
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    this.code = code || "0";
  }
}

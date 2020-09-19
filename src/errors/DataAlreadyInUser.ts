import { BaseError } from "./BaseError";

export class DataAlreadyInUser extends BaseError {
  constructor(message: string) {
    super(message, 406);
  }
}
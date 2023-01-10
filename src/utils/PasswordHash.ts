import bcrypt from "bcrypt";

class PasswordHash {
  public _hash: any;

  constructor() {
    this.fungsi();
  }

  fungsi() {
    this._hash = (password: string): Promise<string> => {
      return bcrypt.hash(password, 10);
    };
  }
}

export default new PasswordHash();

export class PasswordVO {
  private constructor(private readonly _value: string) {}

  static create(value: string): PasswordVO {
    if (value.length < 6) {
      throw new Error(
        'PasswordVO must be at least 6 characters long'
      );
    }

    if (!/[A-Z]/.test(value)) {
      throw new Error(
        'PasswordVO must contain at least one uppercase letter'
      );
    }

    if (!/[a-z]/.test(value)) {
      throw new Error(
        'PasswordVO must contain at least one lowercase letter'
      );
    }

    if (!/\d/.test(value)) {
      throw new Error(
        'PasswordVO must contain at least one number'
      );
    }

    return new PasswordVO(value);
  }

  get value(): string {
    return this._value;
  }
}
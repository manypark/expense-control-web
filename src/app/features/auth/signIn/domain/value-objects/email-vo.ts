export class EmailVO {
  private constructor(private readonly _value: string) {}

  static create(value: string): EmailVO {
    const email = value.trim().toLowerCase();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    return new EmailVO(email);
  }

  get value(): string {
    return this._value;
  }
}
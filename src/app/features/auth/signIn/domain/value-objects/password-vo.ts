export class PasswordVO {

  private constructor(private readonly _value: string) {}
  
  static create(value: string): PasswordVO {

    if (value.length < 6) {
      throw new Error( 'La contraseña debe de tener al menos 6 caracteres' );
    }

    if (!/[A-Z]/.test(value)) {
      throw new Error( 'La contraseña debe de tener al menos una minuscula' );
    }

    if (!/[a-z]/.test(value)) {
      throw new Error( 'La contraseña debe de tener al menos una mayuscula' );
    }

    if (!/\d/.test(value)) {
      throw new Error( 'La contraseña debe de tener al menos un número' );
    }

    return new PasswordVO(value);
  }

  get value(): string { return this._value; }
}
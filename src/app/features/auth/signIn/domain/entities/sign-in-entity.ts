import { PasswordVO, EmailVO } from "../value-objects";

export interface SignInRequestEntity {
    email   : EmailVO;
    password: PasswordVO;
}
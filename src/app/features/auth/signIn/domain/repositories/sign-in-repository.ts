import { SignInRequestEntity, SignInResponseEntity } from "../entities";

export abstract class SignInRepository {
    abstract signIn( credentials: SignInRequestEntity ):Promise<SignInResponseEntity>;
}
export interface SignInResponseEntity {
    accessToken : string;
    refreshToken: string;
    user        : UserEntity;
}

export interface UserEntity {
    id      : string;
    email   : string;
}
export interface AlteryxCredentials {
    gateway: string;
}

export interface UserCredentials extends AlteryxCredentials{
    gateway: string;
    user: string;
    password: string;
}

export interface TokenCredentials extends AlteryxCredentials{
    gateway: string;
    token: string;
}

export interface ClientCredentials extends AlteryxCredentials{
    gateway: string;
    basicAuth: string;
}

export interface SecretCredentials extends AlteryxCredentials{
    gateway: string;
    clientId: string;
    clientSecret: string;
}

export function isSecretCredentials(obj: any): boolean {
    return obj && obj.gateway && obj.clientId && obj.clientSecret;
}

export function isUserCredentials(obj: any): boolean {
    return obj && obj.gateway && obj.user && obj.password;
}

export function isClientCredentials(obj: any): boolean {
    return obj && obj.gateway && obj.basicAuth;
}

export function isTokenCredentials(obj: any): boolean {
    return obj && obj.gateway && obj.token;
}

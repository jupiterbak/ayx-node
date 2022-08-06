export interface AlteryxCredentials {
    gateway: string;
    basicAuth: string;
}

export interface UserCredentials extends AlteryxCredentials{
    gateway: string;
    basicAuth: string;
    appName: string;
    appVersion: string;
    tenant: string;
}

export interface ClientCredentials extends AlteryxCredentials{
    gateway: string;
    basicAuth: string;
    appName: string;
    appVersion: string;
}


export function isUserCredentials(obj: any): boolean {
    return obj && obj.gateway && obj.basicAuth && obj.tenant && obj.appName;
}

export function isClientCredentials(obj: any): boolean {
    return obj && obj.gateway && obj.basicAuth && obj.appName;
}

import { firstValueFrom } from "rxjs";
import { inject, Service } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { HttpAdapter } from "./http-services";
import { environment } from "../../../../enviroments/environment";

@Service()
export class HttpClientService implements HttpAdapter {

    private readonly baseUrl = environment.apiUrl;
    private readonly http = inject(HttpClient);

    get<T>(url: string, options?: object): Promise<T> {
        return firstValueFrom( this.http.get<T>(`${this.baseUrl}${url}`, options) );
    }

    post<T>(url: string, body: unknown, options?: object): Promise<T> {
        return firstValueFrom( this.http.post<T>(`${this.baseUrl}${url}`, body, options) );
    }

    put<T>(url: string, body: unknown, options?: object): Promise<T> {
        return firstValueFrom( this.http.put<T>(`${this.baseUrl}${url}`, body, options) );
    }

    patch<T>(url: string, body: unknown, options?: object): Promise<T> {
        return firstValueFrom( this.http.patch<T>(`${this.baseUrl}${url}`, body, options) );
    }

    delete<T>(url: string, options?: object): Promise<T> {
        return firstValueFrom( this.http.delete<T>(`${this.baseUrl}${url}`, options) );
    }   
}

export interface HttpAdapter {
  get<T>(url: string, options?: object): Promise<T>;
  post<T>(url: string, body: unknown, options?: object): Promise<T>;
  put<T>(url: string, body: unknown, options?: object): Promise<T>;
  patch<T>(url: string, body: unknown, options?: object): Promise<T>;
  delete<T>(url: string, options?: object): Promise<T>;
}
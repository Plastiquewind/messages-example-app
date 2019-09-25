import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { API_URL } from './api-injection-token';
import { Observable } from 'rxjs';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  private readonly absoluteUrlPattern = /^https?:\/\//i;

  public constructor(@Inject(API_URL) private apiUrl: string) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.prepareUrl(req.url) });
    return next.handle(req);
  }

  private isAbsoluteUrl(url: string): boolean {
    return this.absoluteUrlPattern.test(url);
  }

  private prepareUrl(url: string): string {
    const fullUrl = this.isAbsoluteUrl(url) ? url : this.getFullPath(url);

    return fullUrl.replace(/([^:]\/)\/+/g, '$1');
  }

  private getFullPath(url: string): string {
    return this.apiUrl.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
  }
}

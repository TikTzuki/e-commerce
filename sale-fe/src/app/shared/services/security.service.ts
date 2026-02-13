import {StorageService} from './storage.service';
import {Observable, of, Subject} from 'rxjs';
import {ConfigurationService} from './configuration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IAuthorizeRequest} from '../models/authorizeRequest.model';
import {tap} from 'rxjs/operators';
import {IRegistingRequest} from '../models/registingCustomerRequest.model';
import {ICustomer} from "../models/customer.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private headers: HttpHeaders;
  private storage;
  public UserData$: Subject<ICustomer> = new Subject<ICustomer>();
  public userData!: ICustomer;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private _storageService: StorageService,
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.storage = _storageService;
  }

  public GoToLoginPage() {
    this._router.navigate(['/sign-in']);
  }

  public Authorize(authorizedRequest: IAuthorizeRequest) {
    const url = `${environment.API_HOST}/api/authenticate/login`;
    this._http.post(url, JSON.stringify(authorizedRequest), this.setHeaders()).pipe<IAuthorizeResponseSuccess>(
      tap((res: any) => {
        return res;
      })
    ).subscribe({
      next: res => {
      },
      error: err => {
        alert("wrong input!!!");
      }
    });
  }

  public HandleError(error: any) {
    console.log(error);
    if (error.status == 403) {
      alert('Forbidden');
    } else if (error.status == 401) {
      alert('Unauthorized');
    }
  }

  public getUserProfile(): Observable<ICustomer> {
    // Auth disabled - return empty observable
    return of();
  }

  public isLoggedIn(): boolean {
    return false;
  }

  public login(): Promise<void> {
    console.warn('Auth is disabled');
    return Promise.resolve();
  }

  public logout(redirectUri?: string): Promise<void> {
    console.warn('Auth is disabled');
    return Promise.resolve();
  }

  getUser(userId: number): Observable<ICustomer> {
    return this._http.get(`${environment.API_HOST}/api/customers/${userId}`)
      .pipe<ICustomer>(tap((res: any) => {
        return res;
      }));
  }

  public Register(registingRequest: IRegistingRequest) {
    const url = `${environment.API_HOST}api/authenticate/register`;
    this._http.post(url, JSON.stringify(registingRequest), this.setHeaders()).pipe<IAuthorizeResponseSuccess>(
      tap((res: any) => {
        return res;
      })
    ).subscribe({
      next: res => {
        window.alert("success!!!");
      },
      error: err => window.alert("user already exists")
    });
  }

  GetToken(): any {
    return this.storage.retrieve('accessToken');
  }

  private setHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders()
    };

    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');

    const token = this.GetToken();

    if (token !== '') {
      httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
    return httpOptions;
  }
}

interface IAuthorizeResponseSuccess {
  token: string;
  refreshToken: string;
  expiration: string;
}

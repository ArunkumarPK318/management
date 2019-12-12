import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { App } from 'app/shared/model/app.model';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { AppDetailComponent } from './app-detail.component';
import { AppUpdateComponent } from './app-update.component';
import { IApp } from 'app/shared/model/app.model';

@Injectable({ providedIn: 'root' })
export class AppResolve implements Resolve<IApp> {
  constructor(private service: AppService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApp> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((app: HttpResponse<App>) => app.body));
    }
    return of(new App());
  }
}

export const appRoute: Routes = [
  {
    path: '',
    component: AppComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apps'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AppDetailComponent,
    resolve: {
      app: AppResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apps'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AppUpdateComponent,
    resolve: {
      app: AppResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apps'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AppUpdateComponent,
    resolve: {
      app: AppResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Apps'
    },
    canActivate: [UserRouteAccessService]
  }
];

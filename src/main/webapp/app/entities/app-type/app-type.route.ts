import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppType } from 'app/shared/model/app-type.model';
import { AppTypeService } from './app-type.service';
import { AppTypeComponent } from './app-type.component';
import { AppTypeDetailComponent } from './app-type-detail.component';
import { AppTypeUpdateComponent } from './app-type-update.component';
import { IAppType } from 'app/shared/model/app-type.model';

@Injectable({ providedIn: 'root' })
export class AppTypeResolve implements Resolve<IAppType> {
  constructor(private service: AppTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppType> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((appType: HttpResponse<AppType>) => appType.body));
    }
    return of(new AppType());
  }
}

export const appTypeRoute: Routes = [
  {
    path: '',
    component: AppTypeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AppTypeDetailComponent,
    resolve: {
      appType: AppTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AppTypeUpdateComponent,
    resolve: {
      appType: AppTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AppTypeUpdateComponent,
    resolve: {
      appType: AppTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppTypes'
    },
    canActivate: [UserRouteAccessService]
  }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Roles } from 'app/shared/model/roles.model';
import { RolesService } from './roles.service';
import { RolesComponent } from './roles.component';
import { RolesDetailComponent } from './roles-detail.component';
import { RolesUpdateComponent } from './roles-update.component';
import { IRoles } from 'app/shared/model/roles.model';

@Injectable({ providedIn: 'root' })
export class RolesResolve implements Resolve<IRoles> {
  constructor(private service: RolesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRoles> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((roles: HttpResponse<Roles>) => roles.body));
    }
    return of(new Roles());
  }
}

export const rolesRoute: Routes = [
  {
    path: '',
    component: RolesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RolesDetailComponent,
    resolve: {
      roles: RolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RolesUpdateComponent,
    resolve: {
      roles: RolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RolesUpdateComponent,
    resolve: {
      roles: RolesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  }
];

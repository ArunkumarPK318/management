import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from 'app/shared/model/organization.model';
import { OrganizationService } from './organization.service';
import { OrganizationComponent } from './organization.component';
import { OrganizationDetailComponent } from './organization-detail.component';
import { OrganizationUpdateComponent } from './organization-update.component';
import { IOrganization } from 'app/shared/model/organization.model';

@Injectable({ providedIn: 'root' })
export class OrganizationResolve implements Resolve<IOrganization> {
  constructor(private service: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrganization> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((organization: HttpResponse<Organization>) => organization.body));
    }
    return of(new Organization());
  }
}

export const organizationRoute: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrganizationDetailComponent,
    resolve: {
      organization: OrganizationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrganizationUpdateComponent,
    resolve: {
      organization: OrganizationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrganizationUpdateComponent,
    resolve: {
      organization: OrganizationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Organizations'
    },
    canActivate: [UserRouteAccessService]
  }
];

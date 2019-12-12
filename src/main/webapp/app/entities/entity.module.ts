import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'app-type',
        loadChildren: () => import('./app-type/app-type.module').then(m => m.UsermanagementappAppTypeModule)
      },
      {
        path: 'app',
        loadChildren: () => import('./app/app.module').then(m => m.UsermanagementappAppModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.UsermanagementappRolesModule)
      },
      {
        path: 'app-user',
        loadChildren: () => import('./app-user/app-user.module').then(m => m.UsermanagementappAppUserModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('./organization/organization.module').then(m => m.UsermanagementappOrganizationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class UsermanagementappEntityModule {}

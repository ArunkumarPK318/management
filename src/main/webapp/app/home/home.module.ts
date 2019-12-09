import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserMgmtAppSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [UserMgmtAppSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class UserMgmtAppHomeModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsermanagementappSharedModule } from 'app/shared/shared.module';
import { AppTypeComponent } from './app-type.component';
import { AppTypeDetailComponent } from './app-type-detail.component';
import { AppTypeUpdateComponent } from './app-type-update.component';
import { AppTypeDeleteDialogComponent } from './app-type-delete-dialog.component';
import { appTypeRoute } from './app-type.route';

@NgModule({
  imports: [UsermanagementappSharedModule, RouterModule.forChild(appTypeRoute)],
  declarations: [AppTypeComponent, AppTypeDetailComponent, AppTypeUpdateComponent, AppTypeDeleteDialogComponent],
  entryComponents: [AppTypeDeleteDialogComponent]
})
export class UsermanagementappAppTypeModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsermanagementappSharedModule } from 'app/shared/shared.module';
import { AppComponent } from './app.component';
import { AppDetailComponent } from './app-detail.component';
import { AppUpdateComponent } from './app-update.component';
import { AppDeleteDialogComponent } from './app-delete-dialog.component';
import { appRoute } from './app.route';

@NgModule({
  imports: [UsermanagementappSharedModule, RouterModule.forChild(appRoute)],
  declarations: [AppComponent, AppDetailComponent, AppUpdateComponent, AppDeleteDialogComponent],
  entryComponents: [AppDeleteDialogComponent]
})
export class UsermanagementappAppModule {}

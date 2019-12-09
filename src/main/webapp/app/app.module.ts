import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { UserMgmtAppSharedModule } from 'app/shared/shared.module';
import { UserMgmtAppCoreModule } from 'app/core/core.module';
import { UserMgmtAppAppRoutingModule } from './app-routing.module';
import { UserMgmtAppHomeModule } from './home/home.module';
import { UserMgmtAppEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    UserMgmtAppSharedModule,
    UserMgmtAppCoreModule,
    UserMgmtAppHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    UserMgmtAppEntityModule,
    UserMgmtAppAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class UserMgmtAppAppModule {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from './app-user.service';
import { AppUserDeleteDialogComponent } from './app-user-delete-dialog.component';

@Component({
  selector: 'jhi-app-user',
  templateUrl: './app-user.component.html'
})
export class AppUserComponent implements OnInit, OnDestroy {
  appUsers: IAppUser[];
  eventSubscriber: Subscription;

  constructor(protected appUserService: AppUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.appUserService.query().subscribe((res: HttpResponse<IAppUser[]>) => {
      this.appUsers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInAppUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAppUser) {
    return item.id;
  }

  registerChangeInAppUsers() {
    this.eventSubscriber = this.eventManager.subscribe('appUserListModification', () => this.loadAll());
  }

  delete(appUser: IAppUser) {
    const modalRef = this.modalService.open(AppUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.appUser = appUser;
  }
}

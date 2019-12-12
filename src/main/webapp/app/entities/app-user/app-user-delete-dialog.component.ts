import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from './app-user.service';

@Component({
  templateUrl: './app-user-delete-dialog.component.html'
})
export class AppUserDeleteDialogComponent {
  appUser: IAppUser;

  constructor(protected appUserService: AppUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.appUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'appUserListModification',
        content: 'Deleted an appUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApp } from 'app/shared/model/app.model';
import { AppService } from './app.service';

@Component({
  templateUrl: './app-delete-dialog.component.html'
})
export class AppDeleteDialogComponent {
  app: IApp;

  constructor(protected appService: AppService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.appService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'appListModification',
        content: 'Deleted an app'
      });
      this.activeModal.dismiss(true);
    });
  }
}

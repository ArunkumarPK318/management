import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppType } from 'app/shared/model/app-type.model';
import { AppTypeService } from './app-type.service';

@Component({
  templateUrl: './app-type-delete-dialog.component.html'
})
export class AppTypeDeleteDialogComponent {
  appType: IAppType;

  constructor(protected appTypeService: AppTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.appTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'appTypeListModification',
        content: 'Deleted an appType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

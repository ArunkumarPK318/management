import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from './organization.service';

@Component({
  templateUrl: './organization-delete-dialog.component.html'
})
export class OrganizationDeleteDialogComponent {
  organization: IOrganization;

  constructor(
    protected organizationService: OrganizationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.organizationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'organizationListModification',
        content: 'Deleted an organization'
      });
      this.activeModal.dismiss(true);
    });
  }
}

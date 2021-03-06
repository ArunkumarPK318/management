import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from './organization.service';
import { OrganizationDeleteDialogComponent } from './organization-delete-dialog.component';

@Component({
  selector: 'jhi-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit, OnDestroy {
  organizations: IOrganization[];
  eventSubscriber: Subscription;

  constructor(
    protected organizationService: OrganizationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.organizationService.query().subscribe((res: HttpResponse<IOrganization[]>) => {
      this.organizations = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInOrganizations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrganization) {
    return item.id;
  }

  registerChangeInOrganizations() {
    this.eventSubscriber = this.eventManager.subscribe('organizationListModification', () => this.loadAll());
  }

  delete(organization: IOrganization) {
    const modalRef = this.modalService.open(OrganizationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.organization = organization;
  }
}

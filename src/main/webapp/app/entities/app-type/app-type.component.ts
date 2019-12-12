import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppType } from 'app/shared/model/app-type.model';
import { AppTypeService } from './app-type.service';
import { AppTypeDeleteDialogComponent } from './app-type-delete-dialog.component';

@Component({
  selector: 'jhi-app-type',
  templateUrl: './app-type.component.html'
})
export class AppTypeComponent implements OnInit, OnDestroy {
  appTypes: IAppType[];
  eventSubscriber: Subscription;

  constructor(protected appTypeService: AppTypeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.appTypeService.query().subscribe((res: HttpResponse<IAppType[]>) => {
      this.appTypes = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInAppTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAppType) {
    return item.id;
  }

  registerChangeInAppTypes() {
    this.eventSubscriber = this.eventManager.subscribe('appTypeListModification', () => this.loadAll());
  }

  delete(appType: IAppType) {
    const modalRef = this.modalService.open(AppTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.appType = appType;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IApp } from 'app/shared/model/app.model';
import { AppService } from './app.service';
import { AppDeleteDialogComponent } from './app-delete-dialog.component';

@Component({
  selector: 'jhi-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  apps: IApp[];
  eventSubscriber: Subscription;

  constructor(protected appService: AppService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.appService.query().subscribe((res: HttpResponse<IApp[]>) => {
      this.apps = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInApps();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IApp) {
    return item.id;
  }

  registerChangeInApps() {
    this.eventSubscriber = this.eventManager.subscribe('appListModification', () => this.loadAll());
  }

  delete(app: IApp) {
    const modalRef = this.modalService.open(AppDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.app = app;
  }
}

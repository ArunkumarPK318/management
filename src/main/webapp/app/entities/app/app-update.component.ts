import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IApp, App } from 'app/shared/model/app.model';
import { AppService } from './app.service';
import { IAppType } from 'app/shared/model/app-type.model';
import { AppTypeService } from 'app/entities/app-type/app-type.service';

@Component({
  selector: 'jhi-app-update',
  templateUrl: './app-update.component.html'
})
export class AppUpdateComponent implements OnInit {
  isSaving: boolean;

  apptypes: IAppType[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    version: [],
    date: [],
    urlPath: [],
    appType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected appService: AppService,
    protected appTypeService: AppTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ app }) => {
      this.updateForm(app);
    });
    this.appTypeService
      .query()
      .subscribe((res: HttpResponse<IAppType[]>) => (this.apptypes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(app: IApp) {
    this.editForm.patchValue({
      id: app.id,
      name: app.name,
      version: app.version,
      date: app.date != null ? app.date.format(DATE_TIME_FORMAT) : null,
      urlPath: app.urlPath,
      appType: app.appType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const app = this.createFromForm();
    if (app.id !== undefined) {
      this.subscribeToSaveResponse(this.appService.update(app));
    } else {
      this.subscribeToSaveResponse(this.appService.create(app));
    }
  }

  private createFromForm(): IApp {
    return {
      ...new App(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      version: this.editForm.get(['version']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      urlPath: this.editForm.get(['urlPath']).value,
      appType: this.editForm.get(['appType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApp>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackAppTypeById(index: number, item: IAppType) {
    return item.id;
  }
}

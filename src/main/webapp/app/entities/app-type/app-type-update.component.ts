import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAppType, AppType } from 'app/shared/model/app-type.model';
import { AppTypeService } from './app-type.service';

@Component({
  selector: 'jhi-app-type-update',
  templateUrl: './app-type-update.component.html'
})
export class AppTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    name: [null, [Validators.required]]
  });

  constructor(protected appTypeService: AppTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appType }) => {
      this.updateForm(appType);
    });
  }

  updateForm(appType: IAppType) {
    this.editForm.patchValue({
      id: appType.id,
      type: appType.type,
      name: appType.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appType = this.createFromForm();
    if (appType.id !== undefined) {
      this.subscribeToSaveResponse(this.appTypeService.update(appType));
    } else {
      this.subscribeToSaveResponse(this.appTypeService.create(appType));
    }
  }

  private createFromForm(): IAppType {
    return {
      ...new AppType(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppType>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

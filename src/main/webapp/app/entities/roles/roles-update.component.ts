import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IRoles, Roles } from 'app/shared/model/roles.model';
import { RolesService } from './roles.service';
import { IAppType } from 'app/shared/model/app-type.model';
import { AppTypeService } from 'app/entities/app-type/app-type.service';
import { IApp } from 'app/shared/model/app.model';
import { AppService } from 'app/entities/app/app.service';
import { IAppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from 'app/entities/app-user/app-user.service';

@Component({
  selector: 'jhi-roles-update',
  templateUrl: './roles-update.component.html'
})
export class RolesUpdateComponent implements OnInit {
  isSaving: boolean;

  apptypes: IAppType[];

  apps: IApp[];

  appusers: IAppUser[];

  editForm = this.fb.group({
    id: [],
    roleType: [null, [Validators.required]],
    role: [],
    code: [],
    roles: [],
    app: [],
    appuser: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rolesService: RolesService,
    protected appTypeService: AppTypeService,
    protected appService: AppService,
    protected appUserService: AppUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ roles }) => {
      this.updateForm(roles);
    });
    this.appTypeService
      .query()
      .subscribe((res: HttpResponse<IAppType[]>) => (this.apptypes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.appService
      .query()
      .subscribe((res: HttpResponse<IApp[]>) => (this.apps = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.appUserService
      .query()
      .subscribe((res: HttpResponse<IAppUser[]>) => (this.appusers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(roles: IRoles) {
    this.editForm.patchValue({
      id: roles.id,
      roleType: roles.roleType,
      role: roles.role,
      code: roles.code,
      roles: roles.roles,
      app: roles.app,
      appuser: roles.appuser
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const roles = this.createFromForm();
    if (roles.id !== undefined) {
      this.subscribeToSaveResponse(this.rolesService.update(roles));
    } else {
      this.subscribeToSaveResponse(this.rolesService.create(roles));
    }
  }

  private createFromForm(): IRoles {
    return {
      ...new Roles(),
      id: this.editForm.get(['id']).value,
      roleType: this.editForm.get(['roleType']).value,
      role: this.editForm.get(['role']).value,
      code: this.editForm.get(['code']).value,
      roles: this.editForm.get(['roles']).value,
      app: this.editForm.get(['app']).value,
      appuser: this.editForm.get(['appuser']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoles>>) {
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

  trackAppById(index: number, item: IApp) {
    return item.id;
  }

  trackAppUserById(index: number, item: IAppUser) {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IAppUser, AppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from './app-user.service';
import { IApp } from 'app/shared/model/app.model';
import { AppService } from 'app/entities/app/app.service';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from 'app/entities/organization/organization.service';

@Component({
  selector: 'jhi-app-user-update',
  templateUrl: './app-user-update.component.html'
})
export class AppUserUpdateComponent implements OnInit {
  isSaving: boolean;

  apps: IApp[];

  organizations: IOrganization[];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    address: [],
    email: [null, [Validators.required]],
    contact: [],
    app: [],
    organization: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected appUserService: AppUserService,
    protected appService: AppService,
    protected organizationService: OrganizationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appUser }) => {
      this.updateForm(appUser);
    });
    this.appService
      .query()
      .subscribe((res: HttpResponse<IApp[]>) => (this.apps = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.organizationService
      .query()
      .subscribe(
        (res: HttpResponse<IOrganization[]>) => (this.organizations = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(appUser: IAppUser) {
    this.editForm.patchValue({
      id: appUser.id,
      firstName: appUser.firstName,
      lastName: appUser.lastName,
      address: appUser.address,
      email: appUser.email,
      contact: appUser.contact,
      app: appUser.app,
      organization: appUser.organization
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appUser = this.createFromForm();
    if (appUser.id !== undefined) {
      this.subscribeToSaveResponse(this.appUserService.update(appUser));
    } else {
      this.subscribeToSaveResponse(this.appUserService.create(appUser));
    }
  }

  private createFromForm(): IAppUser {
    return {
      ...new AppUser(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      address: this.editForm.get(['address']).value,
      email: this.editForm.get(['email']).value,
      contact: this.editForm.get(['contact']).value,
      app: this.editForm.get(['app']).value,
      organization: this.editForm.get(['organization']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppUser>>) {
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

  trackAppById(index: number, item: IApp) {
    return item.id;
  }

  trackOrganizationById(index: number, item: IOrganization) {
    return item.id;
  }
}

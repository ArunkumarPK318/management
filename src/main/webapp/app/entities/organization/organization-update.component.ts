import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IOrganization, Organization } from 'app/shared/model/organization.model';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'jhi-organization-update',
  templateUrl: './organization-update.component.html'
})
export class OrganizationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    orgName: [],
    orgType: [],
    orgAddress: [],
    orgEmail: [],
    date: []
  });

  constructor(protected organizationService: OrganizationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ organization }) => {
      this.updateForm(organization);
    });
  }

  updateForm(organization: IOrganization) {
    this.editForm.patchValue({
      id: organization.id,
      orgName: organization.orgName,
      orgType: organization.orgType,
      orgAddress: organization.orgAddress,
      orgEmail: organization.orgEmail,
      date: organization.date != null ? organization.date.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const organization = this.createFromForm();
    if (organization.id !== undefined) {
      this.subscribeToSaveResponse(this.organizationService.update(organization));
    } else {
      this.subscribeToSaveResponse(this.organizationService.create(organization));
    }
  }

  private createFromForm(): IOrganization {
    return {
      ...new Organization(),
      id: this.editForm.get(['id']).value,
      orgName: this.editForm.get(['orgName']).value,
      orgType: this.editForm.get(['orgType']).value,
      orgAddress: this.editForm.get(['orgAddress']).value,
      orgEmail: this.editForm.get(['orgEmail']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganization>>) {
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

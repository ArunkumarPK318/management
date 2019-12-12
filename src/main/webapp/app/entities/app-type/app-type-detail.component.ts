import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppType } from 'app/shared/model/app-type.model';

@Component({
  selector: 'jhi-app-type-detail',
  templateUrl: './app-type-detail.component.html'
})
export class AppTypeDetailComponent implements OnInit {
  appType: IAppType;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appType }) => {
      this.appType = appType;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { IAppType } from 'app/shared/model/app-type.model';
import { IApp } from 'app/shared/model/app.model';
import { IAppUser } from 'app/shared/model/app-user.model';

export interface IRoles {
  id?: number;
  roleType?: string;
  role?: string;
  code?: string;
  apptype?: IAppType;
  app?: IApp;
  appuser?: IAppUser;
}

export class Roles implements IRoles {
  constructor(
    public id?: number,
    public roleType?: string,
    public role?: string,
    public code?: string,
    public apptype?: IAppType,
    public app?: IApp,
    public appuser?: IAppUser
  ) {}
}

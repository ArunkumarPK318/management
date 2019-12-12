import { IRoles } from 'app/shared/model/roles.model';
import { IApp } from 'app/shared/model/app.model';
import { IOrganization } from 'app/shared/model/organization.model';

export interface IAppUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  contact?: string;
  roles?: IRoles[];
  app?: IApp;
  organization?: IOrganization;
}

export class AppUser implements IAppUser {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public address?: string,
    public email?: string,
    public contact?: string,
    public roles?: IRoles[],
    public app?: IApp,
    public organization?: IOrganization
  ) {}
}

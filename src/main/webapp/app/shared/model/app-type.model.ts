import { IApp } from 'app/shared/model/app.model';
import { IRoles } from 'app/shared/model/roles.model';

export interface IAppType {
  id?: number;
  type?: string;
  name?: string;
  apps?: IApp[];
  roles?: IRoles[];
}

export class AppType implements IAppType {
  constructor(public id?: number, public type?: string, public name?: string, public apps?: IApp[], public roles?: IRoles[]) {}
}

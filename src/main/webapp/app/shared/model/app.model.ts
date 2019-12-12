import { Moment } from 'moment';
import { IAppUser } from 'app/shared/model/app-user.model';
import { IRoles } from 'app/shared/model/roles.model';
import { IAppType } from 'app/shared/model/app-type.model';

export interface IApp {
  id?: number;
  name?: string;
  version?: string;
  date?: Moment;
  urlPath?: string;
  appusers?: IAppUser[];
  roles?: IRoles[];
  appType?: IAppType;
}

export class App implements IApp {
  constructor(
    public id?: number,
    public name?: string,
    public version?: string,
    public date?: Moment,
    public urlPath?: string,
    public appusers?: IAppUser[],
    public roles?: IRoles[],
    public appType?: IAppType
  ) {}
}

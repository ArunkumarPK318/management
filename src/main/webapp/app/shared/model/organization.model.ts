import { Moment } from 'moment';
import { IAppUser } from 'app/shared/model/app-user.model';

export interface IOrganization {
  id?: number;
  orgName?: string;
  orgType?: string;
  orgAddress?: string;
  orgEmail?: string;
  date?: Moment;
  appusers?: IAppUser[];
}

export class Organization implements IOrganization {
  constructor(
    public id?: number,
    public orgName?: string,
    public orgType?: string,
    public orgAddress?: string,
    public orgEmail?: string,
    public date?: Moment,
    public appusers?: IAppUser[]
  ) {}
}

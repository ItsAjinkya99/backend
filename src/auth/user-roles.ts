import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  Admin = 'Admin',
  Customer = 'Customer',
  Vendor = 'Vendor',
}

export const roles: RolesBuilder = new RolesBuilder();
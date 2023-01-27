import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  Admin = 'Admin',
  Customer = 'Customer',
  Vendor = 'Vendor',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  /*   .grant(UserRoles.Customer)
    .readAny(['fruits','vegtables'])
    .createOwn(['orders'])
    .grant(UserRoles.Admin)
    .extend(UserRoles.Customer)
    .updateAny(['fruits','vegtables'])
    .createAny(['fruits','vegtables'])
    .deleteAny(['fruits','vegtables']) */
  .grant(UserRoles.Customer).readAny(['fruits'])

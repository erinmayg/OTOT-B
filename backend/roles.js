import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

export const roles = (function () {
  ac.grant('basic').readOwn('profile');
  ac.grant('admin').extend('basic').readAny('profile');
  return ac;
})();

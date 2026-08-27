export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  BRANCH_MANAGER: 'Branch Manager',
  COLLECTION_AGENT: 'Collection Agent',
  CUSTOMER: 'Customer',
};

export const MODULES = {
  CUSTOMERS: 'customers',
  DEPOSITS: 'deposits',
  RD: 'rd',
  LOANS: 'loans',
  RECONCILIATION: 'reconciliation',
};

export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: {
    [MODULES.CUSTOMERS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.DEPOSITS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.RD]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.LOANS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.RECONCILIATION]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
  },
  [ROLES.BRANCH_MANAGER]: {
    [MODULES.CUSTOMERS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.DEPOSITS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.RD]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.LOANS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.RECONCILIATION]: [ACTIONS.READ, ACTIONS.UPDATE],
  },
};

export const hasPermission = (userRole, module, action) => {
  if (!userRole || !module || !action) return false;
  const permissions = ROLE_PERMISSIONS[userRole];
  if (!permissions || !permissions[module]) return false;
  return permissions[module].includes(action);
};
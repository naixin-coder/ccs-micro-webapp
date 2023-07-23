import type { Key } from 'react';

export interface SysOrgType {
  title: string;
  key: Key;
  orgId: number;
  orgCode: string;
  orgName: string;
  orgDesc: string;
  parentOrgId: number;
  leaf: boolean;
  isLeaf: boolean;
  sortId: number;
  state: number;
  children: SysOrgType[];
}

export type SysOrgTypePartial = Partial<SysOrgType>;

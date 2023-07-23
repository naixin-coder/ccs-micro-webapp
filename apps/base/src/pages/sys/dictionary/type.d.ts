export interface DictionaryItemType {
  createTime: string;
  propCode: string;
  propControl: string;
  propDesc: string;
  propId: number;
  propName: string;
  state: number;
}

export interface DicValueItemType {
  createTime: string;
  propId: number;
  sortId: number;
  state: number;
  valueCode: string;
  valueControl: string;
  valueDesc: string;
  valueId: number;
  valueName: string;
}

export interface SysPropValueType {
  valueId: number;
  valueCode: string;
  valueName: string;
  valueDesc: string;
  propId: number;
  state: number;
  sortId: number;
  valueControl: string;
  propCode: string;
}

export interface SysPropType {
  propId: number;
  propCode: string;
  propName: string;
  state: number;
  propDesc: string;
  propControl: string;
}
export type SysPropTypePartial = Partial<SysPropType>;

export type SysPropValueTypePartial = Partial<SysPropValueType>;

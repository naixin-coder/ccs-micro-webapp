export interface AppAuthMenuType {
  leaf: any;
  code: string;
  btnId: number | string;
  createTime: string;
  describe: string;
  id: number;
  name: string;
  parentId: number;
  sort: number;
  state: number;
  type: number;
  key: string;
  title: string;
  children: AppAuthMenuType[];
}

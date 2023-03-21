export type Information = {
  id: number;
  name: string;
  categoryId: number;
  volumn: number;
  productor: string;
  detail?: string;
  fileId: number;
  isExpired: boolean;
}

export type Category = {
  id: number;
  name: string;
}

export type Review = {
  id: number;
  alcoholId: number;
  title: string;
  grade: number;
  content?: string;
  userName: string;
  reviewPassword: string;
  fileId: number;
  createdDate: string;
  modifiedDate?: string;
}

export type File = {
  id: number;
  path: string;
  name: string;
  extension: string;
}

export type Grade = {
  id: number;
  averageGrade: number;
  updatedDate: string;
}

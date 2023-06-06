export type Alcohol = {
  alcNo: number;
  alcNm: string;
  cateNm: string;
  cateNo: number;
  avgGrade: number;
  detail?: string;
  expYn: boolean;
  fileExt?: string;
  fileNm?: string;
  productor?: string;
  vol?: number;
};

export type Category = {
  cateNo: number;
  cateNm: string;
};

export type Review = {
  alcNo: number;
  alcNm: string;
  userNm: string;
  cateNm: string;
  reviewNo: number;
  title: string;
  grade: number;
  content?: string;
  fileNo?: string;
  fileNm?: string;
  fileExt?: string;
  userType?: string;
  modifiedDate: string;
};

export type File = {
  id: number;
  path: string;
  name: string;
  extension: string;
};

export type Grade = {
  id: number;
  averageGrade: number;
  updatedDate: string;
};

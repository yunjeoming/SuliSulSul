type CommonType = {
  alcNo: number;
  alcNm: string;
  fileNm?: string;
};

export type Alcohol = CommonType & {
  cateNm: string;
  cateNo: number;
  avgGrade: number;
  detail?: string;
  expYn: boolean;
  fileExt?: string;
  productor?: string;
  vol?: number;
};

export type Category = {
  cateNo: number;
  cateNm: string;
};

export type Review = CommonType & {
  userNm: string;
  cateNm: string;
  reviewNo: number;
  title: string;
  grade: number;
  regDt: string; 
  content?: string;
  fileNo?: string;
  fileExt?: string;
  userType?: string;
  modyDt?: string;
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

export type AllType = {
  alcData: Alcohol,
  reviewData: Review[]
}

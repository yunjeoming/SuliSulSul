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
  grade1: number;
  grade2: number;
  grade3: number;
  grade4: number;
  grade5: number;
  grade15: number;
  grade25: number;
  grade35: number;
  grade45: number;
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
  alcData: Alcohol;
  reviewData: Review[];
};

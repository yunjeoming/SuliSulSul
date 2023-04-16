export type MockAlcoholsType = {
  no: number;
  name: string;
  categoryName: string;
  image?: string;
  grade?: number;
  description?: string;
};

export type MockReviewType = {
  no: number;
  title: string;
  grade: number;
  userName: string;
  createdDate: string;
  content?: string;
}
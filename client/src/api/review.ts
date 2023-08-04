import requestAxios from './axios';

const ReviewAPI = {
  getReviewsByNo: (no: string, pageNo?: number) => {
    const data = new FormData();
    data.append('alcNo', no);
    data.append('pageNo', (pageNo ?? 0).toString());
    return requestAxios({ method: 'post', url: `/selectReviewList`, data });
  },
  addReview: (data: FormData) => {
    return requestAxios({ method: 'post', url: `/insertAlcReview`, data });
  },
  updateReview: (data: FormData) => {
    return requestAxios({ method: 'post', url: `/updateAlcReview`, data });
  },
  deleteReview: (data: FormData) => {
    return requestAxios({
      method: 'post',
      url: `/deleteAlcReview`,
      data,
    });
  },
  checkPassword: (data: FormData) => {
    return requestAxios({ method: 'post', url: `/checkPassword`, data });
  },
};

export default ReviewAPI;

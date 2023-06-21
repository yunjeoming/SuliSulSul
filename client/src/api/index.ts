import axios, { AxiosRequestConfig } from 'axios';

const requestAxios = async (config: AxiosRequestConfig) => {
  try {
    const response = await axios(config);
    if (!response.status.toString().startsWith('2')) {
      throw Error('status num is not 200+');
    }

    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const API = {
  getAlcohols: () => {
    return requestAxios({ method: 'get', url: `/selectAlcList` });
  },
  getAlcoholByNo: (no: string) => {
    const data = new FormData();
    data.append('alcNo', no);
    return requestAxios({ method: 'post', url: `/selectAlcDetail`, data });
  },
  getAlcoholByCategory: ({ cateNo, cateNm }: { cateNo: string; cateNm: string }) => {
    const data = new FormData();
    data.append('cateNo', cateNo);
    if (cateNm === 'all') {
      data.delete('cateNo');
    }
    return requestAxios({ method: 'post', url: `/selectAlcList`, data });
  },
  getAlcoholsBySearchWord: (searchWord: string) => {
    const data = new FormData();
    data.append('alcNm', searchWord);
    data.append('expYn', 'false');
    data.append('cateNo', '0');
    return requestAxios({ method: 'post', url: `/selectAlcList`, data });
  },
  addAlcohol: (data: FormData) => {
    return requestAxios({ method: 'post', url: `/insertAlcInfo`, data });
  },
  updateAlcohol: (data: FormData) => {
    return requestAxios({ method: 'post', url: `/updateAlcInfo`, data });
  },
  getCategories: () => {
    return requestAxios({ method: 'get', url: `/selectCateList` });
  },
  getReviewsByNo: (no: string) => {
    const data = new FormData();
    data.append('alcNo', no);
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
};

export default API;

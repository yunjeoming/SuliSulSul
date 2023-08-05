import { Category } from '../types/alcohol';
import requestAxios from './axios';

const AlcoholAPI = {
  getAlcohols: (pageNo?: number) => {
    return requestAxios({ method: 'get', url: `/selectAlcList?pageNo=${pageNo ?? 0}` });
  },
  getAlcoholByNo: (no: string, pageNo?: number) => {
    const data = new FormData();
    data.append('alcNo', no);
    data.append('pageNo', (pageNo || 0).toString());
    return requestAxios({ method: 'post', url: `/selectAlcDetail`, data });
  },
  getAlcoholByCategory: (category: Category | undefined, pageNo?: number) => {
    if (!category) return [];

    const { cateNo, cateNm } = category;
    const data = new FormData();
    data.append('cateNo', cateNo.toString());
    data.append('pageNo', (pageNo || 0).toString());
    if (cateNm === 'all') {
      data.delete('cateNo');
    }
    return requestAxios({ method: 'post', url: `/selectAlcList`, data });
  },
  getAlcoholsBySearchWord: (searchWord: string, pageNo?: number) => {
    const data = new FormData();
    data.append('alcNm', searchWord);
    data.append('expYn', 'false');
    data.append('cateNo', '0');
    data.append('pageNo', (pageNo || 0).toString());
    return requestAxios({ method: 'post', url: `/selectAlcList`, data });
  },
  getAlcoholsWithManyReviews: () => {
    return requestAxios({ method: 'get', url: `/selectMainAlcList?flag=R` });
  },
  getAlcoholsWithHighGrade: () => {
    return requestAxios({ method: 'get', url: `/selectMainAlcList?flag=G` });
  },
  addAlcohol: (data: FormData) => {
    return requestAxios({ method: 'post', url: `/insertAlcInfo`, data });
  },
  updateAlcohol: (data: FormData) => {
    return requestAxios({ method: 'post', url: `/updateAlcInfo`, data });
  },
};

export default AlcoholAPI;

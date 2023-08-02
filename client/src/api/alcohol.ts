import { Category } from '../types/alcohol';
import requestAxios from './axios';

const AlcoholAPI = {
  getAlcohols: () => {
    return requestAxios({ method: 'get', url: `/selectAlcList` });
  },
  getAlcoholByNo: (no: string) => {
    const data = new FormData();
    data.append('alcNo', no);
    return requestAxios({ method: 'post', url: `/selectAlcDetail`, data });
  },
  getAlcoholByCategory: (category: Category | undefined) => {
    if (!category) return [];
    
    const { cateNo, cateNm } = category;
    const data = new FormData();
    data.append('cateNo', cateNo.toString());
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
};

export default AlcoholAPI;

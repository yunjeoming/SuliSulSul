import requestAxios from './axios';

const CategoryAPI = {
  getCategories: () => {
    return requestAxios({ method: 'get', url: `/selectCateList` });
  },
};

export default CategoryAPI;

import axios, { AxiosRequestConfig } from 'axios';

const requestAxios = async (config: AxiosRequestConfig) => {
  try {
    const response = await axios(config);
    if (!response.status.toString().startsWith('2')) {
      throw Error('status num is not 200+');
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default requestAxios;

import http from '../helpers/http';
import { searchData } from '../helpers/mockData';

export default class Nasa {
  /**
   * @function searchNasa
   * @description To search Nasa
   * @return Promise { data } : data - list of nasa
   */
  static searchNasa() {
    return searchData;
  }
}

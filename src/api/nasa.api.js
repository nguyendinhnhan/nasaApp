import http from '../helpers/http';

export default class Nasa {
  /**
   * @function searchNasa
   * @description To search Nasa
   * @return Promise { data } : data - list of nasa
   */
  static searchNasa() {
    return http.get(`/posts/1`);
  }
}

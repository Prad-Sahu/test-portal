import axios from "axios";

/**
 * @class Service
 * @description It sets up the entire axios services and Auth token
 * @param {*}
 * @return {*}
 */
class Service {
  constructor() {
    this.get = (apiName, header = {}, cancelToken, config = {}) => {
      return axios.get("https://dummyjson.com/" + apiName, {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
        cancelToken,
        ...config,
      });
    };

    this.post = (apiName, postData, header = {}, cancelToken, config = {}) => {
      return axios.post(
        "https://dummyjson.com/" + apiName,
        { ...postData },
        {
          headers: {
            "Content-Type": "application/json",
            ...header,
          },
          cancelToken,
          ...config,
        }
      );
    };

    this.put = (apiName, postData, header = {}, config = {}) => {
      return axios.put("https://dummyjson.com/" + apiName, postData, {
        headers: {
          "Content-Type": "application/json",

          ...header,
        },
        ...config,
      });
    };

    this.delete = (apiName, header = {}, config = {}) => {
      return axios.delete("https://dummyjson.com/" + apiName, {
        headers: {
          "Content-Type": "application/json",

          ...header,
        },
        ...config,
      });
    };
  }
}
// eslint-disable-next-line
export default new Service();

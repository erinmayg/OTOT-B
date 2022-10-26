import { URL_CHARACTERS, URL_MODULES } from '../configs';
import axios, { AxiosResponse } from 'axios';
import { CharacterModel } from '../models/Character';
import Module from '../models/Module';

declare namespace API {
  type Response<T> = {
    status: number;
    data: T;
  };
}

const instance = (baseUrl: string) =>
  axios.create({
    baseURL: baseUrl,
    timeout: 15000,
  });

const responseBody = (response: AxiosResponse) => {
  const res: API.Response<typeof response.data> = {
    status: response.status,
    data: response.data,
  };

  return res;
};

const requests = {
  get: (baseUrl: string, url: string) =>
    instance(baseUrl)
      .get(url)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
  post: (baseUrl: string, body: {}) =>
    instance(baseUrl)
      .post('/', body)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
  put: (baseUrl: string, url: string, body: {}) =>
    instance(baseUrl)
      .put(url, body)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
  delete: (baseUrl: string, url: string) =>
    instance(baseUrl)
      .delete(url)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
  getWithParams: (baseUrl: string, url: string, params: Object) =>
    instance(baseUrl)
      .get(url, params)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
};

export const APIReq = {
  search: (
    name: string
  ): Promise<API.Response<{ message: string; data: CharacterModel }>> =>
    requests.get(URL_CHARACTERS, `/${name}`),
  create: (
    character: CharacterModel
  ): Promise<API.Response<{ message: string; data?: CharacterModel }>> =>
    requests.post(URL_CHARACTERS, character),
  delete: (name: string): Promise<API.Response<{ message: string }>> =>
    requests.delete(URL_CHARACTERS, `/${name}`),
  edit: (
    name: string,
    updatedCharacter: CharacterModel
  ): Promise<API.Response<{ message: string; data: CharacterModel }>> =>
    requests.put(URL_CHARACTERS, `/${name}`, updatedCharacter),
  getModules: (
    params?: Object
  ): Promise<
    API.Response<{
      faculties: string[];
      departments: string[];
      pages: number;
      modules: Module[];
    }>
  > => {
    return requests.getWithParams(URL_MODULES, '', { params: params });
  },
};

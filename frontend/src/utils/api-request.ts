import { URL_CHARACTERS } from '../configs';
import axios, { AxiosResponse } from 'axios';
import { CharacterModel } from '../Character';

declare namespace API {
  type Response<T> = {
    status: number;
    data: T;
  };
}

const instance = axios.create({
  baseURL: URL_CHARACTERS,
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
  get: (url: string) =>
    instance
      .get(url)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
  post: (body: {}) =>
    instance
      .post('/', body)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
  put: (url: string, body: {}) =>
    instance
      .put(url, body)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
  delete: (url: string) =>
    instance
      .delete(url)
      .then(responseBody)
      .catch((err) => responseBody(err.response)),
};

export const APIReq = {
  search: (
    name: string
  ): Promise<API.Response<{ message: string; data: CharacterModel }>> =>
    requests.get(`/${name}`),
  create: (
    character: CharacterModel
  ): Promise<API.Response<{ message: string }>> => requests.post(character),
  delete: (name: string): Promise<API.Response<{ message: string }>> =>
    requests.delete(`/${name}`),
  edit: (
    name: string,
    updatedCharacter: CharacterModel
  ): Promise<API.Response<{ message: string; data: CharacterModel }>> =>
    requests.put(`/${name}`, updatedCharacter),
};

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const request = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Auth = {
  current: () => request.get('/user'),
  login: (email, password) =>
    request.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    request.post('/users', { user: { username, email, password } }),
  save: user => request.put('/user', { user })
};

const Tags = {
  getAll: () => request.get(`/tags`)
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });
const Articles = {
  all: page => request.get(`/articles?${limit(10, page)}`),
  byTag: (tag, page) =>
    request.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  byAuthor: (author, page) =>
    request.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  feed: () => request.get(`/articles/feed?limit=10&offset=0`),
  favorite: slug => request.post(`/articles/${slug}/favorite`),
  unfavorite: slug => request.del(`/articles/${slug}/favorite`),
  get: slug => request.get(`/articles/${slug}`),
  update: article =>
    request.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article => request.post('/articles', { article })
};

const Profile = {
  follow: username => request.get(`/profiles/${username}/follow`),
  unfollow: username => request.get(`/profiles/${username}/unfollow`),
  get: username => request.get(`/profiles/${username}`)
};

export default {
  Auth,
  Tags,
  Articles,
  Profile,
  setToken: _token => {
    token = _token;
  }
};

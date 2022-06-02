const host = import.meta.env.VITE_BASE_API_URL;

const baseApiUrl = `${host}/`;

const subApiUrl = {
  // Base
  auth: "auth",
  api: "api",
  // Sub Sub URL
  pakan: "pakan",
  kawin: "kawin",
  kandang: "kandang",
  kesehatan: "kesehatan",
  ternak: "ternak",
  costumer: "costumer",
  total: "total",
};

export { host, baseApiUrl, subApiUrl };

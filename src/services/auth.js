import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { auth, api } = subApiUrl;

const login = (req) => baseApi.post(`${api}/${auth}/login`, req);
const logout = () => baseApi.post(`${api}/${auth}/logout`);
const forgotPassword = (req) =>
  baseApi.post(`${api}/${auth}/forgot-password`, req);

export { login, logout, forgotPassword };

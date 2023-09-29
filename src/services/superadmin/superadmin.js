import { baseApi } from "@/services/api";

const getDataUsers = () => baseApi.get('api/superadmin/users');
const getPeternakan = () => baseApi.get('api/superadmin/peternakan');
const getNewToken = (request) => baseApi.post('api/superadmin/generate-token', request);
const setPremiumFarm = (request) => baseApi.post('api/superadmin/set-premium-farm', request);
const setFreeFarm = (request) => baseApi.post('api/superadmin/set-free-farm', request);
const editPeternakan = (request) => baseApi.put('api/superadmin/update-peternakan', request)
const editAdmin = (request) => baseApi.put('api/superadmin/update-account', request)
const delAdmin = (request) => baseApi.delete(`api/superadmin/delete-account-params?id_user=${request.id_user}`);
const register = (req) => baseApi.post(`api/superadmin/register`, req);
const registerWithoutActivate = (req) => baseApi.post(`api/superadmin/register-active`, req);

export { getDataUsers, getPeternakan, getNewToken, setPremiumFarm, setFreeFarm, editPeternakan, editAdmin, delAdmin, register, registerWithoutActivate };

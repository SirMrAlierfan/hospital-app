import api from "@/api/axiosInstance";
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';


export const authApiHandler = async ({ method, path, data }: { method: Method, path: string, data: any }) => {
    const response = await api[method]("/auth" + path, data)
    return response
}   

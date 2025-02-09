import router from "@/router";
import axios from "axios";
import httpStatuses from "./httpStatuses";

export const useAuthInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            return error.response.status === httpStatuses.UNAUTHORIZED
                ? axios
                    .post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, {
                        withCredentials: true
                    })
                    .then(() => {
                        return axiosInstance(error.response.config)
                    })
                    .catch(async (error) => {
                        await router.push('/login')
                        return Promise.reject(error)
                    })
                : Promise.reject(error)
        }
    )
}


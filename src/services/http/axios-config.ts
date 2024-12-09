import axios from "axios";
import { useAuth } from "@/hooks/use-auth.hook";
import { authHttpService } from "./auth-http.service";

export const api = axios.create({
  baseURL: 'http://localhost:9001', 
  withCredentials: true,
});

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      
      try {
        await authHttpService.logout()
        
        const auth = useAuth.getState();
        localStorage.removeItem('@chat-app');
        auth.data.user = null;
        
        window.location.replace('/sign-in');
      } catch (error) {
      } finally {
        isLoggingOut = false;
      }
    }
    return Promise.reject(error);
  }
);
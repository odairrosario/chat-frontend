import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authHttpService } from '@/services/http/auth-http.service';
import { toast } from 'react-hot-toast';

interface UserTypes {
  name: string;
  username: string;
}

interface AuthState {
  data: {
    user: UserTypes | null;
  };
  login: (username: string, password: string, router: any) => Promise<void>;
  logout: (router: any) => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      data: { user: null },

      login: async (username: string, password: string, router: any) => {
        try {
          const user = await authHttpService.login({ username, password });
          
          set({ data: { user } });
          toast.success("Login realizado com sucesso!");
          router.push("/chat");
          
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Erro ao fazer login");
        }
      },

      logout: async () => {
        try {
          document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          localStorage.removeItem('@chat-app');
          set({ data: { user: null } });
          window.location.replace('/sign-in');
        } catch (error) {
          toast.error("Erro ao fazer logout");
        }
      },
    }),
    {
      name: '@chat-app',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

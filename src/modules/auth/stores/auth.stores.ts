import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { checkAuthAction, loginActions, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStores = defineStore('auth', () => {

    const authStatus = ref<AuthStatus>(AuthStatus.Checking);
    const user = ref<User | undefined>();
    const token = ref(useLocalStorage('token', ''));

    const login = async (email:string, password: string) => {
        try{
            const loginResp =  await loginActions(email, password);
            if (!loginResp.ok){
                logout();
                return false;
            }
            user.value = loginResp.user;
            token.value = loginResp.token;
            authStatus.value = AuthStatus.Authenticated;
            return true;
        } catch (error) {return logout()}
    };

    const logout = () => {
        localStorage.removeItem('token'); 
        user.value = undefined;
        token.value = '';
        authStatus.value = AuthStatus.Unauthenticated;
        return false;
    };


    const register = async (fullName: string, email: string, password: string) => {
    try {
        const registerResp = await registerAction(fullName, email, password); 
        if (!registerResp.ok) {
            logout();
            return { ok: false, message: registerResp.message }; 
        }
        user.value = registerResp.user;
        token.value = registerResp.token;
        authStatus.value = AuthStatus.Unauthenticated;
        return { ok: true, messaje: '' };

        } catch (error) {
            return { ok: false, message: 'Error al registrarse al usuario' };
        }

    };

    const checkAuthStatus = async (): Promise<boolean> => {
        try {
            const statusResp = await checkAuthAction();
            if (!statusResp.ok) {
                logout();
                return false;
            }
            authStatus.value = AuthStatus.Authenticated;
            user.value = statusResp.user;
            token.value = statusResp.token;
            return true;
           
        } catch (error) {
            logout();
            return false;
        }
    }
  

  return {
    user,
    token,
    authStatus,



    //Getters
     isAdmin:computed(()=> user.value?.roles.includes('admin') ?? false),
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.fullName),
    login,
    register,
    logout,
    checkAuthStatus,
    
  };
});


//function registerAction(fullName: string, email: string, password: string) {
    //throw new Error('Function not implemented.');
//}


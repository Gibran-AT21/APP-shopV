import { tesloApi } from "@/api/TesloApi"
import { type AuthReponse, type User} from "../interfaces"
import { isAxiosError } from "axios";

interface LoginError{
    ok: false;
    message: string;

}

interface LoginSuccess { 
    ok: true;
    user: User;
    token: string;
}


export const loginActions = async(email: string, password: string): Promise<LoginSuccess | LoginError> => {
    try {
        const { data } = await tesloApi.post<AuthReponse>('/auth/login', {
            email, password,
        });

        return{
            ok: true,
            user: data.user,
            token: data.token,
        }

    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
            return {
                ok: false,
                message: 'Usuario o contraseña incorrectos',
            };
        }
        console.log(error);
        throw new Error('No se puede realizar la accion de login');
    }
}
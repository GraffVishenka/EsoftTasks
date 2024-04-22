import { $api } from '../lib/api';
import {AxiosResponse} from 'axios';

export default class AuthService {
    static async signIn(email: string, password: string): Promise<AxiosResponse> {
        return $api.post('auth/sign-in', {email, password})
    }

}
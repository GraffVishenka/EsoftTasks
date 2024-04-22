import {AxiosResponse} from 'axios';
import { $api } from '../lib/api';
import { IUser } from '../lib/types';

export default class UserService {
    static async fetchMyUsers(): Promise<AxiosResponse<IUser[]>> {
        return await $api.get<IUser[]>('/users/all')
    }
}
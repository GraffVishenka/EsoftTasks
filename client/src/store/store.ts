import { makeAutoObservable } from "mobx";
import { ITasks, IUser } from "../lib/types";
import AuthService from "../service/AuthService";
import { $api, API_URL } from "../lib/api";
import TaskService from "../service/TaskService";
import UserService from "../service/UserService";
import { toast } from "sonner";

export default class Store {
  user = {} as IUser;
  users = [] as IUser[];
  tasks = [] as ITasks[];
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: ITasks[]) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async fetchTasks(id: number) {
    this.setLoading(true);
    try {
      const res = await TaskService.fetchMyTasks(id);
      this.setTasks(res.data);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async createTasks(task: object) {
    this.setLoading(true);
    try {
      const res = await TaskService.createTask(task);
      this.setTasks(res.data);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async updateTasks(id: number, task: object) {
    this.setLoading(true);
    try {
      const res = await TaskService.updateTaskById(id, task);
      this.setTasks(res.data);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async fetchMyUsers() {
    this.setLoading(true);
    try {
      const res = await UserService.fetchMyUsers();
      this.setUsers(res.data);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const response = await AuthService.signIn(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      toast.error(e.response?.data?.message, {duration: 2000, position:"top-center"});
    }
  }

  async signOut() {
    try {
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      this.setTasks([] as ITasks[]);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const res = await $api.get(`${API_URL}/auth/check`, {
        withCredentials: true,
      });
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}

import { AxiosResponse } from "axios";
import { $api } from "../lib/api";
import { ITasks } from "../lib/types";

export default class TaskService {
  static async fetchMyTasks(id: number): Promise<AxiosResponse<ITasks[]>> {
    return await $api.get<ITasks[]>(`/tasks/findAll/${id}`);
  }

  static async createTask(task: object): Promise<AxiosResponse<ITasks[]>> {
    return await $api.post("/tasks", task);
  }

  static async fetchTaskById(id: number): Promise<AxiosResponse<ITasks[]>> {
    return await $api.post("/tasks/findOne", { id });
  }

  static async updateTaskById(id: number, task:object): Promise<AxiosResponse<ITasks[]>> {
    return await $api.patch(`/tasks/${id}`, task);
  }
}

import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ITasks, IUser } from "../../lib/types";
import { Input } from "../ui/input";
import { Context } from "../..";
import Loader from "./Loader";
import useInput from "../../hooks/useInput";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { priorityList, statusList } from "../../lib/const";
import { shortName, taskDialogValidation } from "../../lib/utils";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";

type Props = {
  task: ITasks;
  users: IUser[];
};

const TaskDialog: React.FC<Props> = ({ task, users }: Props) => {
  const { store } = useContext(Context);
  const date = new Date(task.deadline)
    .toLocaleDateString()
    .split(".")
    .reverse()
    .join("-");

  const managerDate = new Date(task.deadline).toLocaleDateString();

  const id = task.id;

  const header = useInput(`${task.header}`);
  const [description, setDescripton] = useState(`${task.description}`);
  const [priority, setPriority] = useState(`${task.priority}`);
  const [status, setStatus] = useState(`${task.status}`);
  const [responsible, setResponsible] = useState(`${task.responsible.id}`);
  const deadline = useInput(`${date}`);

  const saveClick = async () => {
    try {
      const newTask = {
        header: header.value,
        description: description,
        priority: priority,
        status: status,
        responsible: responsible,
        deadline: deadline.value,
        creator: store.user.id,
      };
      if (taskDialogValidation(Object.values(newTask))) {
        await store.updateTasks(id, newTask);
      } else {
        toast.error("Заполните все поля!", {duration: 2000, position:"top-center"});
      }
    } catch (error) {}
  };

  if (store.isLoading) {
    return <Loader />;
  }

  return (
    <Dialog>
      <Toaster
        toastOptions={{
          classNames: { toast: "pl-5 h-10", error: "bg-red" },
        }}
      />
      <DialogTrigger className="shad-button_primary p-2 rounded-md">
        Открыть
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <label className="description">Заголовок</label>
          {store.user.role !== "Supervisor" &&
          task.creator.role === "Supervisor" ? (
            <Label>{task.header}</Label>
          ) : (
            <Input type="text" className="shad-input mt-5" {...header} />
          )}
        </DialogHeader>
        <div className="flex flex-col">
          <Label className="description">Описание</Label>
          {store.user.role !== "Supervisor" &&
          task.creator.role === "Supervisor" ? (
            <Label>{task.description}</Label>
          ) : (
            <Textarea
              style={{ backgroundColor: "#1f1f22" }}
              value={description}
              onChange={(e) => setDescripton(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-col">
          <Label className="description">Дата окончания</Label>
          {store.user.role !== "Supervisor" &&
          task.creator.role === "Supervisor" ? (
            <Label>{managerDate}</Label>
          ) : (
            <Input
              type="date"
              style={{ backgroundColor: "#1f1f22" }}
              {...deadline}
            />
          )}
        </div>
        <div className="flex flex-col">
          <Label className="description">Приоритет</Label>
          {store.user.role !== "Supervisor" &&
          task.creator.role === "Supervisor" ? (
            <Label>{task.priority}</Label>
          ) : (
            <select
              defaultValue={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-10 rounded-md pl-2"
              style={{ backgroundColor: "#1f1f22", borderWidth: "1px" }}
            >
              {priorityList.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="flex flex-col">
          <Label className="description">Статус</Label>
          <select
            defaultValue={task.status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 rounded-md pl-2"
            style={{ backgroundColor: "#1f1f22", borderWidth: "1px" }}
          >
            {statusList.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col">
          <Label className="description">Ответственный</Label>
          {store.user.role !== "Supervisor" &&
          task.creator.role === "Supervisor" ? (
            <Label>{shortName(task.responsible.fullName)}</Label>
          ) : (
            <select
              defaultValue={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className="h-10 rounded-md pl-2"
              style={{ backgroundColor: "#1f1f22", borderWidth: "1px" }}
            >
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {shortName(user.fullName)}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="flex justify-between">
          <Button  className="shad-button_primary" onClick={saveClick}>
            Сохранить
          </Button>
          <Button  className="shad-button_primary">Удалить</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;

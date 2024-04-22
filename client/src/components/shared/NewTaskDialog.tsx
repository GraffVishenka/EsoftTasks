import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { IUser } from "../../lib/types";
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
  users: IUser[];
};

const NewTaskDialog: React.FC<Props> = ({ users }: Props) => {
  const { store } = useContext(Context);

  const header = useInput("");
  const [description, setDescripton] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [responsible, setResponsible] = useState("");
  const deadline = useInput("");

  if (store.isLoading) {
    return <Loader />;
  }

  const saveClick = async () => {
    try {
      const task = {
        header: header.value,
        description: description,
        priority: priority,
        status: status,
        responsible: responsible,
        deadline: deadline.value,
        creator: store.user.id,
      };

      console.log(taskDialogValidation(Object.values(task)));

      if (taskDialogValidation(Object.values(task))) {
        await store.createTasks(task);
      } else {
        toast.error("Заполните все поля!", {duration: 2000,position:"top-center"});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <Toaster
        toastOptions={{
          classNames: { toast: "pl-5 h-10", error: "bg-red" },
        }}
      />
      <DialogTrigger className="shad-button_primary p-2 rounded-md">
        Создать задачу
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <label className="description">Заголовок</label>
          <Input type="text" className="shad-input mt-5" {...header} />
        </DialogHeader>
        <div>
          <Label className="description">Описание</Label>
          <Textarea
            style={{ backgroundColor: "#1f1f22" }}
            value={description}
            onChange={(e) => setDescripton(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <Label className="description">Дата окончания</Label>
          <Input
            type="date"
            style={{ backgroundColor: "#1f1f22" }}
            {...deadline}
          />
        </div>
        <div className="flex flex-col">
          <Label className="description">Приоритет</Label>
          <select
            defaultValue={priorityList[0]}
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
        </div>
        <div className="flex flex-col">
          <Label className="description">Статус</Label>
          <select
            defaultValue={statusList[0]}
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
          <select
            onChange={(e) => setResponsible(e.target.value)}
            className="h-10 rounded-md pl-2"
            style={{ backgroundColor: "#1f1f22", borderWidth: "1px" }}
          >
            <option value={""}></option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {shortName(user.fullName)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-center">
          <Button className="shad-button_primary" onClick={saveClick}>
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;

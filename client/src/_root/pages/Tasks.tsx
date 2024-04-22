import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Context } from "../..";
import TaskDialog from "../../components/shared/TaskDialog";
import Loader from "../../components/shared/Loader";
import { observer } from "mobx-react-lite";
import NewTaskDialog from "../../components/shared/NewTaskDialog";
import { shortName } from "../../lib/utils";

const Tasks = () => {
  const { store } = useContext(Context);
  const [selectUser, setSelectUser] = useState("");

  useEffect(() => {
    if (store.user.role === "Supervisor") {
      store.fetchMyUsers();
    } else {
      store.setUsers([store.user]);
    }
    if (selectUser === "") {
      store.fetchTasks(store.user.id);
    } else {
      store.fetchTasks(Number(selectUser[0]));
    }
  }, [store, selectUser]);

  if (store.isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {store.user.role === "Supervisor" ? (
        <div className="flex justify-between flex-row mb-10">
          <select
            defaultValue={selectUser}
            onChange={(e) => setSelectUser(e.target.value)}
            className="rounded-md"
            style={{ backgroundColor: "#1f1f22", borderWidth: "1px" }}
          >
            <option value={""}></option>
            {store.users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {shortName(user.fullName)}
                </option>
              );
            })}
          </select>
          <div>
            <NewTaskDialog users={store.users} />
          </div>
        </div>
      ) : (
        <div className="float-right mb-10">
          <NewTaskDialog users={store.users} />
        </div>
      )}
      <Table className="realative">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Заголовок</TableHead>
            <TableHead>Приоритет</TableHead>
            <TableHead>Дата окончания</TableHead>
            <TableHead>Ответственный</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.tasks.length ? (
            store.tasks
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.updatedAt).getTime() -
                  new Date(b.updatedAt).getTime()
              )
              .map((task) => {
                const deadline = new Date(task.deadline).toLocaleDateString();
                const now = new Date();
                const dd = new Date(task.deadline).getTime() < now.getTime();
                return (
                  <TableRow
                    key={task.id}
                    className={
                      task.status === "Выполнена"
                        ? "greenRow"
                        : dd && task.status !== "Выполнена"
                        ? "redRow"
                        : ""
                    }
                  >
                    <TableCell>{task.header}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{deadline}</TableCell>
                    <TableCell>{task.responsible.fullName}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>
                      <TaskDialog task={task} users={store.users} />
                    </TableCell>
                  </TableRow>
                );
              })
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default observer(Tasks);

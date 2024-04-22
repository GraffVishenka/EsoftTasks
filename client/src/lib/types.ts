export interface IUser {
  id:number
  fullName: string;
  email: string;
  password: string;
  role:string;
}

export interface ITasks {
  id:number
  header: string;
  description: string;
  deadline: string;
  priority: string;
  status: string;
  creator: any;
  responsible: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface IToken{
  accessToken: string;
}

export interface ITaskDialog{
  task: ITasks;
}
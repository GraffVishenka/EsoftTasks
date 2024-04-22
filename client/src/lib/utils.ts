import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortName = (fullName:string) =>{
  let full = fullName;
  const a = full.split(" ");
  let shortName = a[0] + " ";
  for (let i = 1; i < a.length; i++) {
    let name = a[i].charAt(0) + ". ";
    shortName += name;
  }
  return shortName
}

export const taskDialogValidation = (task:Array<string | number>) =>{
  let count = 0
  for(let i =0; i< task.length; i++){
    if(task[i] === ""){
      count++
    }
  }
  if(count > 0){
    return false
  }
  return true
}
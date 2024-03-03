import { Todo } from "@/components/Todo"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseStringifiedTodos(item:string): Todo[] {
    const storedTodos: Todo[] = JSON.parse(item)
    return storedTodos
}
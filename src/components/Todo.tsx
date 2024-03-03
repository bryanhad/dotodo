import { cn, parseStringifiedTodos } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"
import { EditTodo } from "./EditTodo"
import { toast } from "sonner"

export type Todo = {
    id: number
    title: string
    done: boolean
}

type TodoComponent = {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const Todo = ({ setTodos, ...todo }: Todo & TodoComponent) => {
    const [done, setDone] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    function deleteTodo(id: number) {
        const item = localStorage.getItem("todos")
        if (!item) return

        const storedTodos = parseStringifiedTodos(item)
        const filteredTodos = storedTodos.filter((todo) => todo.id !== id)
        localStorage.setItem("todos", JSON.stringify(filteredTodos))
        setTodos(filteredTodos)
        toast(`Successfuly deleted todo`)
    }

    return (
        <>
            {isEditing ? (
                <EditTodo
                    todo={todo}
                    onSubmit={(updatedTodos) => {
                        setTodos(updatedTodos)
                        setIsEditing(false)
                    }}
                />
            ) : (
                <div className="border rounded-md p-4 flex">
                    <div className="font-semibold flex-1">
                        <p
                            className={cn({
                                "line-through": done,
                            })}
                        >
                            {todo.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => {
                                setIsEditing(true)
                            }}
                        >
                            Edit
                        </Button>
                        <Button onClick={() => setDone(!done)}>Done</Button>
                        <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                    </div>
                </div>
            )}
        </>
    )
}

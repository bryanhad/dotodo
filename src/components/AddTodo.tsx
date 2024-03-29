import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Todo } from "./Todo"
import { parseStringifiedTodos } from "@/lib/utils"
import { toast } from "sonner"

type AddTodoProps = {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const formSchema = z.object({
    title: z.string().min(2).max(50),
})

export const AddTodo = ({ setTodos }: AddTodoProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit({ title }: z.infer<typeof formSchema>) {
        const item = localStorage.getItem("todos")

        if (!item) {
            localStorage.setItem("todos", JSON.stringify([{ id: 1, title }]))
            return
        }

        const storedTodos = parseStringifiedTodos(item)

        const todoId = storedTodos.length
            ? storedTodos[storedTodos.length - 1].id + 1
            : 1

        const newTodo: Todo = {
            id: todoId,
            title,
            done: false,
        }

        storedTodos.push(newTodo)
        setTodos((prev) => [...prev, newTodo])
        localStorage.setItem("todos", JSON.stringify(storedTodos))

        form.reset()

        toast(`Successfuly added ${title}`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full gap-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input placeholder="Add your todo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

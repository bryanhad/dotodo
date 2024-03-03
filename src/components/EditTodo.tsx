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

type EditTodoProps = {
    todo: Todo
    onSubmit: (updatedTodos: Todo[]) => void
}

const formSchema = z.object({
    title: z.string().min(2).max(50),
})

export const EditTodo = ({ todo, onSubmit }: EditTodoProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: todo.title,
        },
    })

    function editTodo({ title }: z.infer<typeof formSchema>) {
        const item = localStorage.getItem("todos")
        if (!item) return
        const storedTodos = parseStringifiedTodos(item)
        const queriedTodoId = storedTodos.findIndex((e) => e.id === todo.id)
        storedTodos[queriedTodoId] = { ...todo, title }

        localStorage.setItem("todos", JSON.stringify(storedTodos))
        onSubmit(storedTodos)
        toast(`Successfuly edited todo`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(editTodo)}
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
                <Button type="submit">Update</Button>
            </form>
        </Form>
    )
}

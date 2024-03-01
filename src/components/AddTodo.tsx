import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Todo } from './Todo'

const formSchema = z.object({
    title: z.string().min(2).max(50),
})

export const AddTodo = ({todos}:{todos: Todo[]}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        },
    })

    function onSubmit(todo: z.infer<typeof formSchema>) {
        const item = localStorage.getItem('todos')

        if (!item) {
            localStorage.setItem('todos', JSON.stringify([todo]))
            return
        }

        const storedTodos: Todo[] = JSON.parse(item)
        storedTodos.push(todo)
        localStorage.setItem('todos', JSON.stringify(storedTodos))
        
        todos.push(todo)

        form.reset()

        alert(`Successfuly added ${todo.title}`)
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

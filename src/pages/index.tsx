import { AddTodo } from '@/components/AddTodo'
import { Todo } from '@/components/Todo'
import { TodoList } from '@/components/TodoList'
import { useEffect, useState } from 'react'

export const MainPage = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const storedTodos: Todo[] = JSON.parse(
            localStorage.getItem('todos') || '[]'
        )
        setTodos(storedTodos)
    }, [todos])

    return (
        <>
            <AddTodo todos={todos} />
            <TodoList todos={todos} />
        </>
    )
}

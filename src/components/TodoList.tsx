import { Fragment } from 'react'
import { Todo } from './Todo'

type TodoListProps = {
    todos: Todo[]
}

export const TodoList = ({ todos }: TodoListProps) => {
    return (
        <div className=" w-full flex flex-col gap-4 p-4">
            {todos.map((todo, i) => (
                <Fragment key={i}>
                    <Todo {...todo} />
                </Fragment>
            ))}
        </div>
    )
}

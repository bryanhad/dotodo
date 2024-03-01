import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useState } from 'react'

export type Todo = {
    title: string
}

export const Todo = ({ title }: Todo) => {
    const [done, setDone] = useState(false)

    return (
        <div className="border rounded-md p-4 flex">
            <div className="font-semibold flex-1">
                <p
                    className={cn({
                        'line-through': done,
                    })}
                >
                    {title}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button>Edit</Button>
                <Button onClick={() => setDone(!done)}>Done</Button>
                <Button>Delete</Button>
            </div>
        </div>
    )
}

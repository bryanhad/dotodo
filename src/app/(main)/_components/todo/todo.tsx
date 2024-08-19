import { Todo as TodoT } from "@prisma/client";

type Props = TodoT;

function Todo({ title, deadline, isDone, id, authorId, detail }: Props) {
    return (
        <div className="rounded-md border border-input p-4">
            <div className="" />
            {title}
        </div>
    );
}

export default Todo;

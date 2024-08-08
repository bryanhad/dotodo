import { Todo as TodoT } from "@prisma/client";

type Props = TodoT;

function Todo({ title, deadline, isDone, id, authorId, detail }: Props) {
  return <div className="p-4 rounded-md border border-input">
    <div
        className=""
    />
    {title}
  </div>;
}

export default Todo;

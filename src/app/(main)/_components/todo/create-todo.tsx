import ChooseTagModal from "../tag/choose-tag-modal";
import CreateTodoForm from "./create-todo-form";

function CreateTodo() {
    return (
        <div className="flex items-center rounded-md border border-input p-4">
            <div className="flex flex-[1] gap-4">
                <ChooseTagModal />
                <CreateTodoForm/>   
            </div>
            {/* ICONS */}
            <div></div>
        </div>
    );
}

export default CreateTodo;

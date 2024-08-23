import ChooseModuleModal from "../module/choose-module-modal";
import CreateIssueForm from "./create-issue-form";

function CreateTodo() {
    return (
        <div className="flex items-center rounded-md border border-input p-4">
            <div className="flex flex-[1] gap-4">
                <ChooseModuleModal />
                <CreateIssueForm/>   
            </div>
            {/* ICONS */}
            <div></div>
        </div>
    );
}

export default CreateTodo;

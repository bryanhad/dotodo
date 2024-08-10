import Modal from "@/components/modal";
import ChooseTag from "./tag/choose-tag";
import { TagColors, TagIcon } from "./tag/tag";

function CreateTodo() {
    return (
        <div className="flex items-center rounded-md border border-input p-4">
            <div className="flex flex-[1] gap-4">
                <ChooseTagsIcon />
            </div>
            {/* ICONS */}
            <div></div>
        </div>
    );
}

export default CreateTodo;

function ChooseTagsIcon() {
    return (
        <div className="flex gap-1">
            <Modal
                ariaDescription="create todo modal"
                title="Pick a tag for your todo"
                customButton={
                    <div className="flex gap-2 p-2">
                        <TagIcon defaultColor={TagColors.ORANGE} />
                        <TagIcon defaultColor={TagColors.BLUE} />
                        <TagIcon defaultColor={TagColors.GREEN} />
                    </div>
                }
            >
                <ChooseTag />
            </Modal>
        </div>
    );
}

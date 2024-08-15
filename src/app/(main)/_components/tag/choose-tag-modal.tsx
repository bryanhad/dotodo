import { mustAuthenticated } from "@/auth";
import Modal from "@/components/modal";
import db from "@/lib/db";
import { TagIcon } from "./tag";
import { TagColors } from './lib' 
import TagListWithCreateButton from "./tag-list-with-create-button";
import { Button } from "@/components/ui/button";

async function ChooseTagModal() {
    const {user} = await mustAuthenticated()

    const tags = await db.tag.findMany({
        where: { authorId: user.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <Modal
            ariaDescription="create todo modal"
            title="Pick a tag for your todo"
            desc="Tags are useful to group your todos"
            customButton={
                <Button variant={'ghost'} className="flex gap-2 rounded-md p-2">
                    <TagIcon defaultColor={TagColors.ORANGE} />
                    <TagIcon defaultColor={TagColors.BLUE} />
                    <TagIcon defaultColor={TagColors.GREEN} />
                </Button>
            }
        >
            <TagListWithCreateButton
                fetchedTags={tags}
            />
        </Modal>
    );
}

export default ChooseTagModal;

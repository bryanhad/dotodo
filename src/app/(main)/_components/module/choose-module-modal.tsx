import Modal from "@/components/modal";
import db from "@/lib/db";
import { ModuleColor } from "./module-item"
import { ModuleColors } from './lib' 
import ModuleListWithCreateButton from "./module-list-with-create-button";
import { Button } from "@/components/ui/button";

async function ChooseModuleModal() {
    const modules = await db.module.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <Modal
            ariaDescription="create todo modal"
            title="Pick a module for your todo"
            desc="Modules are useful to group your todos"
            customButton={
                <Button variant={'ghost'} className="flex gap-2 rounded-md p-2">
                    <ModuleColor defaultColor={ModuleColors.ORANGE} />
                    <ModuleColor defaultColor={ModuleColors.BLUE} />
                    <ModuleColor defaultColor={ModuleColors.GREEN} />
                </Button>
            }
        >
            <ModuleListWithCreateButton
                fetchedModules={modules}
            />
        </Modal>
    );
}

export default ChooseModuleModal;

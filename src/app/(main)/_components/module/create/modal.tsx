"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateModuleFormValues } from "../validation";
import CreateModuleForm from "./form";

type Props = {
    onSubmit: (formValues: CreateModuleFormValues) => void;
    formActionHasSuccessed: boolean;
};

function CreateModuleModal({ onSubmit, formActionHasSuccessed }: Props) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Modal
            ariaDescription="create module modal"
            title="Add New Module"
            desc="Add a new module that is being used in Qcash"
            open={openModal}
            onOpenChange={setOpenModal}
            customButton={
                <Button variant={"ghost"} onClick={() => setOpenModal(true)}>
                    <PlusCircle className="shrink-0" size={14} />
                    <p className="ml-2">Add New Module</p>
                </Button>
            }
        >
            <CreateModuleForm
                formActionHasSuccessed={formActionHasSuccessed}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}

export default CreateModuleModal;

"use client";

import ColorPicker from "@/components/color-picker";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateTagFormValues } from "@/lib/validation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Tag, { TagIcon } from "./tag";

type ChooseColorProps = {
    form: UseFormReturn<CreateTagFormValues>;
};

function ChooseColorButton({ form }: ChooseColorProps) {
    const [openModal, setOpenModal] = useState(false);
    const [customColor, setCustomColor] = useState(
        form.getValues("color").substring(1),
    );

    return (
        <Modal
            ariaDescription="choose color modal"
            title="Pick Tag Color"
            desc="Either pick one of the color or make your own"
            open={openModal}
            onOpenChange={setOpenModal}
            customButton={
                <Button variant={"outline"} className="size-9 rounded-full p-0">
                    <TagIcon hexColor={form.watch("color")} />
                </Button>
            }
        >
            <div className="space-y-2">
                <p className="text-[12px] font-light italic">preview</p>
                <Tag isPreview color={form.watch("color")} name="example-tag" />
            </div>
            <div className="flex gap-4">
                <ColorPicker
                    currentPickedHexColor={form.watch("color")}
                    onColorPicked={(hexColor) => {
                        form.setValue("color", hexColor);
                        // setOpenModal(false);
                    }}
                />
                <div className="flex flex-col gap-2">
                    <p className="text-[13px] font-light">Custom Hex Color</p>
                    <div className="flex h-10 gap-2 rounded-md border border-input px-3 py-2 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <label className="cursor-pointer">#</label>
                        <Input
                            variant={"withIcon"}
                            className="select-all focus-within:outline-none"
                            onChange={(e) => {
                                const hexCode = e.target.value.replace(
                                    /#/g,
                                    "",
                                );
                                setCustomColor(hexCode);
                                form.setValue("color", "#" + hexCode);
                            }}
                            value={customColor}
                        />
                    </div>
                    <div
                        className="flex-[1] rounded-md border border-input"
                        style={{ backgroundColor: form.watch("color") }}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ChooseColorButton;

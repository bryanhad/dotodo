"use client";

import ColorPicker from "@/components/color-picker";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ModuleItem, { ModuleColor } from "./module-item";

type Props = {
    formColorValueState: string;
    initialFormColorValue: string;
    onColorPicked: (hexColor: string) => void;
    onCustomColorInputChange: (hexCode: string) => void;
};

function ChooseColorButton({
    formColorValueState,
    initialFormColorValue,
    onColorPicked,
    onCustomColorInputChange,
}: Props) {
    const [openModal, setOpenModal] = useState(false);
    const [customColor, setCustomColor] = useState(
        initialFormColorValue.substring(1),
    );

    return (
        <Modal
            ariaDescription="choose color modal"
            title="Pick Module Color"
            desc="Either pick one of the color or make your own"
            open={openModal}
            onOpenChange={setOpenModal}
            customButton={
                <Button
                    tabIndex={-1}
                    variant={"outline"}
                    className="size-9 rounded-full p-0"
                >
                    <ModuleColor hexColor={formColorValueState} />
                </Button>
            }
        >
            <div className="space-y-2">
                <p className="text-[12px] font-light italic">preview</p>
                <ModuleItem isPreview color={formColorValueState} name="example-module" />
            </div>
            <div className="flex gap-4">
                <ColorPicker
                    currentPickedHexColor={formColorValueState}
                    onColorPicked={(hexColor) => {
                        onColorPicked(hexColor);
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
                                onCustomColorInputChange(hexCode);
                            }}
                            value={customColor}
                        />
                    </div>
                    <div
                        className="flex-[1] rounded-md border border-input"
                        style={{ backgroundColor: formColorValueState }}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ChooseColorButton;

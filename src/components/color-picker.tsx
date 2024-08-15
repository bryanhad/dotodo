"use client";

import { TagColors } from "@/app/(main)/_components/tag/lib";
import { useState } from "react";

type Props = {
    onColorPicked: (hexColor: string) => void;
    currentPickedHexColor?: string;
};

function ColorPicker({ onColorPicked, currentPickedHexColor }: Props) {
    const tagColorsArray = Object.entries(TagColors) as [string, string][];
    const [selectedColor, setSelectedColor] = useState(
        currentPickedHexColor || (TagColors.DEFAULT as string),
    );

    return (
        <div>
            <div className="grid grid-cols-6 gap-3">
                {tagColorsArray.map(([key, value]) => (
                    <ColorBlob
                        isSelected={value === selectedColor}
                        key={key}
                        color={value}
                        colorName={key}
                        onBlobClicked={(hexColor) => {
                            setSelectedColor(hexColor);
                            onColorPicked(hexColor);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

type ColorBlobProps = {
    isSelected: boolean;
    color: string;
    colorName: string;
    onBlobClicked: (hexColor: string) => void;
};

function ColorBlob({
    color,
    colorName,
    onBlobClicked,
    isSelected,
}: ColorBlobProps) {
    return (
        <div className="group mr-5 size-7 duration-100 hover:scale-125">
            <div
                title={colorName.toLowerCase()}
                tabIndex={0}
                className="focus-visible:border-2 focus-visible:outline focus-visible:outline-2 dark:focus-visible:border-none dark:focus-visible:outline-white"
                style={{
                    userSelect: "none",
                    background: "transparent",
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                    borderRadius: "50%",
                    boxShadow: `${color} 0px 0px 0px ${isSelected ? "3px" : "15px"} inset, ${color} 0px 0px 5px`,
                    transition: "box-shadow 100ms",
                }}
                role="button"
                onClick={() => onBlobClicked(color)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onBlobClicked(color);
                    }
                }}
            />
        </div>
    );
}

export default ColorPicker;

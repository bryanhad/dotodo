"use client";

import { useState } from "react";
import { CirclePicker } from "react-color";

type Props = {
    onColorPicked: (hexColor: string) => void;
};

export enum TagColors {
    "DEFAULT" = "#64748b",
    "RED" = "#ef4444",
    "AMBER" = "#f59e0b",
    "YELLOW" = "#facc15",
    "ORANGE" = "#f97316",
    "GREEN" = "#22c55e",
    "ROSE" = "#f43f5e",
    "PURPLE" = "#a855f7",
    "VIOLET" = "#8b5cf6",
    "INDIGO" = "#6366f1",
    "FUCHSIA" = "#d946ef",
    "PINK" = "#ec4899",
    // "MOSS" = "#365314",
    "BLUE" = "#3b82f6",
    "SKY" = "#0ea5e9",
    "CYAN" = "#06b6d4",
    "TEAL" = "#2dd4bf",
    "EMERALD" = "#10b981",
    "LIME" = "#a3e635",
}

function ColorPicker({ onColorPicked }: Props) {
    const tagColorsArray = Object.entries(TagColors) as [string, string][];
    const [selectedColor, setSelectedColor] = useState(
        TagColors.DEFAULT as string,
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
            <CirclePicker
                className="[&>div:hover]:border-2 [&>div:hover]:border-white"
                color={selectedColor}
                onChangeComplete={(color) => {
                    setSelectedColor(color.hex);
                    onColorPicked(color.hex);
                }}
            />
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
        <div className="duration-100 hover:scale-125">
            <div
                title={colorName}
                tabIndex={0}
                className="size-7 rounded-full focus:outline focus:outline-2 focus:outline-white"
                style={{
                    backgroundColor: isSelected ? "" : color,
                    outlineColor: isSelected ? color : "",
                    outlineStyle: isSelected ? "solid" : "  ",
                    outlineWidth: isSelected ? "2px" : "",
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

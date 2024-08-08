"use client";

import { useState } from "react";
import { CirclePicker } from "react-color";

type Props = {
    onColorPicked: (hexColor: string) => void;
};

function ColorPicker({ onColorPicked }: Props) {
    const [color, setColor] = useState("");
    return (
        <div>
            <CirclePicker
                className="[&>div:hover]:border-2 [&>div:hover]:border-white"
                color={color}
                onChangeComplete={(color) => {
                    setColor(color.hex);
                    onColorPicked(color.hex);
                }}
            />
        </div>
    );
}

export default ColorPicker;

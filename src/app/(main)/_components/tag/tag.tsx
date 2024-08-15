import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tag as TagT } from "@prisma/client";
import { Trash2 } from "lucide-react";

type BaseProps = Pick<TagT, "color" | "name"> & {
    className?: string;
    isPreview?: boolean;
};

type PreviewProps = BaseProps & { isPreview: true };

type NonPreviewProps = BaseProps & {
    isPreview?: false;
    id: string;
    onDelete: (tagId: string) => void;
};

type Props = PreviewProps | NonPreviewProps;

export enum TagColors {
    "DEFAULT" = "#64748b",
    "ORANGE" = "#f97316",
    "AMBER" = "#f59e0b",
    "YELLOW" = "#facc15",
    "RED" = "#ef4444",
    "ROSE" = "#f43f5e",
    "PINK" = "#ec4899",
    "FUCHSIA" = "#d946ef",
    "PURPLE" = "#a855f7",
    "VIOLET" = "#8b5cf6",
    "INDIGO" = "#6366f1",
    "BLUE" = "#3b82f6",
    "SKY" = "#0ea5e9",
    "CYAN" = "#06b6d4",
    "EMERALD" = "#10b981",
    "GREEN" = "#22c55e",
    "TEAL" = "#2dd4bf",
    "LIME" = "#a3e635",
}

function Tag(props: Props) {
    if (props.isPreview) {
        return (
            <Button
                type="button"
                size={"sm"}
                variant={"outline"}
                className={cn(
                    "flex w-full justify-start gap-2",
                    { "hover:bg-transparent": props.isPreview },
                    props.className,
                )}
            >
                <TagIcon hexColor={props.color} />
                <p className="">{props.name}</p>
            </Button>
        );
    }

    return (
        <Button
            asChild
            variant={"ghost"}
            className={cn(
                "flex w-full items-center justify-between gap-4",
                props.className,
            )}
        >
            <div tabIndex={0} role="button" title="delete tag">
                <div className="flex items-center gap-4">
                    <TagIcon hexColor={props.color} />
                    {props.name}
                </div>
                <div className="p-1">
                    <Button
                        size={"sm"}
                        className=""
                        variant={"outline"}
                        onClick={() => props.onDelete(props.id)}
                    >
                        <Trash2 className="shrink-0" size={14} />
                    </Button>
                </div>
            </div>
        </Button>
    );
}

export default Tag;

type TagIconProps =
    | {
          className?: string;
          defaultColor: TagColors;
          hexColor?: never;
      }
    | {
          className?: string;
          defaultColor?: never;
          hexColor: string;
      };

export function TagIcon({
    className,
    defaultColor = TagColors.DEFAULT,
    hexColor,
}: TagIconProps) {
    return (
        <div
            className={cn(
                // if there is no hexColor argument, use defaultColor
                "size-3 rounded-full",
                className,
            )}
            style={{ backgroundColor: hexColor ?? defaultColor }}
        />
    );
}

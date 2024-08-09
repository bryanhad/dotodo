import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tag as TagT } from "@prisma/client";
import { Trash2 } from "lucide-react";

type BaseProps = Pick<TagT, "color" | "name"> & {
    className?: string;
    isPreview?: boolean;
};

type PreviewProps = BaseProps & { isPreview: true };
type NonPreviewProps = BaseProps &
    Omit<TagT, "color" | "name"> & { isPreview?: false };

type Props = PreviewProps | NonPreviewProps;

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
            <div tabIndex={0} role="button" aria-describedby="">
                <div className="flex items-center gap-4">
                    <TagIcon hexColor={props.color} />
                    {props.name}
                </div>
                <div className="p-1">
                    <Button size={"sm"} className="" variant={"outline"}>
                        <Trash2 className="shrink-0" size={14} />
                    </Button>
                </div>
            </div>
        </Button>
    );
}

export default Tag;

export enum TagColors {
    "DEFAULT" = "#64748b",
    "BLUE" = "#0ea5e9",
    "ORANGE" = "#d97706 ",
    "GREEN" = "#22c55e",
}

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

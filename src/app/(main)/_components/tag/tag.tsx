"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tag as TagT } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteTagAction, editTagAction } from "./action";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";
import EditTagForm from "./edit-tag-form";
import { TagColors } from "./lib";

type BaseProps = Pick<TagT, "color" | "name"> & {
    className?: string;
    isPreview?: boolean;
};

type PreviewProps = BaseProps & { isPreview: true };

type NonPreviewProps = BaseProps & {
    isPreview?: false;
    id: string;
};

type Props = PreviewProps | NonPreviewProps;

function Tag(props: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();
    const { execute: executeDeleteTag, isExecuting: isExecutingDeleteTag } =
        useAction(deleteTagAction, {
            onSuccess: ({ data }) => {
                if (data?.name)
                    [toast({ title: `Tag '${data.name}' has been removed` })];
            },
            onError: ({ error: { serverError } }) => {
                if (serverError) {
                    toast({ variant: "destructive", ...serverError });
                }
            },
        });

    if (props.isPreview) {
        return (
            <Button
                tabIndex={-1}
                type="button"
                size={"sm"}
                variant={"outline"}
                className={cn(
                    "flex w-full select-none justify-start gap-2",
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
                {'pl-1': isEditing},
                props.className,
            )}
        >
            <div tabIndex={0} role="button" title="delete tag">
                {!isEditing && (
                    <div className="flex items-center gap-4">
                        <TagIcon hexColor={props.color} />
                        {props.name}
                    </div>
                )}
                <div className="flex gap-2 items-center">
                    <EditTagForm
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        tag={{
                            color: props.color,
                            id: props.id,
                            name: props.name,
                        }}
                    />
                    {/* DELETE TAG BUTTON */}
                    {!isEditing && (
                        <SubmitButton
                            icon
                            isLoading={isExecutingDeleteTag}
                            size={"sm"}
                            className=""
                            variant={"outline"}
                            onClick={() => executeDeleteTag({ id: props.id })}
                        >
                            <Trash2 className="shrink-0" size={14} />
                        </SubmitButton>
                    )}
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
                "size-3 rounded-full select-none",
                className,
            )}
            style={{ backgroundColor: hexColor ?? defaultColor }}
        />
    );
}

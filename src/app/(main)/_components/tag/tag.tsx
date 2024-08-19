"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CreateTodoActionFormValues } from "@/lib/validation";
import { Tag as TagT } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { deleteTagAction } from "./action";
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
    const todoForm = useFormContext<CreateTodoActionFormValues>();

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
                "flex w-full items-center justify-between p-0",
                { "pl-1": isEditing },
                props.className,
            )}
        >
            <div className="flex gap-4">
                {!isEditing && (
                    <div
                        tabIndex={0}
                        className="flex h-full flex-[1] items-center gap-4 rounded-l-md pl-4"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                todoForm.setValue("tagId", props.id);
                            }
                        }}
                    >
                        <TagIcon hexColor={props.color} />
                        {props.name}
                    </div>
                )}
                <div className="flex items-center gap-2 pr-4">
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
                "size-3 select-none rounded-full",
                className,
            )}
            style={{ backgroundColor: hexColor ?? defaultColor }}
        />
    );
}

"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CreateIssueFormValues } from "@/lib/validation";
import { Module as ModuleT } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { deleteModuleAction } from "./action";
import EditModuleForm from "./edit/form";
import { ModuleColors } from "./lib";
import { useAction } from "next-safe-action/hooks";

type BaseProps = Pick<ModuleT, "color" | "name"> & {
    className?: string;
    isPreview?: boolean;
};

type PreviewProps = BaseProps & { isPreview: true };

type NonPreviewProps = BaseProps &
    Pick<ModuleT, "abbreviation"> & {
        isPreview?: false;
        id: string;
    };

type Props = PreviewProps | NonPreviewProps;

function ModuleItem(props: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();
    const issueForm = useFormContext<CreateIssueFormValues>();

    const {
        execute: executeDeleteModule,
        isExecuting: isExecutingDeleteModule,
    } = useAction(deleteModuleAction, {
        onSuccess: ({ data }) => {
            if (data?.name)
                [toast({ title: `Module '${data.name}' has been removed` })];
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
                <ModuleColor hexColor={props.color} />
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
                                issueForm.setValue("moduleId", props.id);
                            }
                        }}
                    >
                        <ModuleColor hexColor={props.color} />
                        {props.abbreviation || props.name}
                    </div>
                )}
                <div className="flex items-center gap-2 pr-4">
                    <EditModuleForm
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        module={{
                            color: props.color,
                            id: props.id,
                            name: props.name,
                        }}
                    />
                    {/* DELETE MODULE BUTTON */}
                    {!isEditing && (
                        <SubmitButton
                            icon
                            isLoading={isExecutingDeleteModule}
                            size={"sm"}
                            className=""
                            variant={"outline"}
                            onClick={() =>
                                executeDeleteModule({ id: props.id })
                            }
                        >
                            <Trash2 className="shrink-0" size={14} />
                        </SubmitButton>
                    )}
                </div>
            </div>
        </Button>
    );
}

export default ModuleItem;

type ModuleColorProps =
    | {
          className?: string;
          defaultColor: ModuleColors;
          hexColor?: never;
      }
    | {
          className?: string;
          defaultColor?: never;
          hexColor: string;
      };

export function ModuleColor({
    className,
    defaultColor = ModuleColors.DEFAULT,
    hexColor,
}: ModuleColorProps) {
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

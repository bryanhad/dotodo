"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { EditModuleFormValues, editModuleActionSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Module } from "@prisma/client";
import { CheckIcon, PencilIcon, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { editModuleAction } from "../action";
import ChooseColorButton from "../choose-color-button";

type Props = {
    module: Pick<Module, "id" | "color" | "name">;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditModuleForm({ module, isEditing, setIsEditing }: Props) {
    const { toast } = useToast();

    const { execute: executeEditModule, isExecuting: isExecutingEditModule } =
        useAction(editModuleAction, {
            onSuccess: () => {
                toast({ title: `Module has been updated` });
                setIsEditing(false);
            },
            onError: ({ error: { serverError } }) => {
                if (serverError) {
                    toast({ variant: "destructive", ...serverError });
                }
            },
        });

    const form = useForm<EditModuleFormValues>({
        resolver: zodResolver(editModuleActionSchema),
        defaultValues: {
            id: module.id,
            color: module.color,
            name: module.name,
        },
    });

    if (!isEditing) {
        return (
            <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setIsEditing(true)}
            >
                <PencilIcon className="shrink-0" size={14} />
            </Button>
        );
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(executeEditModule)}
                className="flex gap-2"
            >
                <div className="flex items-center gap-2">
                    <ChooseColorButton
                        onCustomColorInputChange={(hexCode) => {
                            form.setValue("color", "#" + hexCode);
                        }}
                        onColorPicked={(hexColor) => {
                            form.setValue("color", hexColor);
                        }}
                        formColorValueState={form.watch("color") as string}
                        initialFormColorValue={
                            form.getValues("color") as string
                        }
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-[1]">
                                <FormControl>
                                    <Input
                                        placeholder="Type module name here"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            form.reset();
                        }}
                        variant={"outline"}
                        size={"sm"}
                    >
                        <X className="shrink-0" size={15} />
                    </Button>
                    <SubmitButton
                        isLoading={isExecutingEditModule}
                        icon
                        type="submit"
                        size={"sm"}
                    >
                        <CheckIcon className="shrink-0" size={15} />
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
}

export default EditModuleForm;

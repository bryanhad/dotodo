"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { EditTagFormValues, editTagActionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "@prisma/client";
import { CheckIcon, PencilIcon, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { editTagAction } from "./action";
import ChooseColorButton from "./choose-color-button";

type Props = {
    tag: Pick<Tag, "id" | "color" | "name">;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditTagForm({ tag, isEditing, setIsEditing }: Props) {
    const { toast } = useToast();

    const { execute: executeEditTag, isExecuting: isExecutingEditTag } =
        useAction(editTagAction, {
            onSuccess: () => {
                toast({ title: `Tag has been updated` });
                setIsEditing(false);
            },
            onError: ({ error: { serverError } }) => {
                if (serverError) {
                    toast({ variant: "destructive", ...serverError });
                }
            },
        });

    const form = useForm<EditTagFormValues>({
        resolver: zodResolver(editTagActionSchema),
        defaultValues: {
            id: tag.id,
            color: tag.color,
            name: tag.name,
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
                onSubmit={form.handleSubmit(executeEditTag)}
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
                                        placeholder="Type tag name here"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <Button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            form.reset();
                        }}
                        variant={"outline"}
                        size={'sm'}
                    >
                        <X className="shrink-0" size={15}/>
                    </Button>
                    <SubmitButton
                        isLoading={isExecutingEditTag}
                        icon
                        type="submit"
                        size={'sm'}
                    >
                        <CheckIcon className="shrink-0" size={15}/>
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
}

export default EditTagForm;

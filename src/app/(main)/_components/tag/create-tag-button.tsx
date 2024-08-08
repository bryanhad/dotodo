"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CreateTagFormValues, createTagSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { createTag } from "./action";
import Modal from "@/components/modal";
import ColorPicker from "@/components/color-picker";
import Tag, { TagColors, TagIcon } from "./tag";

type Props = {
    currentLoggedInUserId: string;
};

export function CreateTagButton({ currentLoggedInUserId }: Props) {
    const [isClicked, setIsClicked] = useState(false);

    const { toast } = useToast();
    const { execute, result, isExecuting } = useAction(createTag, {
        onError: ({ error: { serverError, validationErrors } }) => {
            if (serverError) {
                toast({
                    variant: "destructive",
                    title: serverError.title,
                    description: serverError.description,
                });
            }
            if (validationErrors) {
                toast({
                    variant: "destructive",
                    title: "Invalid Input",
                    description: "Please check your input",
                });
            }
        },
        onSuccess: ({ input }) => {
            toast({
                title: "Hooray!",
                description: `Tag '${input.name}' has been added!`,
            });
        },
    });

    const form = useForm<CreateTagFormValues>({
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            authorId: currentLoggedInUserId,
            color: TagColors.DEFAULT,
            name: "",
        },
    });

    if (!isClicked) {
        return (
            <Button variant={"ghost"} onClick={() => setIsClicked(true)}>
                <PlusCircle className="shrink-0" size={14} />
                <p className="ml-2">Add New Tag</p>
            </Button>
        );
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(execute)}
                    className="space-y-2"
                >
                    <div className="flex items-center gap-2">
                        <ChooseColorButton form={form} />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex-[1]">
                                    <FormControl>
                                        <Input
                                            disabled={isExecuting}
                                            placeholder="Type new tag here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-x-2">
                        <Button
                            type="button"
                            onClick={() => setIsClicked(false)}
                            variant={"outline"}
                        >
                            Cancel
                        </Button>
                        <SubmitButton isLoading={isExecuting} type="submit">
                            Add Tag
                        </SubmitButton>
                    </div>
                </form>
            </Form>{" "}
        </div>
    );
}

type ChooseColorProps = {
    form: UseFormReturn<CreateTagFormValues>;
};

function ChooseColorButton({ form }: ChooseColorProps) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Modal
            title="Pick Tag Color"
            desc="Either pick one of the color or make your own"
            open={openModal}
            onOpenChange={setOpenModal}
            customButton={
                <Button variant={"outline"} className="size-9 rounded-full p-0">
                    <TagIcon hexColor={form.watch("color")} />
                </Button>
            }
        >
            <div className="flex gap-4">
                <ColorPicker
                    onColorPicked={(hexColor) => {
                        form.setValue("color", hexColor);
                        // setOpenModal(false);
                    }}
                />
                <div className="space-y-2">
                    <div className="flex gap-2 h-10 px-3 py-2 border border-input rounded-md
                    ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ">
                        <label htmlFor="hex-input" className="cursor-pointer">#</label>
                        <Input id="hex-input" variant={"withIcon"} className="select-all focus-within:outline-none" {...form.register("color")} />
                    </div>
                    <p className="text-[12px] font-light italic">preview</p>
                    <Tag
                        isPreview
                        color={form.watch("color")}
                        name="example-tag"
                    />
                </div>
            </div>
        </Modal>
    );
}

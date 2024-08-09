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
    const [customColor, setCustomColor] = useState(
        form.getValues("color").substring(1),
    );

    return (
        <Modal
            ariaDescription="choose color modal"
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
            <div className="space-y-2">
                <p className="text-[12px] font-light italic">preview</p>
                <Tag isPreview color={form.watch("color")} name="example-tag" />
            </div>
            <div className="flex gap-4">
                <ColorPicker
                    onColorPicked={(hexColor) => {
                        form.setValue("color", hexColor);
                        // setOpenModal(false);
                    }}
                />
                <div className="flex flex-col gap-2">
                    <p className="text-[12px] font-light">Custom Hex Color</p>
                    <div className="flex h-10 gap-2 rounded-md border border-input px-3 py-2 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <label className="cursor-pointer">#</label>
                        <Input
                            variant={"withIcon"}
                            className="select-all focus-within:outline-none"
                            onChange={(e) => {
                                setCustomColor(e.target.value);
                                form.setValue("color", "#" + customColor);
                            }}
                            value={customColor}
                        />
                        {}
                    </div>
                    <div
                        className="flex-[1] rounded-md border border-input"
                        style={{ backgroundColor: form.watch("color") }}
                    />
                </div>
            </div>
        </Modal>
    );
}

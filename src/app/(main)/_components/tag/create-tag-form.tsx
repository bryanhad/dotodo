"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTagFormSchema, CreateTagFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ChooseColorButton from "./choose-color-button";
import { TagColors } from "./lib";

type Props = {
    onSubmit: (formValues: CreateTagFormValues) => void;
    formActionHasSuccessed: boolean;
};

export default function CreateTagForm({
    onSubmit,
    formActionHasSuccessed,
}: Props) {
    const [isClicked, setIsClicked] = useState(false);

    const form = useForm<CreateTagFormValues>({
        resolver: zodResolver(createTagFormSchema),
        defaultValues: {
            color: TagColors.DEFAULT,
            name: "",
        },
    });

    useEffect(() => {
        if (formActionHasSuccessed) {
            form.resetField("name");
        }
    }, [formActionHasSuccessed, form]);

    if (!isClicked) {
        return (
            <Button variant={"ghost"} onClick={() => setIsClicked(true)}>
                <PlusCircle className="shrink-0" size={14} />
                <p className="ml-2">Add New Tag</p>
            </Button>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <div className="flex items-center gap-2">
                        <ChooseColorButton
                            onCustomColorInputChange={(hexCode) => {
                                form.setValue("color", "#" + hexCode);
                            }}
                            onColorPicked={(hexColor) => {
                                form.setValue("color", hexColor);
                            }}
                            formColorValueState={form.watch("color")}
                            initialFormColorValue={form.getValues("color")}
                        />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-[1]">
                                <FormControl>
                                    <Input
                                        placeholder="Type new tag here"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        onClick={() => {
                            setIsClicked(false);
                            form.reset();
                        }}
                        variant={"outline"}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Add Tag</Button>
                </div>
            </form>
        </Form>
    );
}

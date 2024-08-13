"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTagFormSchema, CreateTagFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ChooseColorButton from "./choose-color-button";
import { TagColors } from "./tag";

type Props = {
    onSubmit: (formValues: CreateTagFormValues) => void;
};

export default function CreateTagForm({ onSubmit }: Props) {
    const [isClicked, setIsClicked] = useState(false);

    const form = useForm<CreateTagFormValues>({
        resolver: zodResolver(createTagFormSchema),
        defaultValues: {
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
                    onSubmit={form.handleSubmit(onSubmit)}
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
                                            placeholder="Type new tag here"
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* <FormMessage /> */}
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
                        <Button type="submit">Add Tag</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
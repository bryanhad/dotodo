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
import { useForm } from "react-hook-form";
import { createTag } from "./action";
import { TagColors } from "./tag";
import ChooseColorButton from "./choose-color-button";

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


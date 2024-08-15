"use client";
import ScrollArea from "@/components/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Tag as TagT } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { useOptimisticAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { createTagAction } from "./action";
import CreateTagForm from "./create-tag-form";
import Tag from "./tag";

type Props = {
    fetchedTags: Omit<TagT, "authorId" | "createdAt">[];
};

function TagListWithCreateButton({ fetchedTags }: Props) {
    const { execute, optimisticState, result } = useOptimisticAction(
        createTagAction,
        {
            currentState: fetchedTags,
            updateFn: (currentState, newTag) => {
                return [newTag, ...currentState];
            },
        },
    );

    const { toast } = useToast();

    useEffect(() => {
        if (result.serverError) {
            toast({
                variant: "destructive",
                title: result.serverError.title,
                description: result.serverError.description,
            });
        }
    }, [toast, result]);

    return (
        <div className="space-y-4">
            <ScrollArea className="h-40">
                <div className="flex flex-col gap-2 p-1 pr-4">
                    {optimisticState.map((tag) => (
                        <Tag key={tag.id} {...tag} onDelete={(id) => {}} />
                    ))}
                </div>
            </ScrollArea>
            <CreateTagForm
                onSubmit={(formValues) => {
                    const newTagId = generateIdFromEntropySize(10);
                    const currentTime = new Date();
                    execute({
                        id: newTagId,
                        ...formValues,
                    });
                }}
            />
        </div>
    );
}

export default TagListWithCreateButton;

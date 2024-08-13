"use client";
import ScrollArea from "@/components/scroll-area";
import { Tag as TagT } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { useOptimisticAction } from "next-safe-action/hooks";
import { createTag } from "./action";
import CreateTagForm from "./create-tag-form";
import Tag from "./tag";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    fetchedTags: TagT[];
    currentLoggedInUserId: string;
};

function TagListWithCreateButton({
    fetchedTags,
    currentLoggedInUserId,
}: Props) {
    const { execute, optimisticState, hasErrored } = useOptimisticAction(
        createTag,
        {
            currentState: fetchedTags,
            updateFn: (currentState, newTag) => {
                return [newTag, ...currentState];
            },
        },
    );
    const { toast } = useToast();
    useEffect(() => {
        if (hasErrored) {
            toast({ variant: "destructive", title: "Failed to add new tag" });
        }
    }, [hasErrored, toast]);

    return (
        <div className="space-y-4">
            <ScrollArea className="h-40">
                <div className="flex flex-col gap-2 p-1 pr-4">
                    {optimisticState.map((tag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
            </ScrollArea>
            <CreateTagForm
                onSubmit={(formValues) => {
                    const newTagId = generateIdFromEntropySize(10);
                    const currentTime = new Date();
                    execute({
                        id: newTagId,
                        authorId: currentLoggedInUserId,
                        createdAt: currentTime,
                        ...formValues,
                    });
                    toast({ title: "New tag has been added" });
                }}
            />
        </div>
    );
}

export default TagListWithCreateButton;

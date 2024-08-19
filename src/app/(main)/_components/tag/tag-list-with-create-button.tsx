"use client";
import ScrollArea from "@/components/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Tag as TagT } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { useOptimisticAction } from "next-safe-action/hooks";
import { createTagAction } from "./action";
import CreateTagForm from "./create-tag-form";
import Tag from "./tag";

type Props = {
    fetchedTags: Omit<TagT, "authorId" | "createdAt">[];
};

function TagListWithCreateButton({ fetchedTags }: Props) {
    const { execute, optimisticState, hasSucceeded } = useOptimisticAction(
        createTagAction,
        {
            currentState: fetchedTags,
            updateFn: (currentState, newTag) => {
                return [newTag, ...currentState];
            },
            onError: ({ error }) => {
                if (error.serverError) {
                    toast({
                        variant: "destructive",
                        title: error.serverError.title,
                        description: error.serverError.description,
                    });
                }
            },
        },
    );

    const { toast } = useToast();

    return (
        <div className="space-y-6">
            {fetchedTags.length ? (
                <ScrollArea className="h-40">
                    <div className="flex flex-col gap-2 p-1 pr-4">
                        {optimisticState.map((tag) => (
                            <Tag key={tag.id} {...tag} />
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <div className="flex h-40 items-center justify-center">
                    <p className="font-thin">
                        You currently don&apos;t have any tags.
                    </p>
                </div>
            )}
            <CreateTagForm
                formActionHasSuccessed={hasSucceeded}
                onSubmit={(formValues) => {
                    const newTagId = generateIdFromEntropySize(10);
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

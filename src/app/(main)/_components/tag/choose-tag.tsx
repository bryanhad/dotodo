"use server";

import { validateRequest } from "@/auth";
import db from "@/lib/db";
import Tag from "./tag";
import ScrollArea from "@/components/scroll-area";
import { CreateTagButton } from "./create-tag-button";

async function ChooseTag() {
    const { user } = await validateRequest();

    if (!user) {
        throw new Error("no user??");
    }

    const tags = await db.tag.findMany({
        where: {
            authorId: user?.id,
        },
    });
    return (
        <div className="space-y-4">
            <ScrollArea className="h-40">
                <div className="p-1 pr-4 flex flex-col gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                </div>
            </ScrollArea>
            <CreateTagButton currentLoggedInUserId={user.id} />
        </div>
    );
}

export default ChooseTag;

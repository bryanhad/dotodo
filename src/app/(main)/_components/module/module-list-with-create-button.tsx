"use client";
import ScrollArea from "@/components/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Module as ModuleT } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { useOptimisticAction } from "next-safe-action/hooks";
import { createModuleAction } from "./action";
import CreateModuleForm from "./create/form";
import ModuleItem from "./module-item";
import CreateModuleModal from "./create/modal";

type Props = {
    fetchedModules: Omit<
        ModuleT,
        "authorId" | "createdAt" | "lastUpdatedAt" | "editorId"
    >[];
};

function ModuleListWithCreateButton({ fetchedModules }: Props) {
    const { execute, optimisticState, hasSucceeded } = useOptimisticAction(
        createModuleAction,
        {
            currentState: fetchedModules,
            updateFn: (currentState, newModule) => {
                return [
                    {
                        ...newModule,
                        abbreviation: newModule.abbreviation ?? null,
                        description: newModule.description ?? null,
                        fee: newModule.fee ?? null,
                        currencyId: newModule.currencyId ?? null,
                    },
                    ...currentState,
                ];
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
            {fetchedModules.length ? (
                <ScrollArea className="h-40">
                    <div className="flex flex-col gap-2 p-1 pr-4">
                        {optimisticState.map((module) => (
                            <ModuleItem key={module.id} {...module} />
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <div className="flex h-40 items-center justify-center">
                    <p className="font-thin">
                        You currently don&apos;t have any modules.
                    </p>
                </div>
            )}
            <CreateModuleModal
                       formActionHasSuccessed={hasSucceeded}
                       onSubmit={(formValues) => {
                           const newModuleId = generateIdFromEntropySize(10);
                           execute({
                               id: newModuleId,
                               ...formValues,
                           });
                       }}
            />
        </div>
    );
}

export default ModuleListWithCreateButton;

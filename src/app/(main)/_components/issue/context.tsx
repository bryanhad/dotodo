'use client'
import {
    createIssueActionSchema,
    CreateIssueFormValues
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export const TodoFormProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const formMethods = useForm<CreateIssueFormValues>({
        resolver: zodResolver(createIssueActionSchema),
        defaultValues: {
            title: "",
            issueDate: new Date(),
            detail: undefined,
            tagId: "",
            moduleId: ''
        },
    });

    return (
        <FormProvider {...formMethods}>
            {children}
        </FormProvider>
    );
};

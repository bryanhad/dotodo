'use client'

import {
    CreateTodoActionFormValues,
    createTodoActionSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";

export const TodoFormProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const formMethods = useForm<CreateTodoActionFormValues>({
        resolver: zodResolver(createTodoActionSchema),
        defaultValues: {
            title: "",
            deadline: new Date(),
            detail: undefined,
            tagId: "",
        },
    });

    return (
        <FormProvider {...formMethods}>
            {children}
        </FormProvider>
    );
};

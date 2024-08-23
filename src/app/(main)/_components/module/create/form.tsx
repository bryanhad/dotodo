"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select-server-action";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ChooseColorButton from "../choose-color-button";
import { ModuleColors } from "../lib";
import { createModuleFormSchema, CreateModuleFormValues } from "../validation";

type Props = {
    onSubmit: (formValues: CreateModuleFormValues) => void;
    formActionHasSuccessed: boolean;
};

export default function CreateModuleForm({
    onSubmit,
    formActionHasSuccessed,
}: Props) {
    const form = useForm<CreateModuleFormValues>({
        resolver: zodResolver(createModuleFormSchema),
        defaultValues: {
            color: ModuleColors.DEFAULT,
            name: "",
        },
    });

    useEffect(() => {
        if (formActionHasSuccessed) {
            form.resetField("name");
        }
    }, [formActionHasSuccessed, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
            >
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
                                        placeholder="New module name"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-5 gap-2">
                    <FormField
                        control={form.control}
                        name="abbreviation"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormControl>
                                    <Input
                                        placeholder="Abbreviation"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fee"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormControl>
                                <div className="w-full">
                                        <Select {...field}>
                                            <option value="">
                                                No Currency
                                            </option>
                                            {(
                                                Object.values(
                                                    CreditorType
                                                ) as string[]
                                            ).map((type) => (
                                                <option value={type} key={type}>
                                                    {capitalizeFirstLetter(
                                                        type
                                                    )}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fee"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormControl>
                                    <Input placeholder="Fee Description" {...field} />
                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex-[1]">
                            <FormControl>
                                <Textarea
                                    placeholder="Module's description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            {/* <FormMessage /> */}
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <Button type="submit">Add Module</Button>
                </div>
            </form>
        </Form>
    );
}

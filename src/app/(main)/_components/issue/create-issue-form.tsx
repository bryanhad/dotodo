"use client";

import DeadlinePicker from "@/components/deadline-picker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateIssueFormValues } from "@/lib/validation";
import { useFormContext } from "react-hook-form";

function CreateIssueForm() {
    const form = useFormContext<CreateIssueFormValues>();

    return (
        <Form {...form}>
            <form className="flex gap-2">
                <div className="flex items-center gap-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-[1]">
                                <FormControl>
                                    <Input
                                        placeholder="What's the issue?"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                    />
                    <DeadlinePicker name="issueDate" control={form.control} />
                </div>
                <div className="flex gap-2">
                    <Button type="submit">Add Issue</Button>
                </div>
            </form>
        </Form>
    );
}

export default CreateIssueForm;

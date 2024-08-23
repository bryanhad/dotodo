import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
    ControllerProps,
    FieldPath
} from "react-hook-form";

type Props<
    TFieldValues extends { issueDate?: Date | undefined },
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, "control" | "name">;

function DeadlinePicker<
    TFieldValues extends { issueDate?: Date | undefined },
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name }: Props<TFieldValues, TName>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    {/* <FormLabel>Deadline</FormLabel> */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a deadline</span>
                                    )}
                                    <CalendarIcon
                                        className="ml-auto h-4 w-4 shrink-0 opacity-50"
                                        size={15}
                                    />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                        Please select a deadline for your task.
                    </FormDescription> */}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default DeadlinePicker;

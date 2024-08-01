"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/server-actions";
import { signInFormSchema, SignInFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import SubmitButton from "./submit-button";
import { useToast } from "./ui/use-toast";

function SignInForm() {
  const { toast } = useToast();
  const { execute, result, isExecuting } = useAction(signIn, {
    onError: ({ error: { serverError, validationErrors } }) => {
      if (serverError) {
        toast({
          variant: "destructive",
          title: serverError.title,
          description: serverError.description,
        });
      }
      if (validationErrors) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "Please check your input",
        });
      }
    },
    onSuccess: ({ input }) => {
      toast({
        title: "Hooray!",
        description: `Welcome ${input.email}!`,
      });
    },
  });

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInFormValues) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder="Enter your password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isLoading={isExecuting} type="submit">
          Submit
        </SubmitButton>
      </form>
    </Form>
  );
}

export default SignInForm;

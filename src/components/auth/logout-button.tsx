"use client";

import { logOut } from "@/lib/server-actions";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "@/components/submit-button";

function LogoutButton() {
  const { toast } = useToast();
  
  const { execute, isExecuting } = useAction(logOut, {
    onError: ({ error: { serverError } }) => {
      toast({
        variant: "destructive",
        description:
          serverError?.description ||
          "why is there no serverError description?",
      });
    },
    onSuccess: () => {
      toast({
        description: "Logout Successful",
      });
    },
  });

  return (
    <SubmitButton onClick={() => execute()} isLoading={isExecuting}>
      Logout
    </SubmitButton>
  );
}

export default LogoutButton;

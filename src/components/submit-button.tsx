import React from "react";
import { Button, ButtonProps } from "./ui/button";
import LoadingSpinner from "./ui/loading-spinner";

type SubmitButton = {
    isLoading: boolean;
    children: React.ReactNode;
    icon?: boolean;
} & ButtonProps;

function SubmitButton({
    isLoading,
    children,
    className,
    disabled,
    icon = false,
    ...props
}: SubmitButton) {
    return (
        <Button
            className={className}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <LoadingSpinner />
                    {icon === false && <p className="pl-2">Loading..</p>}
                </>
            ) : (
                <p>{children}</p>
            )}
        </Button>
    );
}

export default SubmitButton;

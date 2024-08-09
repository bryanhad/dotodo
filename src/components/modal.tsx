import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogProps } from "@radix-ui/react-dialog";
import React from "react";

type BaseProps = {
    title?: string;
    desc?: string;
    children: React.ReactNode;
    ariaDescription: string;
} & DialogProps;

type Props =
    | (BaseProps & { customButton: React.ReactNode; buttonText?: never })
    | (BaseProps & { customButton?: never; buttonText: string });

function Modal({
    buttonText,
    customButton,
    children,
    desc,
    title,
    ariaDescription,
    ...props
}: Props) {
    return (
        <Dialog {...props}>
            {customButton && (
                <DialogTrigger className="cursor-pointer" asChild>
                    {customButton}
                </DialogTrigger>
            )}
            {buttonText && (
                <DialogTrigger className="cursor-pointer" asChild>
                    <Button variant="outline">{buttonText}</Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-md">
                {title && (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                )}

                {desc && (
                    <DialogHeader>
                        <DialogDescription>{desc}</DialogDescription>
                    </DialogHeader>
                )}

                {children}
                <DialogDescription
                    aria-describedby={ariaDescription}
                    hidden
                ></DialogDescription>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;

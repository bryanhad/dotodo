import { ScrollArea as ScrollAreaShadCN } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
    title?: string;
    children: React.ReactNode;
    className?: string;
};

function ScrollArea({ title, children, className }: Props) {
    return (
        <ScrollAreaShadCN
            className={cn("h-72", className)}
        >
            <div>
                {title && (
                    <h4 className="mb-4 text-sm font-medium leading-none">
                        {title}
                    </h4>
                )}
                {children}
            </div>
        </ScrollAreaShadCN>
    );
}

export default ScrollArea;

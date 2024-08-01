import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

type Props = {
    className?: string
    size?: number
}

function LoadingSpinner({ className, size = 15 }: Props) {
    return (
        <LoaderCircle
            size={size}
            className={cn("shrink-0 animate-spin", className)}
        />
    )
}

export default LoadingSpinner

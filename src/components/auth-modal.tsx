type Props = {
    title: string
    children: React.ReactNode
}

function AuthModal({ title, children }: Props) {
    return (
        <div className="rounded-md border border-input p-5 ">
            <h1 className="font-semibold text-xl">{title}</h1>
            {children}
        </div>
    )
}

export default AuthModal

"use client";

import { Session, User } from "lucia";
import { createContext, useContext } from "react";

type SessionContenxt = {
    session: Session;
    user: User;
};

export const sessionContext = createContext<SessionContenxt | null>(null);

type Props = React.PropsWithChildren<{ value: SessionContenxt }>;

function SessionProvider({ value, children }: Props) {
    return (
        <sessionContext.Provider value={value}>
            <>{children}</>
        </sessionContext.Provider>
    );
}

export default SessionProvider;

export function useSession() {
    const session = useContext(sessionContext);

    if (!session) {
        // this error can only occure if the dev (myself) forgor that I use the useSession outside of the children scope of SessionProvider!
        throw new Error(
            "Can only call useSession inside the scope of SessionProvider",
        );
    }

    return session;
}

"use client";

import { Session, User } from "lucia";
import { createContext, useContext } from "react";

type CurrencyContext = {
    
};  

export const currencyContext = createContext<CurrencyContext | null>(null);

type Props = React.PropsWithChildren<{ value: CurrencyContext }>;

function CurrencyProvider({ value, children }: Props) {
    return (
        <currencyContext.Provider value={value}>
            <>{children}</>
        </currencyContext.Provider>
    );
}

export default CurrencyProvider;

export function useCurrency() {
    const session = useContext(currencyContext);

    if (!session) {
        // this error can only occure if the dev (myself) forgor that I use the useSession outside of the children scope of CurrencyProvider!
        throw new Error(
            "Can only call useSession inside the scope of CurrencyProvider",
        );
    }

    return session;
}

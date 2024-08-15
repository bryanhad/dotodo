import { Lucia, Session, User } from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import db from "./lib/db"
import { cookies } from "next/headers"
import { cache } from "react"

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            id: attributes.id,
            username: attributes.username,
            avatarUrl: attributes.avatarUrl,
            displayName: attributes.displayName,
        }
    },
})

export const validateRequest = cache(
    async() : Promise<{user: User, session: Session} | {user:null, session: null}> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
        if (!sessionId) {
            return {
                user: null,
                session: null
            }
        }
        const res = await lucia.validateSession(sessionId)
        // nextjs throws when you attempt to set a cookie when rendering a page!
        try {
            if (res.session && res.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(res.session.id)
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
            }
            if (!res.session) {
                const sessionCookie = lucia.createBlankSessionCookie()
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
            }
        } catch (err) {}
        return res
    }
)

export const mustAuthenticated = cache(async () => {
    const res = await validateRequest();
    if (!res.user) {
        throw new Error("Authentication Error");
    }
    return res;
});


declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    id: string
    username: string
    avatarUrl: string | null
    displayName: string | null
}

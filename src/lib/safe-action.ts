import { validateRequest } from "@/auth";
import {
    createSafeActionClient,
    DEFAULT_SERVER_ERROR_MESSAGE,
    DVES,
} from "next-safe-action";
import { z } from "zod";

export class ActionError extends Error {
    title: string;

    constructor(message: string, title: string = "Oh Noose!") {
        super(message);
        this.title = title;
    }
}

type MyServerError = {
    description: string;
    title: string;
};

const metadataSchema = z.object({ actionName: z.string() });

export const actionClient = createSafeActionClient<
    DVES | undefined,
    MyServerError,
    typeof metadataSchema
>({
    handleReturnedServerError: (err, util) => {
        console.error(err);
        switch (true) {
            case err instanceof ActionError:
                return { description: err.message, title: err.title };
            default:
                return {
                    description: DEFAULT_SERVER_ERROR_MESSAGE,
                    title: "Server Error",
                };
        }
    },
    defineMetadataSchema() {
        return z.object({ actionName: z.string() });
    },
}).use(async ({ next, metadata, clientInput }) => {
    // await the action's execution that will be passed to this client instance
    const resultOfAction = await next();

    // TODO: use Winston or Pino for better logging!
    console.log({
        METADATA: metadata,
        CLIENT_INPUT: clientInput,
        RESULT: resultOfAction,
    });
    return resultOfAction;
});

export const authenticatedActionClient = actionClient.use(async ({ next }) => {
    const { user } = await validateRequest();

    if (!user) {
        throw new ActionError("You are not authorized", "Authorization Error");
    }

    return next({ ctx: { user } });
});

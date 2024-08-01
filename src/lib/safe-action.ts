import {
    createSafeActionClient,
    DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action"

export class CustomError extends Error {
    title: string

    constructor(message: string, title: string = "Oh Noose!") {
        super(message)
        this.title = title
    }
}

export const actionClient = createSafeActionClient({
    handleReturnedServerError: (err, util) => {
        switch (true) {
            case err instanceof CustomError:
                return { description: err.message, title: err.title }             
            default:
                return { description: DEFAULT_SERVER_ERROR_MESSAGE }
        }
    },
})

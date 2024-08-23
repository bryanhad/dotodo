import { validateRequest } from "@/auth";
import AuthModal from "@/components/auth-modal";
import LogoutButton from "@/components/auth/logout-button";
import SignInForm from "@/components/auth/sign-in-form";
import SignUpForm from "@/components/auth/sign-up-form";
import CreateIssue from "./(main)/_components/issue/create-issue";
import { TodoFormProvider } from "./(main)/_components/issue/context";

export default async function Home() {
    const { user } = await validateRequest();

    return (
        <div className="space-y-4 p-6">
            <div className="grid grid-cols-2 gap-6">
                {!user ? (
                    <>
                        <AuthModal title="Sign Up">
                            <SignUpForm />
                        </AuthModal>
                        <AuthModal title="Sign In">
                            <SignInForm />
                        </AuthModal>
                    </>
                ) : (
                    <>
                        <TodoFormProvider>
                            <CreateIssue />
                        </TodoFormProvider>
                        {/* <AuthModal title="Logout">
                            <LogoutButton />
                        </AuthModal> */}
                    </>
                )}
            </div>
        </div>
    );
}

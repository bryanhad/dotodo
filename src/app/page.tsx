import { validateRequest } from "@/auth";
import AuthModal from "@/components/auth-modal";
import LogoutButton from "@/components/auth/logout-button";
import SignInForm from "@/components/auth/sign-in-form";
import SignUpForm from "@/components/auth/sign-up-form";
import CreateTodo from "./(main)/_components/create-todo";

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
                        <CreateTodo />
                        <AuthModal title="Logout">
                            <LogoutButton />
                        </AuthModal>
                    </>
                )}
            </div>
        </div>
    );
}

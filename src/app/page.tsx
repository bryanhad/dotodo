import { validateRequest } from "@/auth";
import AuthModal from "@/components/auth-modal";
import LogoutButton from "@/components/logout-button";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <div className="space-y-4 p-6">
      <div className="grid grid-cols-2 gap-6">
        {!user && (
          <AuthModal title="Sign Up">
            <SignUpForm />
          </AuthModal>
        )}
        {!user ? (
          <AuthModal title="Sign In">
            <SignInForm />
          </AuthModal>
        ) : (
          <AuthModal title="Logout">
            <LogoutButton />
          </AuthModal>
        )}
      </div>
    </div>
  );
}

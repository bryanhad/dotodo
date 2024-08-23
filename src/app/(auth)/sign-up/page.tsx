import { Metadata } from "next";
import SignUpImage from '@/assets/signup-image.jpg'
import Image from "next/image";

export const metadata: Metadata = {
    title: "Sign Up",
};

function SignUpPage() {
    return (
        <main className="flex h-screen items-center justify-center p-5">
            <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-xl bg-card">
              <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
                <div>
                  
                </div>
              </div>
              <Image
                src={SignUpImage}
                alt="sign up thumbnail"
                className="w-1/2 hidden md:block object-cover"
              />
            </div>
        </main>
    );
}

export default SignUpPage;

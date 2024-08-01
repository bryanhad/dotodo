import AuthModal from '@/components/auth-modal'
import SignInForm from '@/components/sign-in-form'
import React from 'react'

function LoginPage() {
  return (
    <div className="space-y-4 p-6">
        <AuthModal title='Sign In'>
          <SignInForm />
            </AuthModal>     
    </div>
  )
}

export default LoginPage
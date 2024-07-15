'use client'

import { useState } from 'react'

import SignUpForm from '@/view/auth/components/forms/sign-up-form'
import VerifyOTPScene from '@/view/auth/pages/sign-up/components/verify-OTP-scene'

function SignupPageView() {
	const [resgiterState, setRegisterState] = useState<'LOGIN_FORM' | 'VERIFY_OTP'>('LOGIN_FORM')

	const handleUpdateRegisterState = (_state: 'LOGIN_FORM' | 'VERIFY_OTP') => {
		setRegisterState(_state)
	}

	if (resgiterState === 'LOGIN_FORM') {
		return <SignUpForm handleUpdateRegisterState={handleUpdateRegisterState} />
	}
	if (resgiterState === 'VERIFY_OTP') {
		return <VerifyOTPScene />
	}

	return <>Loading...</>
}

export default SignupPageView

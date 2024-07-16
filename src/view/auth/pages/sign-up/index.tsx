'use client'

import { useState } from 'react'

import SignUpForm from '@/view/auth/components/forms/sign-up-form'
import VerifyOTPScene from '@/view/auth/pages/sign-up/components/verify-OTP-scene'

function SignupPageView() {
	const [registerState, setRegisterState] = useState<'LOGIN_FORM' | 'VERIFY_OTP'>('LOGIN_FORM')

	const handleUpdateRegisterState = (_state: 'LOGIN_FORM' | 'VERIFY_OTP') => {
		setRegisterState(_state)
	}

	if (registerState === 'LOGIN_FORM') {
		return <SignUpForm handleUpdateRegisterState={handleUpdateRegisterState} />
	}
	if (registerState === 'VERIFY_OTP') {
		return <VerifyOTPScene />
	}

	return <>Loading...</>
}

export default SignupPageView

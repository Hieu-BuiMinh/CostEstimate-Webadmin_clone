'use client'

import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { useEffect, useState } from 'react'
import { useCountdown } from 'usehooks-ts'

import OTPComponent from '@/components/OTP-component'
import { useRegisterValidateOTP } from '@/view/auth/hooks/useRegisterValidateOTP'
import { useRegiterResetOTP } from '@/view/auth/hooks/useRegiterResetOTP'
import { useReristerFormStore } from '@/view/auth/stores'

function VerifyOTPScene() {
	const otpLength = 6

	const { mutate: handleResetOTP } = useRegiterResetOTP()
	const { mutate: handleValidateOTP } = useRegisterValidateOTP()

	const { userRegisterForm } = useReristerFormStore()

	const [otp, setOtp] = useState<string>('')
	const [count, { startCountdown, resetCountdown }] = useCountdown({
		countStart: 60 * 3,
		intervalMs: 10,
	})

	const handleChangeOtpvalue = (value: string) => {
		setOtp(value)
	}

	const handleResendOtp = () => {
		handleResetOTP({ _userId: userRegisterForm.userId })
		resetCountdown()
		startCountdown()
	}

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
	}

	useEffect(() => {
		if (otp.length === otpLength) {
			handleValidateOTP({ codeOTP: otp, userId: userRegisterForm.userId })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [otp])

	useEffect(() => {
		startCountdown()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-4">
			<OTPComponent setOtpValue={handleChangeOtpvalue} numInputs={otpLength} />
			<p className="text-center font-medium">Time left: {formatTime(count)} s</p>

			<section className="flex flex-col items-center justify-center gap-2">
				<span className="max-w-[400px] text-center text-sm">
					An OTP has been sent to your email address. Please enter the OTP above to verify your identity.
				</span>
				<span className="font-semibold text-blue-600">{userRegisterForm.email}</span>
			</section>
			{count === 0 && <ButtonComponent onClick={handleResendOtp}>Resend OTP</ButtonComponent>}
		</div>
	)
}

export default VerifyOTPScene

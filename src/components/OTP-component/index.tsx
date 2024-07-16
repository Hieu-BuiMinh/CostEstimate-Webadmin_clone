import { memo, useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'

interface IOTPComponent {
	setOtpValue: (e: string) => void
	defaultValue?: string | undefined
	numInputs?: number
}

function OTPComponent({ setOtpValue, numInputs, defaultValue }: IOTPComponent) {
	const [otp, setOtp] = useState('')

	useEffect(() => {
		setOtpValue(otp)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [otp])

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<p className="text-center text-2xl font-medium uppercase text-[var(--color-surface-999)]">Enter OTP Code</p>
			<OTPInput
				value={defaultValue || otp}
				onChange={setOtp}
				numInputs={numInputs || 4}
				renderSeparator=""
				renderInput={(props) => (
					<input
						{...props}
						type="number"
						className="otp-input m-2 !size-10 rounded border outline-none max-sm:!size-8"
					/>
				)}
			/>
		</div>
	)
}

export default memo(OTPComponent)

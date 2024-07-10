'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import AuthSignupWithGoogleForm from '@/view/auth/components/forms/sign-up-GG-form'
import { useLoginWithGoogle } from '@/view/auth/hooks/useLoginWithGoogle'

function Page() {
	const { data: session } = useSession()
	console.log('session')
	const { mutate: handleLoginWithGG, data: loginWithGGData } = useLoginWithGoogle()

	useEffect(() => {
		if (session?.user?.email) {
			console.log(session)
			handleLoginWithGG(session?.user?.email)
			// handleLoginWithGG('noc44369@ilebi12345.com')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session?.user?.email])

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			{loginWithGGData?.data !== null && (
				<div>
					<span>Authenticating...</span>
					<p>{session?.user?.email}</p>
				</div>
			)}
			{loginWithGGData?.data === null && <AuthSignupWithGoogleForm />}
		</div>
	)
}

export default Page

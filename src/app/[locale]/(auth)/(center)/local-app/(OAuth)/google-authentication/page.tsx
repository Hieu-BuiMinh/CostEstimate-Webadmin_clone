'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import FallbackImage from '@/components/fallback-image'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import AuthSignupWithGoogleForm from '@/view/auth/components/forms/sign-up-GG-form'
import { useLoginWithGoogle } from '@/view/auth/hooks/useLoginWithGoogle'

function Page() {
	const { data: session } = useSession()
	const device = useResponsiveDevice()
	const { mutate: handleLoginWithGG, data: loginWithGGData } = useLoginWithGoogle()

	useEffect(() => {
		if (session?.user?.email) {
			handleLoginWithGG(session?.user?.email)
			// handleLoginWithGG('noc44369@ilebi12345.com')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session?.user?.email])

	return (
		<>
			<div
				className={clsx(
					{
						'flex w-[385px] flex-col gap-6 rounded border-none bg-[var(--color-template-bg)] p-3': true,
					},
					{ 'w-screen h-screen max-w-none': device === 'mobile' }
				)}
			>
				{loginWithGGData?.data !== null && (
					<div className="flex flex-col items-center gap-4">
						<Image
							width={10}
							height={10}
							alt="gg_logo"
							src="/assets/images/logo/google_full_logo.svg"
							style={{ width: 100 }}
							className="shrink-0"
						/>
						<div className="text-center text-xl font-semibold">
							<span>Hi {session?.user?.name}</span>
						</div>
						<div className="flex max-w-full items-center justify-between gap-2 rounded-full border px-2 py-1 shadow">
							<FallbackImage
								src={session?.user?.image || ''}
								alt="auth_form_header_img"
								width={30}
								height={30}
								className="h-auto rounded-full border"
							/>
							<span className="truncate">{session?.user?.email}</span>
							<span className="size-5 shrink-0 animate-spin rounded-full border-4 border-r-green-300" />
						</div>
						<span className="truncate">Just a moment...</span>
					</div>
				)}
			</div>
			{loginWithGGData?.data === null && <AuthSignupWithGoogleForm />}
		</>
	)
}

export default Page

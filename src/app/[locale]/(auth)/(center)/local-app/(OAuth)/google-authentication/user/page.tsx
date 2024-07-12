'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

import { APP_ROUTER } from '@/common/config'
import FallbackImage from '@/components/fallback-image'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'

function Page() {
	const { data: session } = useSession()
	const router = useRouter()
	const device = useResponsiveDevice()

	useEffect(() => {
		router.push(
			`${APP_ROUTER.paths.center.localApp.children.signinWithGoogle.path}/user?email=${session?.user?.email}`
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session?.user?.email])

	return (
		<div
			className={clsx(
				{
					'flex w-[385px] flex-col gap-6 rounded border-none bg-[var(--color-template-bg)] p-3': true,
				},
				{ 'w-screen h-screen max-w-none': device === 'mobile' }
			)}
		>
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
						className="h-auto rounded-full"
						defaultImageEmpty="/assets/auth/imgs/gg_icon.svg"
					/>
					<span className="truncate">{session?.user?.email}</span>
					{!session && (
						<span className="size-5 shrink-0 animate-spin rounded-full border-4 border-r-green-300" />
					)}
				</div>
				{!session && <span className="truncate">Just a moment...</span>}
			</div>
		</div>
	)
}

export default Page

'use client'

import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { APP_ROUTER } from '@/common/config'

function LocalAppOAuth() {
	const router = useRouter()

	const handleGGLoginBtnClick = () => {
		signIn('google', { callbackUrl: APP_ROUTER.paths.center.signinWithGoogle.path, redirect: false })
	}
	const handleAutoDeskLoginBtnClick = () => {
		router.push(APP_ROUTER.paths.center.localApp.children.signinWithAutodesk.path)
	}

	return (
		<section className="login-section gap-2">
			<div className="flex w-full items-center justify-center gap-3">
				<ButtonComponent onClick={handleGGLoginBtnClick} type="button" className="e-normal h-[33px] w-[145px]">
					<div className="flex items-center gap-3">
						<Image
							src="/assets/auth/imgs/gg_icon.svg"
							alt="auth_form_header_img"
							width={20}
							height={20}
							className="h-auto"
						/>
						<span className="truncate">Google</span>
					</div>
				</ButtonComponent>
				<ButtonComponent
					onClick={handleAutoDeskLoginBtnClick}
					type="button"
					className="e-normal h-[33px] w-[145px]"
				>
					<div className="flex items-center gap-3">
						<Image
							src="/assets/auth/imgs/autodesk_icon.svg"
							alt="auth_form_header_img"
							width={20}
							height={20}
							className="h-auto"
						/>
						<span className="truncate">Autodesk</span>
					</div>
				</ButtonComponent>
			</div>
		</section>
	)
}

export default LocalAppOAuth

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { useAuthLogin } from '@/view/auth/hooks'
import { type ILoginRequestDto } from '@/view/auth/types'
import { LoginFormValidation } from '@/view/auth/validations'

type LoginFormFields = z.infer<typeof LoginFormValidation>

function AuthLoginForm() {
	const router = useRouter()

	const { mutate: handleLogin, isSuccess, isPending } = useAuthLogin()

	const methods = useForm<LoginFormFields>({ resolver: zodResolver(LoginFormValidation) })

	const onSubmit: SubmitHandler<LoginFormFields> = (formData) => {
		handleLogin(formData as unknown as ILoginRequestDto)
	}

	const formFields = [
		{ type: 'text', name: 'usernameOrEmail', placeholder: 'Enter username or email' },
		{ type: 'text', name: 'password', placeholder: 'Enter password' },
		{ type: 'checkbox', name: 'remember', label: 'Remeber me' },
	]

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			methods.reset()
			router.push(APP_ROUTER.paths.admin.dashboard.path)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="my-form flex max-w-[385px] flex-col gap-6 rounded border bg-[var(--color-login-form-bg)] p-3"
			>
				<section className="login-section h-[93px] !py-0">
					<Image
						src="/assets/auth/imgs/auth_form_header_img.png"
						alt="auth_form_header_img"
						width={40}
						height={10}
						className="h-auto"
					/>
					<p className="text-2xl font-medium uppercase text-[var(--color-surface-999)]">
						Sign in to your account
					</p>
				</section>

				<section className="login-section gap-4">
					{formFields.map((field) => {
						return (
							<div key={field.name} className="flex w-full flex-col gap-2">
								<RHFDynamicInput
									name={field.name}
									type={field.type as 'text' | 'checkbox' | 'radio'}
									placeholder={field?.placeholder}
									label={field?.label}
								/>
							</div>
						)
					})}
					<Link
						className="justify-start text-sm font-semibold text-[var(--color-text-link)]"
						href={APP_ROUTER.paths.center.signUp.path}
					>
						Don&apos;t have an account?
					</Link>

					<ButtonComponent disabled={isPending} type="submit" className="e-primary w-full">
						SUBMIT
					</ButtonComponent>

					<Link
						className="w-full text-sm font-semibold text-[var(--color-text-link)]"
						href={APP_ROUTER.paths.center.forgotPassword.path}
					>
						Forgot your password?
					</Link>
				</section>

				{/* <section className="login-section gap-2 border-t">
				<span className="text-center">Or continue with</span>
				<div className="flex w-full items-center justify-center gap-3">
					<ButtonComponent className="e-normal h-[33px] w-[145px]">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/auth/imgs/gg_icon.svg"
								alt="auth_form_header_img"
								width={20}
								height={20}
								className="h-auto"
							/>
							<span>Google</span>
						</div>
					</ButtonComponent>
					<ButtonComponent className="e-normal h-[33px] w-[145px]">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/auth/imgs/git_icon.svg"
								alt="auth_form_header_img"
								width={20}
								height={20}
								className="h-auto"
							/>
							<span>Github</span>
						</div>
					</ButtonComponent>
				</div>
			</section> */}
			</form>
		</FormProvider>
	)
}

export default AuthLoginForm

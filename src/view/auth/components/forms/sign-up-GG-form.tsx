'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import FallbackImage from '@/components/fallback-image'
import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import { useSignupWithGoogle } from '@/view/auth/hooks/useSignupWithGoogle'
import { SetGooglePasswordFormValidation } from '@/view/auth/validations'

type SetGooglePasswordFormFields = z.infer<typeof SetGooglePasswordFormValidation>

function AuthSignupWithGoogleForm() {
	const { data: session } = useSession()
	const translate = useTranslations('Page.Auth.SigninWithGG')
	const button = useTranslations('Common.Button')
	const device = useResponsiveDevice()

	const { mutate: handleSignup } = useSignupWithGoogle()

	const methods = useForm<SetGooglePasswordFormFields>({ resolver: zodResolver(SetGooglePasswordFormValidation) })

	const onSubmit: SubmitHandler<SetGooglePasswordFormFields> = (formData: SetGooglePasswordFormFields) => {
		const data = {
			email: session?.user?.email || '1cet22909@tccho.com',
			...formData,
		}
		handleSignup(data)
	}
	const formFields = [
		{
			type: 'group',
			name: 'authname',
			children: [
				{
					type: 'text',
					name: 'firstName',
					label: translate('firstname_label'),
					required: true,
					placeholder: translate('firstname_placeholder'),
					defaultValue: session?.user?.name,
				},
				{
					type: 'text',
					name: 'lastName',
					label: translate('lastname_label'),
					required: true,
					placeholder: translate('lastname_placeholder'),
				},
			],
		},
		{
			type: 'text',
			name: 'username',
			placeholder: translate('username_placeholder'),
			label: translate('username_label'),
			required: true,
		},
	]

	if (!session?.user?.email) {
		redirect(APP_ROUTER.paths.center.signIn.path)
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={clsx(
					{
						'flex w-[385px] flex-col gap-6 rounded border bg-[var(--color-template-bg)] p-3': true,
					},
					{ 'w-screen h-screen max-w-none': device === 'mobile' }
				)}
			>
				<section className="login-section min-h-[93px] !py-0">
					<FallbackImage
						src={session?.user?.image || ''}
						alt="auth_form_header_img"
						width={60}
						height={60}
						className="h-auto rounded-full border "
					/>
					<div className="flex flex-col items-center justify-center">
						<span className="text-md max-w-[360px] truncate text-center">{session?.user?.email}</span>
						<p className="text-center text-2xl font-medium uppercase text-[var(--color-surface-999)]">
							{/* Sign in to your account */}
							{translate('meta_title')}
						</p>
					</div>
				</section>

				<section className="flex flex-col gap-5">
					{formFields.map((field): any => {
						if (field.type === 'group') {
							return (
								<div key={field.name} className="grid grid-cols-2 gap-3">
									{field?.children?.map((child) => {
										return (
											<div key={child.name} className="flex w-full flex-col gap-1">
												<RHFDynamicInput
													name={child.name}
													type={child.type as 'text' | 'checkbox' | 'radio'}
													label={child?.label}
													placeholder={child?.placeholder}
													required={child?.required}
													defaultValue={child?.defaultValue || ''}
												/>
											</div>
										)
									})}
								</div>
							)
						}

						return (
							<div key={field.name} className="flex w-full flex-col gap-1">
								<RHFDynamicInput
									name={field.name}
									type={field.type as 'text' | 'checkbox' | 'radio'}
									label={field?.label}
									placeholder={field?.placeholder}
									required={field?.required}
								/>
							</div>
						)
					})}
					<ButtonComponent type="submit" className="e-primary my-2 w-full">
						{button('submit')}
					</ButtonComponent>
				</section>
			</form>
		</FormProvider>
	)
}

export default AuthSignupWithGoogleForm

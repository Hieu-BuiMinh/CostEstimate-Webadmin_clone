'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
// import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import { ChangePasswordFormValidation } from '@/view/auth/validations'

import useUserChangePassword from '../hooks/useUserResetPassword'

type ResetPasswordFormFields = z.infer<typeof ChangePasswordFormValidation>

function ChangePasswordPageView() {
	const translate = useTranslations('ChangePassword')
	const button = useTranslations('Button')
	// const router = useRouter()
	const device = useResponsiveDevice()
	const { mutate: handleChangePassword, isSuccess, isPending, data: resetPasswordData } = useUserChangePassword()

	const methods = useForm<ResetPasswordFormFields>({ resolver: zodResolver(ChangePasswordFormValidation) })

	const onSubmit: SubmitHandler<ResetPasswordFormFields> = (formData: any) => {
		handleChangePassword(formData)
		// console.log(formData);
	}

	const formFields = [
		{
			type: 'text',
			name: 'OldPassword',
			placeholder: translate('placeholder_current_password'),
			label: translate('title_current_password'),
			required: true,
		},
		{
			type: 'text',
			name: 'NewPassword',
			placeholder: translate('placeholder_new_password'),
			label: translate('title_new_password'),
			required: true,
		},
		{
			type: 'text',
			name: 'RepeatPassword',
			placeholder: translate('placeholder_confirm_password'),
			label: translate('title_confirm_password'),
			required: true,
		},
	]

	useEffect(() => {
		if (resetPasswordData?.statusCode === 200) {
			methods.reset()
			// router.push(APP_ROUTER.paths.center.signIn.path)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={clsx(
					{
						'flex max-w-[385px] flex-col gap-6 rounded border bg-[var(--color-login-form-bg)] p-3': true,
					},
					{ 'w-screen h-screen max-w-none': device === 'mobile' }
				)}
			>
				<section className="login-section h-[20px] !py-0">
					<p className="text-2xl font-medium uppercase text-[var(--color-surface-999)]">
						{translate('meta_title')}
					</p>
				</section>

				<section className="login-section gap-4">
					{formFields.map((field) => {
						return (
							<div key={field.name} className="flex w-full flex-col gap-2">
								<RHFDynamicInput
									name={field.name}
									type={field.type as 'text'}
									placeholder={field.placeholder}
									label={field?.label}
									required={field?.required}
								/>
							</div>
						)
					})}
					<ButtonComponent disabled={isPending} type="submit" className="e-primary w-full">
						{button('update')}
					</ButtonComponent>
				</section>
			</form>
		</FormProvider>
	)
}

export default ChangePasswordPageView

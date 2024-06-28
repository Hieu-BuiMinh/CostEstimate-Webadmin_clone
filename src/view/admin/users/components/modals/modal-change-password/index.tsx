// import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useTranslations } from 'next-intl'
import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import useUserChangePassword from '@/view/admin/users/hooks/useUserResetPassword'
import { ChangePasswordFormValidation } from '@/view/auth/validations'

type ResetPasswordFormFields = z.infer<typeof ChangePasswordFormValidation>
interface IModalConfirmContent {
	onClose: () => void
}
function ModalChangePasswordContent({ onClose }: IModalConfirmContent) {
	// const translate = useTranslations('U')
	// const translate = useTranslations('Page.User.UserDetail')
	const accessToken = Cookies.get('accessToken')

	const translate = useTranslations('Page.User.ChangePassword')
	const button = useTranslations('Common.Button')
	// const router = useRouter()
	const device = useResponsiveDevice()
	const { mutate: handleChangePassword, isPending } = useUserChangePassword()

	const methods = useForm<ResetPasswordFormFields>({ resolver: zodResolver(ChangePasswordFormValidation) })

	const onSubmit: SubmitHandler<ResetPasswordFormFields> = (formData: any) => {
		handleChangePassword(formData)
		// console.log(formData);
	}

	let userId = ''
	if (accessToken) {
		const decoded: { [key: string]: any } = jwtDecode(accessToken)
		userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
	}
	// console.log(userId)
	// const { data: userData, isLoading: userDataIsLoading } = useGetUserById(userId)

	// console.log(userId, userData)
	// const { data: userData, isLoading: userDataIsLoading } = useGetUserById(params.get('id') || '')

	const formFields = [
		{
			type: 'hidden',
			name: 'userId',
			defaultValue: userId,
		},
		{
			type: 'password',
			name: 'OldPassword',
			placeholder: translate('placeholder_current_password'),
			label: translate('title_current_password'),
			required: true,
		},
		{
			type: 'password',
			name: 'NewPassword',
			placeholder: translate('placeholder_new_password'),
			label: translate('title_new_password'),
			required: true,
		},
		{
			type: 'password',
			name: 'RepeatPassword',
			placeholder: translate('placeholder_confirm_password'),
			label: translate('title_confirm_password'),
			required: true,
		},
	]

	return (
		<div className="flex flex-col text-[var(--color-surface-999)]">
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className={clsx(
						{
							'flex w-[385px] flex-col gap-6 bg-[var(--color-login-form-bg)]': true,
						},
						{ 'w-screen h-screen max-w-none': device === 'mobile' }
					)}
				>
					<section className="h-[20px] !py-0">
						<div className="flex w-full items-center justify-between gap-3">
							<div className="text-xl font-semibold">{translate('meta_title')}</div>
							<div className="text-xl font-semibold">
								<button
									type="button"
									className="material-symbols-outlined cursor-pointer"
									onClick={onClose}
									style={{ fontSize: 24 }}
								>
									close
								</button>
							</div>
						</div>
					</section>

					<section className="gap-4">
						{formFields.map((field) => {
							return (
								<div key={field.name} className="flex w-full flex-col gap-2 pb-3">
									<RHFDynamicInput
										name={field.name}
										type={field.type as 'password'}
										placeholder={field.placeholder}
										label={field?.label}
										required={field?.required}
										defaultValue={field?.defaultValue}
									/>
								</div>
							)
						})}
						<ButtonComponent disabled={isPending} type="submit" className="e-primary my-2 w-full">
							{button('update')}
						</ButtonComponent>
					</section>
				</form>
			</FormProvider>
		</div>
	)
}

export default ModalChangePasswordContent

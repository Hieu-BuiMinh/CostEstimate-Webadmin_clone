'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'

import { useGetRoleById, useUpdateRole } from '../../../hooks'
import type { IRole, IUpdateRoleInforRequestDto } from '../../../types'
import { UpdateRoleFormValidation } from '../../../validations'

interface IModalConfirmContent {
	onClose: () => void
	dataRole?: IRole
}

type UpdateFormFields = z.infer<typeof UpdateRoleFormValidation>

function ModalRoleUpdateContent({ onClose, dataRole }: IModalConfirmContent) {
	// const translate = useTranslations('U')
	const translate = useTranslations('Page.Role.UpSert')
	const translateButton = useTranslations('Common.Button')
	const methods = useForm<UpdateFormFields>({ resolver: zodResolver(UpdateRoleFormValidation) })
	const device = useResponsiveDevice()

	const roleId = dataRole?.id as string

	const { data: roleData, isLoading: roleDataIsLoading } = useGetRoleById(roleId)
	const { mutate: handleUpdate, isPending } = useUpdateRole()

	const formFields = [
		{
			type: 'hidden',
			name: 'roleId',
			defaultValue: roleId,
		},
		{
			type: 'text',
			name: 'roleName',
			label: translate('label_role_name'),
			required: true,
			placeholder: translate('placeholder_role_name'),
			defaultValue: roleData?.name || '',
		},
	]

	const onSubmit: SubmitHandler<UpdateFormFields> = (_formData) => {
		const data = {
			roleName: _formData.roleName,
			roleId,
		}
		// console.log(_formData)
		handleUpdate(data as IUpdateRoleInforRequestDto)
	}

	if (roleDataIsLoading) {
		return <>{translate('load_data')}</>
	}

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
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
							<div className="text-xl font-semibold">{translate('meta_title_update')}</div>
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
					<div className="gap-4">
						{formFields.map((field) => {
							return (
								<div key={field.name} className="flex w-full flex-col gap-1">
									<RHFDynamicInput
										name={field.name}
										type={field.type as 'text' | 'checkbox' | 'radio'}
										label={field?.label}
										placeholder={field?.placeholder}
										required={field?.required}
										defaultValue={field?.defaultValue}
									/>
								</div>
							)
						})}
					</div>

					<ButtonComponent disabled={isPending} type="submit" className="e-primary my-2 w-full">
						{translateButton('update')}
					</ButtonComponent>
				</form>
			</FormProvider>
		</div>
	)
}

export default ModalRoleUpdateContent

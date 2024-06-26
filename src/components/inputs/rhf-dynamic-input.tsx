import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons'
import { DatePickerComponent, Inject, MaskedDateTime } from '@syncfusion/ej2-react-calendars'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface IRHFDynamicInput {
	type: 'text' | 'radio' | 'checkbox' | 'date' | 'text-area' | 'number' | 'password'
	name: string
	placeholder?: string
	label?: string
	defaultValue?: string | boolean
	required?: boolean
	radioOptions?: { value: string | boolean; label: string; id: string }[]
}

export function RHFDynamicInput({ type, name, ...rest }: IRHFDynamicInput) {
	const translateValidation = useTranslations()
	const { register, formState, control } = useFormContext()
	const [showPassword, setShowPassword] = useState('password')

	const togglePassword = () => {
		setShowPassword(showPassword === 'password' ? 'text' : 'password')
	}

	switch (type) {
		case 'text':
			return (
				<>
					<div className="flex gap-2 text-sm text-[var(--color-surface-800)]">
						{rest?.label} {rest?.required && <span className="text-base font-bold text-red-400">*</span>}
					</div>
					<TextBoxComponent
						placeholder={rest?.placeholder}
						type={name === 'email' ? 'email' : type}
						value={(rest?.defaultValue as string) || ''}
						{...register(name)}
					/>
					{formState.errors[name] && (
						<span className="text-xs text-red-400">
							{translateValidation(formState?.errors[name]?.message as any)}
						</span>
					)}
				</>
			)
		case 'password':
			return (
				<>
					<div className="flex gap-2 text-sm text-[var(--color-surface-800)]">
						{rest?.label} {rest?.required && <span className="text-base font-bold text-red-400">*</span>}
					</div>
					<div className="input-password-overwrite flex gap-2">
						<TextBoxComponent
							type={showPassword}
							value={(rest?.defaultValue as string) || ''}
							{...register(name)}
						/>
						<button
							className="material-symbols-outlined text-[var(--color-surface-999)]"
							type="button"
							onClick={togglePassword}
						>
							{showPassword === 'text' ? 'visibility' : 'visibility_off'}
						</button>
					</div>
					{formState.errors[name] && (
						<span className="text-xs text-red-400">
							{translateValidation(formState?.errors[name]?.message as any)}
						</span>
					)}
				</>
			)
		case 'number':
			return (
				<>
					<div className="flex gap-2 text-sm text-[var(--color-surface-800)]">
						{rest?.label} {rest?.required && <span className="text-base font-bold text-red-400">*</span>}
					</div>
					<TextBoxComponent
						type={type}
						placeholder={rest?.placeholder}
						value={(rest?.defaultValue as string) || ''}
						{...register(name)}
					/>
					{formState.errors[name] && (
						<span className="text-xs text-red-400">
							{translateValidation(formState?.errors[name]?.message as any)}
						</span>
					)}
				</>
			)
		case 'checkbox':
			return (
				<>
					<Controller
						name={name}
						control={control}
						rules={{ required: true }}
						defaultValue={false}
						render={({ field }) => (
							<CheckBoxComponent
								label={rest?.label}
								onChange={(e: any) => field.onChange(e.target.checked)}
								checked={field.value}
							/>
						)}
					/>
					{formState.errors[name] && (
						<span className="text-xs text-red-400">{formState?.errors[name]?.message as string}</span>
					)}
				</>
			)
		case 'radio':
			return (
				<>
					<div className="flex gap-2 text-sm text-[var(--color-surface-800)]">
						{rest?.label} {rest?.required && <span className="text-base font-bold text-red-400">*</span>}
					</div>
					<div className="flex flex-col gap-2">
						{rest.radioOptions?.map((rad) => {
							return (
								<div key={rad.id} className="flex gap-1">
									<input
										{...register(name)}
										id={rad?.id ?? ''}
										name={name}
										type="radio"
										value={rad?.value as string}
										defaultChecked={rest?.defaultValue === rad.id}
									/>
									{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
									<label className="text-sm" htmlFor={rad.id}>
										{rad.label}
									</label>
								</div>
							)
						})}
					</div>
					{formState.errors[name] && (
						<span className="text-xs text-red-400">
							{translateValidation('Validation.User.UpdateUser.isreverse.required_message')}
						</span>
					)}
				</>
			)
		case 'date':
			return (
				<>
					<div className="flex gap-2 text-sm text-[var(--color-surface-800)]">
						{rest?.label} {rest?.required && <span className="text-base font-bold text-red-400">*</span>}
					</div>
					<DatePickerComponent
						{...register(name)}
						format="dd-MM-yyy"
						placeholder={rest?.placeholder}
						enableMask
						maskPlaceholder={{ day: 'DD', month: 'MM', year: 'yyyy' }}
					>
						<Inject services={[MaskedDateTime]} />
					</DatePickerComponent>
					{formState.errors[name] && (
						<span className="text-xs text-red-400">{formState?.errors[name]?.message as string}</span>
					)}
				</>
			)
		case 'text-area':
			return (
				<>
					<div className="flex gap-2 text-sm text-[var(--color-surface-800)]">
						{rest?.label} {rest?.required && <span className="text-base font-bold text-red-400">*</span>}
					</div>
					<TextBoxComponent
						value={(rest?.defaultValue as string) || ''}
						type={type}
						placeholder={rest?.placeholder}
						multiline
						{...register(name)}
					/>
					{formState.errors[name] && (
						<span className="text-xs text-red-400">{formState?.errors[name]?.message as string}</span>
					)}
				</>
			)

		default:
			return <>default</>
	}
}

import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons'
import { DatePickerComponent, Inject, MaskedDateTime } from '@syncfusion/ej2-react-calendars'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { Controller, useFormContext } from 'react-hook-form'

interface IRHFDynamicInput {
	type: 'text' | 'radio' | 'checkbox' | 'date' | 'text-area'
	name: string
	placeholder?: string
	label?: string
	defaultValue?: string | boolean
	radioOptions?: { value: string; label: string; id: string }[]
}

export function RHFDynamicInput({ type, name, ...rest }: IRHFDynamicInput) {
	const { register, formState, control } = useFormContext()

	switch (type) {
		case 'text':
			return (
				<>
					<TextBoxComponent
						type={type}
						placeholder={rest?.placeholder}
						floatLabelType="Always"
						{...register(name)}
					/>
					{formState.errors[name] && (
						<span className="sign-in-error">{formState?.errors[name]?.message as string}</span>
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
						<span className="sign-in-error">{formState?.errors[name]?.message as string}</span>
					)}
				</>
			)
		case 'radio':
			return (
				<>
					<div className="flex gap-2">
						{rest.radioOptions?.map((rad) => {
							return (
								<div key={rad.id} className="flex gap-1">
									<input
										{...register(name)}
										id={rad?.id ?? ''}
										name={name}
										type="radio"
										value={rad?.value}
									/>
									{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
									<label htmlFor={rad.id}>{rad.label}</label>
								</div>
							)
						})}
					</div>
					{formState.errors[name] && (
						<span className="sign-in-error">{formState?.errors[name]?.message as string}</span>
					)}
				</>
			)
		case 'date':
			return (
				<>
					<DatePickerComponent
						{...register(name)}
						format="dd-MM-yyy"
						placeholder={rest?.placeholder}
						floatLabelType="Always"
						enableMask
						maskPlaceholder={{ day: 'DD', month: 'MM', year: 'yyyy' }}
					>
						<Inject services={[MaskedDateTime]} />
					</DatePickerComponent>
					{formState.errors[name] && (
						<span className="sign-in-error">{formState?.errors[name]?.message as string}</span>
					)}
				</>
			)
		case 'text-area':
			return (
				<>
					<TextBoxComponent
						type={type}
						placeholder={rest?.placeholder}
						floatLabelType="Always"
						multiline
						{...register(name)}
					/>
					{formState.errors[name] && (
						<span className="sign-in-error">{formState?.errors[name]?.message as string}</span>
					)}
				</>
			)

		default:
			return <>default</>
	}
}

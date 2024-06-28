import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns'

function ParameterSettingModal() {
	const data: {}[] = [
		{ text: 'Hennessey Venom', id: 'list-01' },
		{ text: 'Bugatti Chiron', id: 'list-02' },
		{ text: 'Bugatti Veyron Super Sport', id: 'list-03' },
		{ text: 'SSC Ultimate Aero', id: 'list-04' },
		{ text: 'Koenigsegg CCR', id: 'list-05' },
	]

	return (
		<div className="grid w-[500px] grid-cols-2 gap-4 max-sm:w-[280px] max-sm:grid-cols-1">
			<section className="col-span-1 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<span>setting</span>
					<div className="flex gap-1">
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							add
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							edit
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							remove
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							content_copy
						</button>
					</div>
				</div>

				<div className="h-[50vh] overflow-y-auto rounded-sm">
					<ListBoxComponent cssClass="h-full" dataSource={data} />
				</div>
			</section>
			<section className="col-span-1 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<span>setting</span>
					<div className="flex gap-1">
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							add
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							edit
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							remove
						</button>
						<button type="button" className="material-symbols-outlined size-6 rounded border !text-sm">
							content_copy
						</button>
					</div>
				</div>

				<div className="h-[50vh] overflow-y-auto rounded-sm">
					<ListBoxComponent cssClass="h-full" dataSource={data} />
				</div>
			</section>
		</div>
	)
}

export default ParameterSettingModal

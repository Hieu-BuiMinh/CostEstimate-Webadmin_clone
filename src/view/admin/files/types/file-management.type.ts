// "id": "c0a2721c-fc00-4ffb-8b45-fcd29163e2c2",
//             "urn": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6czZwdWsxdmhuc3l4d3R6cGQxNHNqYXZlZnJmamJsMnpucmxpeHl3amtuZWx6YWhrLWJhc2ljLWFwcC8yMjI0MS1HaWxlYWQrQjM0Nl9QTC5ydnQ",
//             "guid": "2645b3f3-df79-b866-d377-d7a619eb32a3",
//             "name": "22241-Gilead+B346_PL.rvt",
//             "contentType": null,
//             "isStored": true,
//             "url": null,
//             "createdBy": "00000000-0000-0000-0000-000000000000",
//             "createdDate": "2024-06-27T08:40:19.574766Z"

// get All file data resposne
export interface IGetAllFileResponseDto {
	statusCode: number
	message: string
	data: Param[]
}

interface Param {
	urn: string
	guid: string
	name: string
	createdDate: string
	createdBy: string
	isStored: boolean
	url: string
	contentType: string
}

import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

export const fetchPayloadCollection = createAction({
	name: 'fetch_payload_collection', 
	auth: PieceAuth.None(),
	displayName: 'Fetch Payload Collection',
	description: 'Fetch a collection from Payload CMS',
	props: {
		collection_name: Property.ShortText({
			displayName: 'Collection Name',
			description: 'Name of the collection to fetch from Payload CMS',
			required: true,
		}),
	},
	async run(context) {
		const PAYLOAD_API_URL = 'http://localhost:3000/api'; 
		const accessToken = 'ACCESS_TOKEN'; 

		const collectionName = context.propsValue['collection_name'];

		const response = await httpClient.sendRequest({
			method: HttpMethod.GET,
			url: `${PAYLOAD_API_URL}/collections/${collectionName}`,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		});

		return response.body;
	},
});

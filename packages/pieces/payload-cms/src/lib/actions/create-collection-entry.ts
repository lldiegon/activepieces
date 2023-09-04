import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

export const createPayloadCollectionEntry = createAction({
	name: 'create_payload_collection_entry', 
	auth: PieceAuth.None(),
	displayName: 'Create Payload Collection Entry',
	description: 'Create a new entry in a Payload CMS collection',
	props: {
		collection_slug: Property.ShortText({
			displayName: 'Collection Slug',
			description: 'Slug of the collection where the new entry will be created',
			required: true,
		}),
		title: Property.ShortText({
			displayName: 'Title',
			description: 'Title of the new entry',
			required: true,
		}),
		content: Property.LongText({
			displayName: 'Content',
			description: 'Content of the new entry',
			required: true,
		}),
	},
	async run(context) {
		const PAYLOAD_API_URL = 'http://localhost:3000/api'; 

		const { collection_slug, title, content } = context.propsValue;

		const response = await httpClient.sendRequest({
			method: HttpMethod.POST,
			url: `${PAYLOAD_API_URL}/${collection_slug}`,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				content,
			}),
		});

		return response.body;
	},
});

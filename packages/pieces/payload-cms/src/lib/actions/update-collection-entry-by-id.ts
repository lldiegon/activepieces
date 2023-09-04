import { createAction, Property, PieceAuth } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

export const updatePayloadCollectionEntryById = createAction({
	name: 'update_payload_collection_entry_by_id', 
	auth: PieceAuth.None(),
	displayName: 'Update Payload Collection Entry by ID',
	description: 'Update an existing entry in a Payload CMS collection by its ID',
	props: {
		collection_slug: Property.ShortText({
			displayName: 'Collection Slug',
			description: 'Slug of the collection where the entry exists',
			required: true,
		}),
		id: Property.ShortText({
			displayName: 'Entry ID',
			description: 'ID of the entry to be updated',
			required: true,
		}),
		title: Property.ShortText({
			displayName: 'Title',
			description: 'Updated title of the entry',
			required: true,
		}),
		categories: Property.ShortText({
			displayName: 'Categories',
			description: 'Updated categories for the entry',
			required: false,
		}),
		tags: Property.Object({
			displayName: 'Tags',
			description: 'Updated tags for the entry',
			required: false,
		}),
	},
	async run(context) {
		const PAYLOAD_API_URL = 'http://localhost:3000/api'; // Replace with your Payload CMS API URL

		const { collection_slug, id, title, categories, tags } = context.propsValue;

		const response = await httpClient.sendRequest({
			method: HttpMethod.PATCH,
			url: `${PAYLOAD_API_URL}/${collection_slug}/${id}`,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				categories,
				tags,
			}),
		});

		return response.body;
	},
});


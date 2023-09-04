import { createAction, Property } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";
import { amplenoteAuth } from "../..";

export const createNewNote = createAction({
    name: 'create_new_note',
    auth: amplenoteAuth,
    displayName: 'Create New Note',
    description: 'Create a new note in Amplenote',
    props: {
        name: Property.ShortText({
            displayName: 'Note Name',
            required: true,
        }),
        tags: Property.Array({
            displayName: 'Tags',
            description: 'List of tags to apply to the note',
            required: false,
        }),
    },
    async run(context) {
        const AMPLENOTE_API_URL = "https://api.amplenote.com/v4/";

        const requestBody = {
            name: context.propsValue.name,
            timestamps: {
                created: 0,
                changed: 0,
            },
            tags: context.propsValue.tags,
        };

        const response = await httpClient.sendRequest({
            method: HttpMethod.POST,
            url: `${AMPLENOTE_API_URL}notes`,
            headers: {
                "Authorization": `Bearer ${context.auth}`,
                "Content-Type": "application/json",
            },
            body: requestBody
        });
        return response.body;
    },
});

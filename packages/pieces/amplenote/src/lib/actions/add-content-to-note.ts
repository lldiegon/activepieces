import { createAction, Property } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";
import { amplenoteAuth } from "../..";

export const addContentToNote = createAction({
	name: 'add_content_to_note', 
  auth: amplenoteAuth,
  displayName:'Add Content to Note',
  description: 'Add content to a note in Amplenote',
	props: {
        note_id: Property.ShortText({
            displayName: 'Note ID',
            required: true,
        }),
        title: Property.ShortText({
            displayName: 'Title',
            required: false,
        }),
        content_type: Property.StaticDropdown({
            displayName: 'Content Type',
            description: 'Select the type of content you want to add to the note',
            required: true,
            options: {
                options: [
                    {
                        label: 'Text',
                        value: 'text'
                    },
                    {
                        label: 'Heading',
                        value: 'heading'
                    },
                    {
                        label: 'Blockquote',
                        value: 'blockquote'
                    },
                    {
                        label: 'Link URL',
                        value: 'link_url'
                    },
                    {
                        label: 'Bullet List',
                        value: 'bullet_list_item'
                    },
                    {
                        label: 'Check List',
                        value: 'check_list_item'
                    },
                    {
                        label: 'Bullet List',
                        value: 'bullet_list_item'
                    },
                ]
            }
        }),
        content: Property.LongText({
            displayName: 'Content',
            required: false,
        }),
        link_url: Property.ShortText({
            displayName: 'Link URL',
            required: false,
        }),
        heading_level: Property.Number({
            displayName: 'Heading Level',
            required: false,
        }),
	},
	async run(context) {
        const AMPLENOTE_API_URL = "https://api.amplenote.com/v4/";

        const nodes = [];
        const text = context.propsValue.content;

        if (context.propsValue.content_type === 'paragraph') {
            nodes.push({
                type: "paragraph",
                content: [{ type: "text", text }]
            });
        } else if (context.propsValue.content_type === 'task') {
            nodes.push({
                type: "check_list_item",
                content: [{ type: "paragraph", content: [{ type: "text", text }] }]
            });
        } else if (context.propsValue.content_type === 'bullet') {
            nodes.push({
                type: "bullet_list_item",
                content: [{ type: "paragraph", content: [{ type: "text", text }] }]
            });
        } else if (context.propsValue.content_type === 'link') {
            nodes.push({
                type: "paragraph",
                content: [{
                    type: "link",
                    attrs: { href: context.propsValue.link_url },
                    content: [{ type: "text", text }]
                }]
            });
        } else if (context.propsValue.content_type === 'blockquote') {
            nodes.push({
                type: "blockquote",
                content: [{ type: "paragraph", content: [{ type: "text", text }] }]
            });
        } else if (context.propsValue.content_type === 'heading') {
            nodes.push({
                type: "heading",
                attrs: { level: context.propsValue.heading_level },
                content: [{ type: "text", text }]
            });
        }

        const requestBody: Record<string, unknown> = {
            type: "INSERT_NODES",
            nodes
        };
        

        const response = await httpClient.sendRequest({
            method: HttpMethod.PUT,
            url: `${AMPLENOTE_API_URL}notes/${context.propsValue.note_id}/actions`,
            headers: {
                "Authorization": `Bearer ${context.auth}`,
                "Content-Type": "application/json",
            },
            body: requestBody
        });
        return response.body;
	},
});
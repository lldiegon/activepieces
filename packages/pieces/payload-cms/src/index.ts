
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { fetchPayloadCollection } from "./lib/actions/fetch-collection";
import { createPayloadCollectionEntry } from "./lib/actions/create-collection-entry";

export const payloadCms = createPiece({
  displayName: "Payload-cms",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/payload-cms.png",
  authors: ["lldiegon"],
  actions: [fetchPayloadCollection, createPayloadCollectionEntry],
  triggers: [],
});

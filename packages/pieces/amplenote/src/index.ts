
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { createNewNote } from "./lib/actions/create-note";
import { addContentToNote } from "./lib/actions/add-content-to-note";


export const amplenoteAuth = PieceAuth.OAuth2({
  description: "OAuth2 authentication for Amplenote",
  required: true,
  authUrl: "https://login.amplenote.com/login",
  tokenUrl: "https://api.amplenote.com/oauth/token",
  // clientId: "YOUR_CLIENT_ID",
  // clientsecret can be empty
  // clientSecret: "",
  scope: ["notes:create", "notes:create-content-action", "notes:list"] 
});

export const amplenote = createPiece({
  displayName: "Amplenote",
  auth: amplenoteAuth,
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/amplenote.png",
  authors: ["lldiegon"],
  actions: [createNewNote, addContentToNote],
  triggers: [],
});

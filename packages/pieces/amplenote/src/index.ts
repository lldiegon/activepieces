
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const amplenoteAuth = PieceAuth.SecretText({
  displayName:"API Key",
  required:true,
  description:"API key acquired on request from Amplenote"
})

export const amplenote = createPiece({
  displayName: "Amplenote",
  auth: amplenoteAuth,
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/amplenote.png",
  authors: ["lldiegon"],
  actions: [],
  triggers: [],
});

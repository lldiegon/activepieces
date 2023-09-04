
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const amplenote = createPiece({
  displayName: "Amplenote",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/amplenote.png",
  authors: ["lldiegon"],
  actions: [],
  triggers: [],
});

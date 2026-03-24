import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

/* Ce client fournit :

    authClient.signUp.email() — inscription
    authClient.signIn.email() — connexion
    authClient.signOut() — deconnexion
    authClient.useSession() — hook React pour lire la session
    
 */

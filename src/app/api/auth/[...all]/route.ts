import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);

/* endpoint api pour better auth pour recevoir les requetes d'authentification */

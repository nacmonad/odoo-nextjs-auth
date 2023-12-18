import { NextApiHandler } from "../node_modules/next/dist/shared/lib/utils";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

import sessionConfig from "./session";

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionConfig);
}

export function withSessionSsr(handler: NextApiHandler) {
    return withIronSessionSsr(handler, sessionConfig);
}
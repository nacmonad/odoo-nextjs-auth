import { NextApiRequest } from "./node_modules/next/dist/shared/lib/utils"
import { IronSession } from "../../node_modules/iron-session/dist/index.cjs";
import Odoo from "./node_modules/async-odoo-xmlrpc/lib/index";

export type IronSessionWithOdoo = IronSession & { odoo: Odoo }

export type NextApiRequestWithSession = NextApiRequest & {
    session: IronSessionWithOdoo
}

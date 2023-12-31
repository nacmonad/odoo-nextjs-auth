import { NextApiRequest } from "../../node_modules/next/dist/shared/lib/utils"
import { IronSession } from "../../node_modules/iron-session/dist/index.cjs";
import Odoo from "../../node_modules/async-odoo-xmlrpc/lib/index";


export type Location = {
  latitude: number,
  longitude: number,
}

export interface PointsAppRequest extends NextApiRequest {
  "x-odoo-partner-id": string;
}

export type IronSessionConfig = {
  cookieName: string,
  password: string, // Make sure to use a strong, unique password
  cookieOptions: {
    secure: boolean
  },
  //store
}
export type IronSessionWithOdoo = IronSession<{ odoo: OdooSession, set: (key:string, session: OdooSession )=>void }> 

export type OdooSession = Odoo & { uid?:number, user?:UserOdoo, partner_id?:number, partner?:PartnerOdoo }

export type NextApiRequestWithSession = NextApiRequest & {
    session: IronSessionWithOdoo
}

export interface RssPushSubscription {

}

export interface LoyaltyCardOdoo {
    id: number,
    message_is_follower: boolean,
    message_follower_ids: number[],
    message_partner_ids: number[],
    message_ids: number[],
    has_message: boolean,
    message_needaction: boolean,
    message_needaction_counter: number,
    message_has_error: boolean,
    message_has_error_counter: number,
    message_attachment_count: number,
    rating_ids: number[],
    website_message_ids: number[],
    message_has_sms_error: boolean,
    program_id: (number | string)[],
    program_type: string,
    company_id: (number | string)[],
    currency_id: (number | string)[],
    partner_id: boolean,
    points: number,
    point_name: string,
    points_display: string,
    code: string,
    expiration_date: false | string,
    use_count: number,
    display_name: string,
    create_uid: (number | string)[],
    create_date: string,
    write_uid: (number | string)[],
    write_date: string,
    order_id: boolean | any
  }

  export interface PartnerOdoo {
    id: number;
    complete_name: string;
    is_seo_optimized: boolean;
    website_meta_title: string | false;
    website_meta_description: string | false;
    website_meta_keywords: string | false;
    website_meta_og_img: string | false;
    seo_name: string | false;
    website_id: string | false;
    website_published: boolean | false;
    is_published: boolean | false;
    can_publish: boolean;
    website_url: string;
    message_is_follower: boolean;
    message_follower_ids: number[];
    message_partner_ids: number[];
    message_ids: number[];
    has_message: boolean;
    message_needaction: boolean;
    message_needaction_counter: number;
    message_has_error: boolean;
    message_has_error_counter: number;
    message_attachment_count: number;
    rating_ids: number[];
    website_message_ids: number[];
    message_has_sms_error: boolean;
    email_normalized: string;
    is_blacklisted: boolean;
    message_bounce: number;
    // ... (continue with other properties)
    static_map_url: string | false;
    static_map_url_is_valid: boolean;
    website_description: string | false;
    website_short_description: string | false;
  }
  
  export interface UserOdoo {    
      id: number;
      complete_name: string;
      email_normalized: string;
      partner_id: [ number, string ];
      lang: string;
      tz: string;
      groups_id: number[];
      avatar_128: string;
  }
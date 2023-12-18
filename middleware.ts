import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getIronSession } from 'iron-session';
import sessionConfig from './utils/session';
import { Session } from './node_modules/next-iron-session/lib/index.js';
import { IronSessionWithOdoo } from './types.js';

export async function middleware(req: NextRequest, res:NextResponse) {
  
  try {
/* On Every Route */
    if (!req.nextUrl.pathname.includes('/auth') &&
        req.nextUrl.pathname.startsWith('/api')) {
        
        //return await fetchUserMiddleware(request)
        const session : IronSessionWithOdoo = await getIronSession(req, res, sessionConfig);
        if(!session) return new NextResponse( JSON.stringify({ status: 403, message:"Forbidden"}))
        return NextResponse.next();
    }
    
    /* Redirect example */
        //   if (request.nextUrl.pathname.startsWith('/dashboard')) {

        //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
        //   }
  } catch(e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ status: 500, text: 'Internal Server Error', error:e }));
  }
}
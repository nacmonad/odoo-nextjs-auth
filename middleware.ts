import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import sessionConfig from './src/utils/session';
import { IronSessionWithOdoo } from '@/types';

export async function middleware(req: NextRequest, res:NextResponse) {
  try {
/* On Every Route */
    if (
          req.nextUrl.pathname.startsWith('/api') || 
          req.nextUrl.pathname.startsWith('/dashboard')
        ) {

        //return await fetchUserMiddleware(request)
        const session : IronSessionWithOdoo = await getIronSession(req, res, sessionConfig);
        if(!session) return new NextResponse( JSON.stringify({ status: 403, message:"Forbidden"}))
            
        // Attach the user and partner information to the response for middleware on the server
        // res.locals = {
        //   ...res.locals,
        //   session: {
        //     ...session,
        //   }
        // };
        
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
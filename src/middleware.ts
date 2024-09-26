import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('client_uuid');
  const response = NextResponse.next();

  if (!cookie?.value) {
    response.cookies.set('client_uuid', uuidv4());
    return response;
  }

  return response;
}
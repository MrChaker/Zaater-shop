import { NextResponse } from 'next/server'

export function middleware(req, ev) {
    console.log(NextResponse)
    return new Response('Hello, world!')
  }
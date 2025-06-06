import { destroyCookie } from "nookies";
import Router from "next/router";

export function signOut() {
  destroyCookie(null, '@barber.token', { path: '/' });
  Router.push('/login');
}

export default function({
  app,
  redirect,
  $auth
}) {
  if (!$auth.loggedIn) {
      return redirect('/login');
  }
}

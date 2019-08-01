export default function (ctx) {

  const user = ctx.store.getters["userData/user"];
  if (user) {
    return
  }
  if (ctx.route.path === "/login") {
    console.log("何もしない")
  }

  /*
  * ログイン後にさっきのページに戻りたい
  * https://qiita.com/il-m-yamagishi/items/e8ef44b42f35fa8c2ddb
  * Nuxtのmiddleware上でのredirectには注意
  * https://qiita.com/mr-hisa-child/items/07479a9b51e9e5933ccd
  * */
  if (ctx.route.path!=="/login") {
    const redirectUri = encodeURIComponent(ctx.route.fullPath);
    console.log("===REDIRECT from ", ctx.route.fullPath, " to  /login?redirect_uri=", redirectUri);
    ctx.redirect(`/login?redirect_uri=${redirectUri}`);
  }

}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/test-page") {
      return new Response(
        "Tim's comment moderator is online. No Facebook actions are enabled.",
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }

    if (!env.FACEBOOK_PAGE_TOKEN) {
      return Response.json({ ok: false, error: "Page token secret is missing" });
    }

    const response = await fetch(
      "https://graph.facebook.com/v26.0/me?fields=id,name",
      {
        headers: {
          Authorization: `Bearer ${env.FACEBOOK_PAGE_TOKEN}`
        }
      }
    );

    const page = await response.json();

    if (!response.ok) {
      return Response.json({
        ok: false,
        error: page.error?.message ?? "Facebook request failed"
      });
    }

    return Response.json({
      ok: page.id === "485957924599323",
      page_name: page.name,
      page_id_matches_tims: page.id === "485957924599323"
    });
  }
};

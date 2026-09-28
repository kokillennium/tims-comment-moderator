export default {
  async fetch(request, env) {
    return new Response(
      "Tim's comment moderator is online. No Facebook actions are enabled.",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }
};

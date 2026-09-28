export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/test-ai") {
      return new Response(
        "Tim's comment moderator is online. No Facebook actions are enabled.",
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }

    const examples = [
      {
        label: "Unrelated advertisement",
        comment: "Trust Home Care: home nursing services in Alexandria. Call us on WhatsApp."
      },
      {
        label: "Customer question",
        comment: "بكام الاشتراك في الماراثون"
      }
    ];

    const results = [];

    for (const example of examples) {
      const aiResult = await env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
        messages: [
          {
            role: "system",
            content:
              "You review Arabic and English comments on Tim's Coffee, a coffee shop's Facebook Page. " +
              "Reply with exactly one label: SPAM, CUSTOMER_QUESTION, COMPLAINT, or UNSURE. " +
              "Use SPAM for unrelated advertising or scams. Do not label ordinary questions or criticism as spam."
          },
          {
            role: "user",
            content: example.comment
          }
        ],
        max_tokens: 30,
        temperature: 0
      });

      results.push({
        example: example.label,
        ai_answer: aiResult.response
      });
    }

    return Response.json(results);
  }
};

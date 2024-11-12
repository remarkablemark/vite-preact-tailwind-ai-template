interface Env {
  AI: Ai;
}

const PROMPT = {
  role: 'system',
  content: 'You are a helpful assistant',
} as const;

const MAX_TOKENS = 100;

/**
 * POST /api/inference
 *
 * @param context - Context.
 * @returns - Response.
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { messages } = await context.request.json<{
    messages: RoleScopedChatInput[];
  }>();

  messages.unshift(PROMPT);

  const input: AiTextGenerationInput = {
    max_tokens: MAX_TOKENS,
    messages,
  };

  const output = await context.env.AI.run(
    '@cf/meta/llama-3.1-8b-instruct',
    input,
  );

  return Response.json(output, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

/**
 * OPTIONS /api/inference
 *
 * @returns - Response.
 */
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
    status: 204,
  });
};

const PROMPT = {
  role: 'system',
  content: 'You are a helpful assistant',
} as const;

const MAX_TOKENS = 100;

interface Env {
  AI: Ai;
  NODE_ENV: 'development' | 'preview' | 'production';
}

/**
 * POST /api/chat
 *
 * @param context - Event context.
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

  return Response.json(output, getResponseInit(context));
};

/**
 * OPTIONS /api/chat
 *
 * @param context - Event context.
 * @returns - Response.
 */
export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { ...getResponseInit(context), status: 204 });
};

/**
 * Get response init.
 *
 * @param context - Event context.
 * @returns - Response init.
 */
function getResponseInit(
  context: EventContext<Env, '', unknown>,
): ResponseInit {
  if (context.env.NODE_ENV === 'development') {
    return {
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
}

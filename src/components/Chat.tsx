import { useChat } from 'ai/react';
import clsx from 'clsx';
import { useEffect, useRef } from 'preact/hooks';
import { API_URL, DEV, ID } from 'src/constants';

import Header from './Header';
import SubmitButton from './SubmitButton';

export default function Chat() {
  const messagesRef = useRef<HTMLDivElement>(null);

  // https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot
  // https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
  const { handleInputChange, handleSubmit, input, isLoading, messages } =
    useChat({
      api: `${API_URL}/api/chat`,
      streamProtocol: 'text',

      initialMessages: [
        {
          role: 'assistant',
          content: 'How may I help you?',
          id: ID,
        },
      ],

      onError(error) {
        if (DEV) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      },
    });

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section class="flex h-screen flex-col rounded-xl border shadow sm:h-[70vh]">
      <Header />

      <div class="flex-1 space-y-4 overflow-auto px-6" ref={messagesRef}>
        {messages.map(({ role, content }) => (
          <p
            class={clsx(
              'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
              (role === 'assistant' || role === 'system') && 'bg-slate-100',
              role === 'user' && 'ml-auto bg-blue-600 text-slate-100',
            )}
          >
            {content}
          </p>
        ))}
      </div>

      <form class="flex w-full space-x-2 p-6" onSubmit={handleSubmit}>
        <input
          autocomplete="off"
          class="border-input focus-visible:ring-ring flex h-9 w-full flex-1 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          onInput={handleInputChange}
          placeholder="Type your message..."
          value={input}
        />

        <SubmitButton disabled={isLoading} />
      </form>
    </section>
  );
}

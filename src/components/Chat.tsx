import { useChat } from 'ai/react';
import { API_URL, CHAT_ID, DEV } from 'src/constants';

import ChatError from './ChatError';
import Header from './Header';
import Messages from './Messages';
import SubmitButton from './SubmitButton';

export default function Chat() {
  // https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot
  // https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
  const {
    error,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    messages,
    reload,
  } = useChat({
    api: `${API_URL}/api/chat`,
    id: CHAT_ID,
    streamProtocol: 'text',

    initialMessages: [
      {
        role: 'assistant',
        content: 'How may I help you?',
        id: '1',
      },
    ],

    onError(error) {
      if (DEV) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
  });

  return (
    <section class="flex h-screen flex-col rounded-xl border shadow sm:h-[70vh]">
      <Header />
      <ChatError error={error} reload={reload} />
      <Messages messages={messages} />

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

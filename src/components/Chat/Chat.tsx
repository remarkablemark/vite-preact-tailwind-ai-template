import clsx from 'clsx';
import { useEffect, useRef, useState } from 'preact/hooks';
import { API_URL } from 'src/constants';

interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
}

export default function Chat() {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'How may I help you?' },
  ]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section class="flex h-screen flex-col rounded-xl border shadow sm:h-[70vh]">
      <div class="flex items-center space-x-4 p-6">
        <img
          alt="AI Assistant"
          class="h-10 w-10"
          src="https://ui.shadcn.com/avatars/02.png"
        />
        <h1 class="text-md font-medium">AI Assistant</h1>
      </div>

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

      <form
        class="flex w-full space-x-2 p-6"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!value) {
            return;
          }

          const sendMessages = messages.concat({
            role: 'user',
            content: value,
          });
          setMessages(sendMessages);
          setValue('');

          const response = await fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: sendMessages }),
          });

          if (!response.ok) {
            return;
          }

          setMessages(
            sendMessages.concat({
              role: 'assistant',
              content: (await response.json()).response,
            }),
          );
        }}
      >
        <input
          autocomplete="off"
          class="border-input focus-visible:ring-ring flex h-9 w-full flex-1 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          onInput={(event) =>
            setValue((event.target as HTMLInputElement).value)
          }
          placeholder="Type your message..."
          value={value}
        />

        <button
          class="focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shadow transition-colors hover:bg-slate-900 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          disabled={!value}
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-send"
          >
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
          </svg>

          <span class="sr-only">Send</span>
        </button>
      </form>
    </section>
  );
}

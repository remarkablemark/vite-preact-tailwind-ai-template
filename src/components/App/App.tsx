import clsx from 'clsx';
import { useState } from 'preact/hooks';

interface Message {
  content: string;
  role: 'assistant' | 'system' | 'user';
}

export default function App() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { content: 'How may I help you?', role: 'assistant' },
    { content: "I'm having trouble with my account.", role: 'user' },
  ]);

  return (
    <>
      <div class="rounded-xl border shadow">
        <div class="flex flex-row items-center space-y-1.5 p-6">
          <div class="flex items-center space-x-4">
            <div class="flex h-10 w-10 shrink-0 rounded-full">
              <img
                class="aspect-square h-full w-full"
                alt="Image"
                src="https://ui.shadcn.com/avatars/02.png"
              />
            </div>

            <h1 class="text-sm font-medium">AI Assistant</h1>
          </div>
        </div>

        <div class="p-6 pt-0">
          <div class="space-y-4">
            {messages.map(({ content, role }) => (
              <div
                class={clsx(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  (role === 'assistant' || role === 'system') && 'bg-slate-100',
                  role === 'user' && 'ml-auto bg-blue-600 text-slate-100',
                )}
              >
                {content}
              </div>
            ))}
          </div>
        </div>

        <div class="flex items-center p-6 pt-0">
          <form
            class="flex w-full items-center space-x-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (value) {
                setMessages(messages.concat({ content: value, role: 'user' }));
                setValue('');
              }
            }}
          >
            <input
              autocomplete="off"
              class="border-input focus-visible:ring-ring flex h-9 w-full flex-1 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
        </div>
      </div>
    </>
  );
}

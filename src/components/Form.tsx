import type { UseChatHelpers } from 'ai/react';

import SubmitButton from './SubmitButton';

interface Props {
  isLoading: boolean;
  onChange: UseChatHelpers['handleInputChange'];
  onSubmit: UseChatHelpers['handleSubmit'];
  value: string;
}

export default function Form(props: Props) {
  return (
    <form class="flex w-full space-x-2 p-6" onSubmit={props.onSubmit}>
      <input
        autocomplete="off"
        class="border-input flex h-9 w-full flex-1 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:border-blue-400 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        onInput={props.onChange}
        placeholder="Type your message..."
        value={props.value}
      />

      <SubmitButton disabled={props.isLoading} />
    </form>
  );
}

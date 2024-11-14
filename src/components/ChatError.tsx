interface Props {
  error?: Error;
  reload: () => void;
}

export default function ChatError(props: Props) {
  if (!props.error) {
    return null;
  }

  return (
    <p
      class="mb-4 flex items-center justify-between rounded border border-red-200 bg-red-100 px-4 py-2 text-red-700"
      role="alert"
    >
      <span>An error occurred.</span>

      <button
        class="w-16 rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-1"
        type="button"
        onClick={props.reload}
      >
        Retry
      </button>
    </p>
  );
}
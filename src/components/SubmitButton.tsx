import SendIcon from './SendIcon';

interface Props {
  disabled?: boolean;
}

export default function SubmitButton(props: Props) {
  return (
    <button
      class="focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shadow transition-colors hover:bg-slate-900 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
      disabled={props.disabled}
      type="submit"
    >
      <SendIcon />
    </button>
  );
}

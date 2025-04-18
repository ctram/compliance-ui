export function ActionButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="border-2 border-black-500 rounded-md p-2 hover:cursor-pointer" onClick={onClick}>
      {text}
    </button>
  );
}

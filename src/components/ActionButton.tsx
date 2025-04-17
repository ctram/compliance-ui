export function ActionButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="border border-gray-300 rounded-md p-2 hover:cursor-pointer" onClick={onClick}>
      {text}
    </button>
  );
}

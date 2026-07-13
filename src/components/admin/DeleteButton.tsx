"use client";

export default function DeleteButton({ confirmText = "Delete this permanently? This can't be undone." }: { confirmText?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
      className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
    >
      Delete
    </button>
  );
}

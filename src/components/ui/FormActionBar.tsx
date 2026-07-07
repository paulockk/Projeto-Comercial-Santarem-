import type { ReactNode } from "react";

interface FormActionBarProps {
  children: ReactNode;
}

export function FormActionBar({ children }: FormActionBarProps) {
  return (
    <div
      className="
        sticky bottom-0 -mx-6 sm:-mx-8 px-6 sm:px-8 py-4 mt-2
        bg-white/95 backdrop-blur border-t border-gray-100
        flex flex-col-reverse sm:flex-row justify-end gap-3
        rounded-b-2xl
      "
    >
      {children}
    </div>
  );
}

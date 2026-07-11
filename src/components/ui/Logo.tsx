interface LogoProps {
  size?: number;
}

export function Logo({ size = 64 }: LogoProps) {
  return (
    <div
      className="rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center font-bold select-none"
      style={{ width: size, height: size }}
    >
      <span className="text-red-600" style={{ fontSize: size * 0.42 }}>
        C
      </span>
      <span className="text-[#2E3192]" style={{ fontSize: size * 0.42 }}>
        S
      </span>
    </div>
  );
}

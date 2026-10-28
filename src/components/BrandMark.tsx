import Image from "next/image";

export function BrandMark() {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={485}
      height={302}
      className="mr-[0.3em] inline-block h-[0.62em] w-auto align-[-0.02em]"
    />
  );
}

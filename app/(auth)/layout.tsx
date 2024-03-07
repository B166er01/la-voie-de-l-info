import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <nav className="w-full h-18 absolute top-0 p-3 flex gap-3 items-center">
      <div className="w-[40px] h-[32px]">
      <Image width={100} height={80} alt="" src={"/logo-news-s.png"} />
      </div>
      <div className="capitalize text-2xl">la voie de l&rsquo;info</div>
  </nav>
    {children}
  </div>
}

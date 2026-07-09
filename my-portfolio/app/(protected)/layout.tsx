export default function ProtectedLayout({

  children,

}: Readonly<{

  children: React.ReactNode;
}>) {

  return <div className="flex flex-1 flex-col">{children}</div>;
}

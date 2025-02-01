export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center h-screen w-screen justify-center ">
      <div className="max-w-7xl flex flex-col gap-12 items-center my-auto h-screen w-screen justify-center">
        {children}
      </div>
    </div>
  );
}

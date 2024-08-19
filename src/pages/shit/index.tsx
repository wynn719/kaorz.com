import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Shit() {
  const { data: session } = useSession();
  const [isShit, setIsShit] = useState(false);

  async function createShit() {
    if (isShit) return;

    setIsShit(true);
    const res = await Promise.resolve(true);

    if (res) {
      setIsShit(false);
    }
  }

  if (session) {
    return (
      <div className="w-screen h-screen">
        <div className="page-wrapper w-full h-full flex flex-col">
          <div className="page-title pt-6 px-4 text-3xl font-bold text-gray-600 leading-normal">
            今天你 xx 了吗？
          </div>
          <div className="grid-wrapper w-full h-full p-4">
            <div
              className="w-full h-full bg-blue-200 flex items-center justify-center rounded-md"
              onClick={createShit}
            >
              <div className="emoji text-8xl">💩</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      Not signed in <br />
    </>
  );
}

import Link from "next/link";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <div className="font-normal">
        Supabase environment variables required
      </div>
      <div className="flex gap-2">
        <Button
          asChild
          size="sm"
          variant={"outline"}
          disabled
          className="opacity-75 cursor-none pointer-events-none"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={"default"}
          disabled
          className="opacity-75 cursor-none pointer-events-none"
        >
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}

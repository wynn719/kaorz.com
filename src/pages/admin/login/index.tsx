import { Button } from "@/pages/admin/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/pages/admin/components/ui/card";
// import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            This demo uses GitHub for authentication.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={"/api/auth/github"} className="w-full">
            <Button className="w-full">Sign in with GitHub</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

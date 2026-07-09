import {

  Card,

  CardContent,

  CardDescription,

  CardHeader,

  CardTitle,


} from "@/components/ui/card";

import { LoginForm } from "@/components/auth/login-form";



interface LoginPageProps {

  searchParams: Promise<{ redirectTo?: string; message?: string; error?: string }>;

}



export default async function LoginPage({ searchParams }: LoginPageProps) {


  const { redirectTo, message, error } = await searchParams;



  return (

    <Card>

      <CardHeader>

        <CardTitle>Sign in</CardTitle>



        <CardDescription>Access your account to manage your profile and reviews.</CardDescription>


      </CardHeader>

      <CardContent>
        {error ? (
          <p className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            Authentication failed. Please try again.
          </p>

        ) : null}

        <LoginForm redirectTo={redirectTo} message={message} />


      </CardContent>

    </Card>


  );



}

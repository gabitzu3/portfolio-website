import {

  Card,

  CardContent,

  CardDescription,

  CardHeader,

  CardTitle,

} from "@/components/ui/card";


import { SignupForm } from "@/components/auth/signup-form";



export default function SignupPage() {

  return (

    <Card>

      <CardHeader>


        <CardTitle>Create account</CardTitle>

        <CardDescription>Register to submit reviews and manage your profile.</CardDescription>

      </CardHeader>

      <CardContent>

        <SignupForm />

      </CardContent>

    </Card>

  );

}

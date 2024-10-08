import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/pages/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-[95vh]">
      <Card className="w-[350px] mt-14">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Welcome aboard! 🚀 Ready to crush tasks?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}

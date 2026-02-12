"use client";

// ** next / React
import Image from "next/image";
import { useState } from "react";
// import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// imgs
import bg from "/public/login-bg.jpg";
import logo from "/public/logo.png";

// ** Components
import LoadingCircle from "@/components/loadingCircle";
import PasswordInput from "@/components/inputcopy/passwordInput";

// ** 3rd Parties
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// ** Schemas
import { LoginSchema } from "@/schema/loginSchema";

// ** MUIs
import { Button } from "@/components/ui/button";

// ** Libs
import IconifyIcon from "@/components/icon";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const form = useForm({ resolver: yupResolver(LoginSchema), mode: "all" });
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form;

//   const userSession = async () => {
//     const session = await getSession();

//     if (session) {
//       return session?.user;
//     } else {
//       return null;
//     }
//   };

  const submitLogin = async (event) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.email,
        password: event.password
      });

      if (res.ok) {
        const session = await userSession();
        router.replace(session.redirectUrl || "/");
      } else {
        setLoading(false);

        setMessage(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row w-full mx-auto h-screen justify-center items-center ">
      <div className="relative w-1/2 h-screen">
        <Image src={bg} alt="background" fill className="object-cover z-0" />
        <div className="absolute inset-0 bg-[#18181B] bg-opacity-40 z-10" />
        <div className="relative z-20 p-10 flex flex-col justify-between items-start h-screen text-[#ffffff]">
          <Image src={logo} alt="logo" width={100} height={50} className="" />
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-black">
              Smart Billing for ISP Operations
            </h2>
            <p className="text-sm">Manage invoices, payments, and customer billing across multiple ISPs in one platform.</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-screen flex items-center justify-center bg-white relative">
        <div className="w-full max-w-sm bg-white px-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(submitLogin)} className="space-y-4">
              <div className="text-center space-y-6 mb-4">
                <div className="flex justify-center">
                  <Image
                    src={logo}
                    alt="logo"
                    priority
                  />
                </div>

                <p className="text-sm text-foreground font-semibold">
                  Sign in to NetApps
                </p>
              </div>

              {message && (
                <Alert
                  className={
                    "bg-red-100 text-destructive  border border-destructive"
                  }
                >
                  <AlertDescription className="flex items-center">
                    <IconifyIcon icon={"cuida:warning-outline"} />
                    <span className="font-medium">{message}</span>
                  </AlertDescription>
                </Alert>
              )}
              <TextInputForm
                name="email"
                control={control}
                placeholder="Email"
                errors={errors}
                type="text"
              />
              <PasswordInput
                name={"password"}
                placeholder={"Passsword"}
                errors={errors}
                control={control}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keep-logged-in"
                    className="border-blue-400 data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]"
                  />
                  <Label
                    htmlFor="keep-logged-in"
                    className="text-sm font-medium text-[#64748B] cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Keep me logged in
                  </Label>
                </div>

                <Button
                  variant="link"
                  type="button"
                  className="text-sm font-medium p-0 h-auto"
                >
                  Forgot Password?
                </Button>
              </div>

              <Button
                size="full"
                disabled={loading}
                variant="primary"
                type="submit"
              >
                {loading ? (
                  <LoadingCircle size={24} thickness={3} border />
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="absolute bottom-8 inset-x-0 text-center">
                <p className="text-muted-foreground text-sm">
                  © 2026 NetApps. All rights reserved.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

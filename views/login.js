"use client";

// ** next / React
import Image from "next/image";
import { useState } from "react";
// import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// imgs
import bg from "/public/illustration.png";
import logo from "/public/logo.png";
import panel from "/public/panel.png";

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
  const form = useForm({ mode: "all" });
  const {
    control,
    handleSubmit,
    formState: { errors },
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

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);

    // try {
    //   const res = await signIn("credentials", {
    //     redirect: false,
    //     email: event.email,
    //     password: event.password,
    //   });

    //   if (res.ok) {
    //     const session = await userSession();
    //     router.replace(session.redirectUrl || "/");
    //   } else {
    //     setLoading(false);

    //     setMessage(res.error);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="flex flex-row w-full mx-auto h-screen justify-center items-center ">
      <div className="relative w-full h-screen p-6">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={panel}
            alt="Background Texture"
            fill
            style={{ opacity: 0.1 }}
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={bg}
                alt="Dashboard Preview"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="relative z-20 p-6 flex flex-col justify-between h-full">
            <div className="flex justify-center p-3">
              <Image src={logo} alt="logo" priority />
            </div>

            <div className="flex flex-col gap-1 max-w-sm">
              <h1 className="text-3xl font-bold text-[#0F172A] leading-tight">
                Smart Billing for ISP Operations
              </h1>
              <p className="text-[#64748B] text-[10px]">
                Manage invoices, payments, and customer billing across multiple
                ISPs in one platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen flex items-center justify-center bg-white relative p-6">
        <div className="w-1/2 max-w-sm bg-white">
          <Form {...form}>
            <form onSubmit={handleSubmit(submitLogin)} className="space-y-4">
              <div className="text-center space-y-6 mb-4">
                <div className="flex justify-center p-3">
                  <Image src={logo} alt="logo" priority />
                </div>

                <p className="text-sm text-foreground font-semibold mt-6">
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
                label={""}
                control={control}
                placeholder="Email"
                errors={errors}
                type="text"
              />
              <PasswordInput
                label={""}
                name={"password"}
                placeholder={"Passsword"}
                errors={errors}
                control={control}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keep-logged-in"
                    className="data-[state=checked]:border-[#2563EB]"
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
                  className="text-sm font-medium p-0 h-auto text-primary"
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
            </form>
          </Form>
          <div className="absolute bottom-10 inset-x-0 text-center">
            <p className="text-muted-foreground text-sm">
              © 2026 NetApps. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

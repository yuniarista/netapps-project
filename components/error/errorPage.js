"use client";
import Image from "next/image";
import Link from "next/link";
import error404 from "@/public/404.png";
import error500 from "@/public/500error.png";
import { signOut } from "next-auth/react";
import CustomButton from "../button/customButton";

export default function ErrorPage({
  errorCode,
  errorMessage,
  errorDescription,
  redirectUrl
}) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const getErrorImage = () => {
    switch (errorCode) {
      case 500:
        return error500;
      default:
        return error404;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-center">
      <div>
        <Image
          src={getErrorImage()}
          alt={`Error ${errorCode} Illustration`}
          width={160}
          height={160}
          className="mx-auto"
        />

        <h1 className="text-xl font-semibold text-[#09090B] mb-3">
          {errorMessage ??
            (errorCode === 500 ? "Internal Server Error" : "Page not Found")}
        </h1>

        <p className="text-[#71717A] text-sm mb-6">
          {errorDescription ? (
            errorDescription
          ) : errorCode === 500 ? (
            <>
              Something went wrong on our end.
              <br />
              We’re working to fix it — please try again later.
            </>
          ) : (
            <>
              The page you are looking for might be
              <br />
              missing or temporarily unavailable.
            </>
          )}
        </p>

        {errorCode === 401 ? (
          <CustomButton
            onClick={handleLogout}
            variant="primary"
            className="w-fit"
          >
            Logout
          </CustomButton>
        ) : (
          <Link href={redirectUrl || "/home"}>
            <CustomButton variant="primary" className="w-fit">
              Back to Dashboard
            </CustomButton>
          </Link>
        )}
      </div>
    </div>
  );
}

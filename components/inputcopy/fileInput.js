import Image from "next/image";
import { useRef, useState } from "react";
import { FormHelperText, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FileInput({
  name,
  label,
  errors,
  control,
  defaultValue,
  appLogoUrl,
}) {
  const [apkUrl, setApkUrl] = useState(defaultValue ?? null);
  const [apkName, setApkName] = useState("");
  const inputRef = useRef(null);
  const clearImage = (field) => {
    inputRef.current.value = null;
    field.onChange(null);
    setApkUrl(null);
  };
  return (
    <div>
      <div className="space-y-1">
        <Typography sx={{ color: "GrayText" }}>{label}</Typography>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <div className="relative w-fit">
                <label
                  htmlFor={name}
                  className="flex aspect-[7/5] w-36 bg-[#3d3b3c]/10"
                >
                  <div className="flex w-full flex-col items-center justify-center space-y-2 p-3">
                    {apkUrl ? (
                      <>
                        <div className="relative flex h-full w-full justify-center">
                          <Image
                            fill
                            priority
                            alt="Selected"
                            src={
                              appLogoUrl
                                ? appLogoUrl
                                : "https://icon-library.com/images/apk-icon/apk-icon-8.jpg"
                            }
                            className="h-2 w-auto object-contain"
                          />
                        </div>
                        <p className="text-sm font-regular truncate w-full my-0 py-1">
                          {apkName}
                        </p>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-7 fill-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                        </svg>
                        <p className="text-center text-xs text-[#3d3b3c] hover:underline">
                          Upload Apk
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    id={name}
                    accept=".apk"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                      setApkUrl(URL.createObjectURL(e.target.files[0]));
                      setApkName(e.target.files[0].name);
                    }}
                    disabled={!!field.value}
                  />
                </label>
                {apkUrl && (
                  <div
                    className="absolute -right-3 -top-2 flex h-fit w-fit justify-center rounded-full bg-red-400 p-1 hover:bg-red-600 z-50"
                    onClick={() => clearImage(field)}
                  >
                    <svg
                      className="w-4 aspect-square fill-white p-[1px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  </div>
                )}
              </div>
              {errors[name] && (
                <FormHelperText error>{errors[name].message}</FormHelperText>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}

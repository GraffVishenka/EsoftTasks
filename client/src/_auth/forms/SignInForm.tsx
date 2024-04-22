import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SigninValidation } from "../../lib/validation";
import Loader from "../../components/shared/Loader";
import { useContext } from "react";
import { Context } from "../..";
import { Toaster } from "sonner";

const SignInForm = () => {
  const { store } = useContext(Context);
  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SigninValidation>) {
     store.signIn(values.email, values.password);
  }

  return (
    <Form {...form}>
      <Toaster
        toastOptions={{
          classNames: { toast: "pl-5 h-10", error: "bg-red" },
        }}
      />
      <div className="sm:w-420 flex-center flex-col">
        <img
          alt="worker"
          src={require("../../assets/icons/icons8-работник-67.png")}
        />

        <h2 className="h3-bold md:h2-bold pt-5">Log in to you account</h2>
        <p className="text-light-3 small-medium md:base-regular">
          С возвращением! Пожалуйста, введите свои данные
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    placeholder="***********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary mt-3 ">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Вход"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;

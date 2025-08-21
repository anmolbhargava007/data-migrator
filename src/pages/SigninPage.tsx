import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { SigninRequest } from "@/types/auth";

const formSchema = z.object({
  user_email: z.string().email("Invalid email address"),
  user_pwd: z.string().min(6, "Password must be at least 6 characters"),
});

const SigninPage = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_email: "",
      user_pwd: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const signinRequest: SigninRequest = {
        user_email: values.user_email,
        user_pwd: values.user_pwd,
      };

      const success = await signin(signinRequest);
      console.log(success)
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="font-poppins min-h-screen flex items-center justify-center bg-gray-50 p-6 sm:p-10">
      <div className="w-full max-w-xl space-y-8">
        {/* <div className="text-center">
          <img src={logo} alt="logo" className="mx-auto w-80 h-auto" />
        </div> */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-700">
              Sign in to continue
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Please enter your email and password
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        type="email"
                        className="border bg-white text-black border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_pwd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="border bg-white text-black border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;

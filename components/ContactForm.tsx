"use client";
import * as z from "zod";
import { useForm } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useRFH } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Minimum of 2 characters required" }),
  email: z.string().email({ message: "Valid email required" }),
  subject: z.optional(z.string()),
  message: z.string().min(10, {
    message: "Minimum of 10 characters required",
  }),
});

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mzzpznvw");

  const form = useRFH<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    handleSubmit(data);
  };

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center gap-5 justify-center">
        <h1 className="text-white text-2xl md:text-4xl">
          Thanks for reaching out!
        </h1>
        <p className="text-white">
          I will be sure to read your message and get back to you ASAP.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border shadow-md shadow-white p-5"
        >
          <LabelInputContainer>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="NAME"
                      className="text-white border-0 border-b rounded-none outline-none  focus-visible:outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="EMAIL"
                      className="text-white border-0 border-b rounded-none outline-none  focus-visible:outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="SUBJECT"
                      className="text-white border-0 border-b rounded-none outline-none  focus-visible:outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="MESSAGE"
                      className="text-white border-0 border-b rounded-none outline-none  focus-visible:outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <Button
            variant={"secondary"}
            disabled={state.submitting}
            className="w-full my-10"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

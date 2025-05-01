"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Code, Clipboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import * as z from "zod";

import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { codeFormSchema } from "@/schemas";

const CodePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof codeFormSchema>) => {
    try {
      const userMessage = { role: "user", content: values.prompt };

      const response = await axios.post("/api/code", {
        messages: [...messages, userMessage],
      });

      setMessages((prev) => [...prev, userMessage, response.data]);
    } catch (error) {
      console.error("API Error:", error);

      if (axios.isAxiosError(error) && error.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("An error occurred while generating code. Please try again.");
      }
    } finally {
      form.reset();
      router.refresh();
    }
  };

  // Function to copy generated code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Simple toggle button using React hooks."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && <Empty label="No conversation started." />}

          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 w-full flex items-start gap-x-6 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <div className="w-full">
                  <ReactMarkdown
                    className="text-sm leading-7"
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="relative bg-black/90 text-white rounded-lg p-3 overflow-auto">
                          <pre {...props} />
                          <Button
                            onClick={() => copyToClipboard(props.children as string)}
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2 flex items-center gap-1 text-white border-white"
                          >
                            <Clipboard className="w-4 h-4" /> Copy
                          </Button>
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code className="bg-black/10 rounded-lg p-1 text-sm" {...props} />
                      ),
                    }}
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;

"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { checkValidTweetUrl, cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "./icons"
import { SubmitButton } from "./SubmitButton"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

const FormSchema = z.object({
  input: z.string(),
})

export default function GenerateForm({
  inputValue,
}: {
  inputValue?: string | null
}) {
  const { setTheme, theme } = useTheme()
  const [activeTab, setActiveTab] = useState<"generate" | "analyze">("generate")
  const [generateInput, setGenerateInput] = useState("")
  const [analyzeInput, setAnalyzeInput] = useState("")
  const [generateResult, setGenerateResult] = useState("")
  const [analyzeResult, setAnalyzeResult] = useState("")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input: inputValue ?? "",
    },
  })

  const analyzeUserTweet = (url: string) => {
    if (!checkValidTweetUrl(url)) {
      toast.error("Invalid tweet URL")
      return
    }
    console.log("Valid tweet URL, proceeding with analysis")
  }
  async function onSubmit(
    data: z.infer<typeof FormSchema>,
    action: "generate" | "analyze"
  ) {
    if (action === "generate") {
      setGenerateResult("AI generated tweet based on: " + data.input)
      return
    }
    analyzeUserTweet(data.input)
  }

  const ThemeIcon = theme === "dark" ? Icons.moon : Icons.sun

  const handleTabChange = (value: string) => {
    if (value === "generate" || value === "analyze") {
      setActiveTab(value)
      form.reset({ input: value === "generate" ? generateInput : analyzeInput })
    }
  }

  const handleInputChange = (value: string) => {
    if (activeTab === "generate") {
      setGenerateInput(value)
    } else {
      setAnalyzeInput(value)
    }
  }

  return (
    <Tabs
      defaultValue="generate"
      value={activeTab}
      className="w-full max-w-xl"
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-2 rounded-lg bg-background p-1">
        <TabsTrigger
          value="generate"
          className={cn(
            "rounded-md transition-all duration-200 ease-in-out",
            "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
            "data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground",
            "px-4 py-2 text-sm font-medium",
            "hover:bg-muted/50"
          )}
        >
          Generate Tweet
        </TabsTrigger>
        <TabsTrigger
          value="analyze"
          className={cn(
            "rounded-md transition-all duration-200 ease-in-out",
            "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
            "data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground",
            "px-4 py-2 text-sm font-medium",
            "hover:bg-muted/50"
          )}
        >
          Analyze Viral Tweet
        </TabsTrigger>
      </TabsList>
      <TabsContent value="generate">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data, "generate"))}
            className="relative z-10 mt-5 h-[52px] w-full min-w-0 max-w-xl rounded-full border border-input bg-background p-1.5 md:pl-4"
          >
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="h-full w-full">
                  <div className="relative flex h-full items-center justify-between rounded-full">
                    <ThemeIcon
                      className="ml-2 h-8 w-8 cursor-pointer text-foreground sm:ml-0"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    />
                    <FormControl>
                      <Input
                        className={cn(
                          "mx-4 h-5 w-full border-none bg-transparent p-0 text-foreground placeholder-muted-foreground focus-visible:ring-0"
                        )}
                        placeholder="Enter your tweet prompt"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e.target.value)
                        }}
                        value={generateInput}
                        required
                      />
                    </FormControl>
                    <SubmitButton
                      isSubmitting={form.formState.isSubmitting}
                      text="Generate"
                    />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="analyze">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data, "analyze"))}
            className="relative z-10 mt-5 h-[52px] w-full min-w-0 max-w-xl rounded-full border border-input bg-background p-1.5 md:pl-4"
          >
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="h-full w-full">
                  <div className="relative flex h-full items-center justify-between rounded-full">
                    <ThemeIcon
                      className="ml-2 h-8 w-8 cursor-pointer text-foreground sm:ml-0"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    />
                    <FormControl>
                      <Input
                        className={cn(
                          "mx-4 h-5 w-full border-none bg-transparent p-0 text-foreground placeholder-muted-foreground focus-visible:ring-0"
                        )}
                        placeholder="Paste viral tweet URL"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e.target.value)
                        }}
                        value={analyzeInput}
                        type="url"
                        required
                      />
                    </FormControl>
                    <SubmitButton
                      isSubmitting={form.formState.isSubmitting}
                      text="Analyze"
                    />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </TabsContent>
      {activeTab === "generate" && generateResult && (
        <Textarea
          value={generateResult}
          readOnly
          className="mt-4 h-32 resize-none rounded-lg bg-muted text-foreground"
        />
      )}
      {activeTab === "analyze" && analyzeResult && (
        <Textarea
          value={analyzeResult}
          readOnly
          className="mt-4 h-32 resize-none rounded-lg bg-muted text-foreground"
        />
      )}
    </Tabs>
  )
}

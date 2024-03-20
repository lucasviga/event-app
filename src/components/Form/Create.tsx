'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { api } from "@/lib/axios"
import { useDialogStore } from "@/store/dialog"
import { useMutation } from "@tanstack/react-query"

export function FormCreate() {
  const {setIsOpen} = useDialogStore((state) => state)

  const formSchema = z.object({
    name: z.string().nonempty({ 
      message: 'You should inform a name to create a new event.' 
    }),
    date: z.coerce.date(),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: undefined,
      description: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const event = {
      name: values.name,
      description: values.description,
      date: values.date
    }

    await api.post('/events', event)

    setIsOpen();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Creating new event</DialogTitle>          
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>                
                <FormControl>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input {...field} className="col-span-3" />
                  </div>
                </FormControl>     
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>                
                <FormControl>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea {...field} className="col-span-3" />
                  </div>
                </FormControl>     
                <FormMessage />
              </FormItem>
            )}
          /> 

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>                
                <FormControl>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input type="date" {...field} className="col-span-3" />
                  </div>
                </FormControl>     
                <FormMessage />
              </FormItem>
            )}
          />       

          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>          
      </Form>      
    </DialogContent>
  )
}
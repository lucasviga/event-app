import { useState } from "react"
import { FormCreate } from "./Form/Create"
import { FormEdit } from "./Form/Edit"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDialogStore } from "@/store/dialog"

// const typeForm = ['create','edit', 'view'];

interface DialogDemoProps {
 typeForm: string;
}

export function DialogDemo({ typeForm }: DialogDemoProps) {
  const {isOpen, setIsOpen} = useDialogStore((state) => state)

  console.log(isOpen)

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen()}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create
        </Button>
      </DialogTrigger>
      
      {typeForm === 'create' && <FormCreate /> }

      {/* {typeForm === 'edit' && <FormEdit /> } */}
    </Dialog>
  )
}
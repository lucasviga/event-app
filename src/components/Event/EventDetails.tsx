import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { EventsData } from "./type";

interface OpenEventDetailsProps {
  event: EventsData;
}

export function OpenEventDetails({ event  }: OpenEventDetailsProps) {
  return (
    <Dialog>      
      <DialogTrigger asChild>
        <Button variant="outline">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.name}</DialogTitle>          
        </DialogHeader>
        <div className="grid gap-4 py-4">          
          <div className="grid grid-cols-1 items-center gap-4">
            {event.description}
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            {event.date}
          </div>
        </div>  
      </DialogContent>
    </Dialog>
  )
}
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import { EventsData } from "./type";
import { DialogDemo } from "../Dialog";
import { Button } from "../ui/button";
import { EmptyEvent } from "../EmptyEvent";
import { OpenEventDetails } from "./EventDetails";

export function Event() {
  async function fetchEvents() {
    const response = await api.get<EventsData[] | undefined>('/events');
    return response.data;
  }

  const {data, isLoading} = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })

  const onRemoveEvent = async (event: EventsData) => {
    await api.delete(`/events/${event.id}`);
  }

  console.log(data)

  return (
    <>
      {data?.length <= 0 ? <EmptyEvent /> : (
        <ul className="w-full flex flex-col gap-4">
          {isLoading ? <p>Loading...</p> : (
            <>
              {data?.map((event) => (
                <li key={event.id} className="bg-white p-6 rounded-xl flex items-center justify-between">
                  <div>
                    <h2 className="text-indigo-600 mb-1">{event.name}</h2>                
                    <time className="text-slate-400">{event.date}</time>
                  </div>
    
                  <div className="flex gap-8 text-slate-600">
                    <OpenEventDetails event={event} />
                    <DialogDemo typeForm="edit" />
                    <Button className="bg-red-200 text-red-600 hover:bg-red-300" onClick={() => onRemoveEvent(event)}>Remove</Button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </>
  )
}
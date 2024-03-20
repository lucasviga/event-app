'use client'
import { useState } from "react";
import { DialogDemo } from "@/components/Dialog";
import { api } from "@/lib/axios";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import { Event } from "@/components/Event";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

export default function Home() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100 gap-8">
        <div className="flex gap-6 items-center">
          <h1 className="text-xl text-slate-600">Event App</h1>

          <DialogDemo typeForm="create" />          
        </div>
        <Event />
      </main>
    </QueryClientProvider>
  );
}

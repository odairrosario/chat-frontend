"use client";
import { useAuth } from "@/hooks/use-auth.hook";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [cliente, setCLiente] = useState(false);
  useEffect(() => {
    setCLiente(true);
  }, [])

  const { data } = useAuth();
  const loged = data.user ? true : false;

  if (cliente) {
    if (loged) {
      redirect("/chat");
    } else {
      redirect("/sign-in");
    }
  }

}

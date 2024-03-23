"use client"

import Image from "next/image";
import { useParams } from "next/navigation";

export default function Info() {

  const params = useParams();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <strong>
        {params.name}
      </strong>

    </main>
  );
}

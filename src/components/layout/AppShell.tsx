import { SquareMenu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGO = "/temp/dlsymbol.png"

type Props = {
  title: string
  children: React.ReactNode
}

export default function AppShell({ title, children }: Props) {
  const [authenticated, setAuthenticated] = useState<boolean>(true)

  const [tabOpen, setTabOpen] = useState<boolean>(false)
  return (
    <div className="relative">
      <div className="flex items-center space-x-2 p-4">
        <Button variant="ghost" size="icon" onClick={() => setTabOpen(!tabOpen)}>
          <SquareMenu className="size-8 cursor-pointer text-gray-900" strokeWidth={1} />
        </Button>

        <div className="relative size-8">
          <Image src={LOGO} alt="LOGO" fill></Image>
        </div>
        <div>{title}</div>
      </div>

      {tabOpen && (
        <div
          className="absolute inset-0 z-10 h-dvh bg-black/20"
          onClick={() => setTabOpen(false)}
        />
      )}

      <div
        className={cn(
          "absolute top-0 left-0 z-20 h-dvh w-80 rounded-r-xl border-y border-r bg-white transition-transform duration-300",
          tabOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between p-4">
          <div className="relative size-8">
            <Image src={LOGO} alt="LOGO" fill />
          </div>
          <div className="rounded-md p-2 hover:bg-gray-100" onClick={() => setTabOpen(false)}>
            <X className="size-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import AppShell from "@/components/layout/AppShell"
import { useState } from "react"

const LOGO = "/temp/dlsymbol.png"

export default function MainPage() {
  const [authenticated, setAuthenticated] = useState<boolean>(true)
  const [tabOpen, setTabOpen] = useState<boolean>(false)

  return (
    <AppShell title="Dashboard">
      <div></div>
    </AppShell>
  )
}

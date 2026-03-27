import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type AccordionItem = {
  id: string
  title: string
  content: React.ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  defaultOpen?: string
}

export function Accordion({ items, defaultOpen }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpen || null)

  function toggle(id: string) {
    setOpenItem((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openItem === item.id

        return (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* HEADER */}
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-2">
                <ChevronDown
                  className={cn(
                    "transition-transform",
                    isOpen && "rotate-180"
                  )}
                  size={18}
                />
                <span className="font-semibold">{item.title}</span>
              </div>

              <button className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90">
                SELECIONAR
              </button>
            </button>

            {/* CONTENT */}
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

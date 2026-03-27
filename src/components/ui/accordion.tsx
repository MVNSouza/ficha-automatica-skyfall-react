import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden", // 🔥 teu estilo
        className
      )}
      {...props}
    />
  )
}

type TriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  onSelect?: () => void
}

function AccordionTrigger({
  className,
  children,
  onSelect,
  ...props
}: TriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">

      <div className="flex w-full items-center justify-between">

        {/* BOTÃO PRINCIPAL (toggle) */}
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn(
            "group flex flex-1 items-center gap-2 px-4 py-3 text-left transition hover:bg-muted/50",
            className
          )}
          {...props}
        >
          <ChevronDown
            className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
          <span className="font-semibold text-foreground">
            {children}
          </span>
        </AccordionPrimitive.Trigger>

        {onSelect && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
            className="mr-3 text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            SELECIONAR
          </button>
        )}
      </div>

    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm transition-all",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      )}
      {...props}
    >
      <div
        className={cn(
          "px-4 pb-4 pt-2 text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

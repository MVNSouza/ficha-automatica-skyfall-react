import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { ArrowBigRightDash } from "lucide-react"
import { Link } from "react-router-dom"

const steps = [
  "Atributos",
  "Legado",
  "Maldição",
  "Talentos",
  "Antecedente",
  "Classe",
]

export function CustomBreadcrumb({ currentStep = 0 }) {
  return (
    <Breadcrumb className="px-4 py-3 rounded-xl">
      <BreadcrumbList className="flex items-center gap-2">

        {steps.map((step, index) => (
          <BreadcrumbItem key={`${step}-${index}`} className="flex items-center">
            <BreadcrumbLink asChild
              className={`
                bg-primary-emphasis text-white px-4 py-2 rounded-lg
                transition-all duration-200
                hover:text-secondary hover:bg-primary-emphasis/95
                ${index === currentStep ? "bg-primary" : ""}
              `}
            >
              <Link to={`/${step}`}>
                {step}
              </Link>
            </BreadcrumbLink>

            {index < steps.length - 1 && (
              <BreadcrumbSeparator>
                <ArrowBigRightDash className="text-primary-emphasis"/>
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"

type BaseCardProps = {
  title?: string
  children: React.ReactNode
  maxHeight?: string
}

function BaseCard({ title, children, maxHeight = "250px" }: BaseCardProps) {
  return (
    <Card className="max-w-xl">

      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent>
        <div
          className="overflow-y-auto pr-2"
          style={{ maxHeight }}
        >
          {children}
        </div>
      </CardContent>

    </Card>
  )
}

export default BaseCard

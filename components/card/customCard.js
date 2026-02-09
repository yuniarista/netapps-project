import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CustomCard({
  title,
  description,
  children,
  footer,
  className
}) {
  return (
    <Card
      className={cn("border border-[#E4E4E7] rounded-xl shadow-sm", className)}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-base">{title}</CardTitle>}
          {description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="space-y-4">{children}</CardContent>
      {footer && (
        <CardFooter className="flex justify-end gap-2">{footer}</CardFooter>
      )}
    </Card>
  );
}

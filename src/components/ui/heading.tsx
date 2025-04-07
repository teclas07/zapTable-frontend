import { Separator } from "@radix-ui/react-separator";

interface HeadingProps {
  title: string;
  description?: string;
}

export function Heading({ title, description }: HeadingProps) {
  return (
    <div className="space-y-4">
      <Heading title={title} description={description} />
      <Separator />
    </div>
  );
}

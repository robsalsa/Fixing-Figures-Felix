import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <Badge variant={"outline"} className="font-normal">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button size="sm" variant={"outline"} disabled>
          Sign in (This is inside of the components/env-var-warning.tsx)
        </Button>
        <Button size="sm" variant={"default"} disabled>
          Sign up This is inside of the components/env-var-warning.tsx
        </Button>
      </div>
      <p>Hello?</p>
    </div>
  );
}

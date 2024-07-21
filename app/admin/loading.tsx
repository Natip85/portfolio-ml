import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex justify-center p-10">
      <Loader2 className="size-24 animate-spin text-white" />
    </div>
  );
}

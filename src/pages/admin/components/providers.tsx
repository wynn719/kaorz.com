import { TooltipProvider } from "@/pages/admin/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}

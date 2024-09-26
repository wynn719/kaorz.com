import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/pages/admin/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/pages/admin/components/ui/button";
import { ProductsTable } from "./components/products-table";
import { DashboardLayout } from "./components/layout";
// import { getProducts } from "@/lib/db";
import { useSession, signIn } from "next-auth/react";

function getProducts(search: string, offset: number) {
  return {
    products: [
      {
        name: "<NAME>",
        id: 1,
        status: "active",
        imageUrl: "",
        price: "$100",
        stock: 100,
        availableAt: new Date(),
      },
    ],
    newOffset: 20,
    totalProducts: 100,
  };
}

function ProductsPage({
  searchParams = { q: "", offset: "0" },
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const { products, newOffset, totalProducts } = getProducts(
    search,
    Number(offset)
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}

export default function Index() {
  const { data: session } = useSession();

  if (!session) {
    signIn();
    return;
  }

  if (session) {
    return (
      <DashboardLayout>
        {ProductsPage({ searchParams: { q: "", offset: "0" } })}
      </DashboardLayout>
    );
  }

  return null;
}

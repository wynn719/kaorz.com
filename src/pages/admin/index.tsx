import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/pages/admin/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/pages/admin/components/ui/button";
import { PhotoTable } from "./components/photo-table";
import { DashboardLayout } from "./components/layout";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "./components/ui/dialog";

function UploadPhotoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Photos
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Photos</DialogTitle>
          <DialogDescription>Select your photos to upload</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PhotoPage({
  searchParams = { q: "", offset: "0" },
}: {
  searchParams: { q: string; offset: string };
}) {
  // const search = searchParams.q ?? "";
  // const offset = searchParams.offset ?? 0;
  // const { products, newOffset, totalProducts } = getProducts(
  //   search,
  //   Number(offset)
  // );

  const newOffset = 0;
  const total = 100;
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/blog/api/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.photos);
      });
  }, []);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <UploadPhotoDialog />
        </div>
      </div>
      <TabsContent value="all">
        <PhotoTable photos={photos} offset={newOffset ?? 0} total={total} />
      </TabsContent>
    </Tabs>
  );
}

export default function Index() {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <DashboardLayout>
        <PhotoPage searchParams={{ q: "", offset: "0" }} />
      </DashboardLayout>
    );
  }

  return (
    <>
      <button onClick={() => signIn()}>sign in</button>
    </>
  );
}

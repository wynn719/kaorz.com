import Image from "next/image";
import { Badge } from "@/pages/admin/components/ui/badge";
import { Button } from "@/pages/admin/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/pages/admin/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/pages/admin/components/ui/table";
// import { SelectProduct } from "@/lib/db";
// import { deleteProduct } from "./actions";

type SelectProduct = {
  name: string;
  id: number;
  status: "active" | "archived" | "inactive";
  imageUrl: string;
  price: string;
  stock: number;
  availableAt: Date;
};

export function Photo({ photo }: { photo: any }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          src={photo.url}
          height="64"
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{photo.title}</TableCell>
      <TableCell className="font-medium">{photo.description}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {photo.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{photo.takeAt}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              {/* <form action={deleteProduct}> */}
              <button type="submit">Delete</button>
              {/* </form> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

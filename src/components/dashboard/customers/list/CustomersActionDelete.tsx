"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";
import { useToast } from "@hooks/use-toast";

import { deleteCustomer } from "@utils/actions/delete-customer.action";

type Props = {
  id: string;
};

const CustomersActionDelete = ({ id }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <DropdownMenuItem
      onClick={() =>
        deleteCustomer(id).then(({ message }) => {
          toast({
            description: message,
            variant: "success",
            title: "Success!",
          });

          router.refresh();
        })
      }
      className="justify-between !cursor-pointer"
    >
      Delete
      <DropdownMenuLabel>
        <Trash2Icon size={15} className="text-gray-400" />
      </DropdownMenuLabel>
    </DropdownMenuItem>
  );
};

export default CustomersActionDelete;

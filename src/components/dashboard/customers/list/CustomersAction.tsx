import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, PencilIcon } from "lucide-react";

import { ROUTE } from "@utils/routes";
import CustomersActionDelete from "./CustomersActionDelete";

type Props = {
  id: string;
};

const CustomersAction = ({ id }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <i>
            <Ellipsis />
          </i>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            href={`${ROUTE.CUSTOMERS_EDIT}/${id}`}
            className="w-full h-full cursor-pointer"
          >
            <DropdownMenuItem className="justify-between !cursor-pointer">
              Edit
              <DropdownMenuLabel>
                <PencilIcon size={15} className="text-gray-400" />
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </Link>
          <CustomersActionDelete id={id} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomersAction;

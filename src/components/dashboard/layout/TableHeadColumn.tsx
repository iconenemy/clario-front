"use client";

import { ComponentProps, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArrowUpIcon } from "lucide-react";

import { TableHead } from "@ui/table";

type Props = {
  sortable?: boolean;
  sortBy?: string;
};

const TableHeadColumn = ({
  sortable = false,
  sortBy,
  children,
  ...props
}: ComponentProps<"th"> & Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formatQueryString = useCallback(() => {
    if (!sortBy) return;

    const params = new URLSearchParams(searchParams.toString());

    const sort_by = searchParams.get("sort_by");
    const order = searchParams.get("order");

    if (sortBy !== sort_by) {
      params.set("sort_by", sortBy);
      params.set("order", "asc");
    } else if (!order) {
      params.set("order", "asc");
    } else if (order === "asc") {
      params.set("order", "desc");
    } else if (order === "desc") {
      params.delete("sort_by");
      params.delete("order");
    }

    return params.toString();
  }, [searchParams]);

  const hanldeSort = () => {
    router.push(pathname + "?" + formatQueryString());
  };

  return (
    <TableHead {...props}>
      <span className="flex items-center gap-x-1">
        {children}
        {sortable && (
          <i
            onClick={hanldeSort}
            className={`${
              searchParams.get("sort_by") === sortBy
                ? ""
                : "opacity-40 hover:opacity-100"
            }`}
          >
            <ArrowUpIcon
              size={17}
              className={`${
                searchParams.get("order") === "asc" &&
                searchParams.get("sort_by") === sortBy
                  ? "rotate-0"
                  : "rotate-180"
              } transition-all duration-200`}
            />
          </i>
        )}
      </span>
    </TableHead>
  );
};

export default TableHeadColumn;

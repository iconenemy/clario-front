"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@ui/button";

type Props = {
  total: number;
};
const perPage = 10;

const PaginationTable = ({ total }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");

  const totalPages = total !== 0 ? Math.ceil(total / perPage) : 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));

      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="w-full flex items-center justify-between">
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            disabled={page === 1}
          >
            Prev
          </Button>
        </PaginationItem>
        <div className="flex items-center gap-x-1">
          {page > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page > 1 && (
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page - 1);
                }}
              >
                {page - 1}
              </Button>
            </PaginationItem>
          )}

          <PaginationItem>
            <Button variant={"outline"} onClick={(e) => e.preventDefault()}>
              {page}
            </Button>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
              >
                {page + 1}
              </Button>
            </PaginationItem>
          )}

          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </div>

        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTable;

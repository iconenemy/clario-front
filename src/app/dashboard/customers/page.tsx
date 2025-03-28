import Link from "next/link";

import { client } from "@api";
import { Button } from "@ui/button";
import { ROUTE } from "@utils/routes";
import Pagination from "@components/dashboard/layout/Pagination";
import FilterSearch from "@components/dashboard/layout/FilterSearch";
import CustomersTable from "@components/dashboard/customers/list/CustomersTable";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = await searchParams;
  const page = query && query.page ? (query.page as string) : "1";

  const { data } = await client.GET("/api/customer", { params: { query } });

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <FilterSearch />
        <Button>
          <Link href={ROUTE.CUSTOMERS_CREATE}>Create</Link>
        </Button>
      </div>
      <CustomersTable page={parseInt(page)} customers={data?.customers ?? []} />
      <div className="my-2 w-full h-[1px] bg-slate-300"></div>
      <Pagination total={data?.total ?? 0} />
    </div>
  );
}

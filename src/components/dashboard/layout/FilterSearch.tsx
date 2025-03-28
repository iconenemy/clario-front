"use client";

import debounce from "lodash.debounce";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

const FilterSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const [query, setQuery] = useState(params.get("search") ?? "");

  const debouncedSearch = useMemo(
    () =>
      debounce((newQuery: string) => {
        if (!newQuery) {
          params.delete("search");
          params.set("page", "1");
        } else if (newQuery.length >= 3) {
          params.set("search", newQuery);
          params.set("page", "1");
        }
        router.replace(`${pathname}?${params.toString()}`);
      }, 500),
    [pathname, router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative m-[2px] mb-3 mr-5 float-left">
      <label className="sr-only">Search</label>
      <Input
        id="inputSearch"
        type="text"
        placeholder="Search by email..."
        value={query}
        onChange={handleChange}
        className="block w-64 pl-10 pr-4 text-sm"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
        <SearchIcon className="text-main-purple" size={15} />
      </span>
    </div>
  );
};

export default FilterSearch;

"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/userSlice";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="h-full flex gap-4 flex-col mx-auto py-8 container">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold leading-none">Welcome!</h2>
        <p className="text-muted-foreground leading-none">
          Here&apos;s a list of users.
        </p>
      </div>
      {loading && users.length === 0 ? (
        <p className="flex items-center gap-3 italic">
          <Loader className="w-8 h-8 animate-spin" /> Loading
        </p>
      ) : error && users.length === 0 ? (
        <p className="text-destructive">Error loading users: {error}</p>
      ) : (
        <DataTable columns={columns} data={users} />
      )}
    </div>
  );
}

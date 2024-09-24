"use client";
import { useState } from "react";
import { user } from "../cabins/page";

export default function Counter({ users }: { users: user[] }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

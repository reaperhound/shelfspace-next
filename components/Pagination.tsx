"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div>
      <button>prev</button>
      <button>next</button>
    </div>
  );
}

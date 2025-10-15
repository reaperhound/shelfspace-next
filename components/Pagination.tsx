"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  console.log({ currentPage, totalPages });
  const router = useRouter();

  function handleForward() {
    router.push(`/movies/${Number(currentPage) + 1}`);
  }

  function handleBackWard() {
    router.push(`/movies/${Number(currentPage) - 1}`);
  }
  return (
    <div className='flex justify-center items-center gap-4 mt-5'>
      <button
        onClick={handleBackWard}
        disabled={currentPage === 1}
        className='bg-amber-300 rounded-3xl hover:bg-amber-600 disabled:bg-gray-600'
      >
        <Image
          src={"/arrowLeftCircle.svg"}
          alt='arrow_left'
          width={30}
          height={30}
        />
      </button>
      <span className='text-black'>
        {currentPage}/{totalPages}
      </span>
      <button
        onClick={handleForward}
        disabled={currentPage === totalPages}
        className='bg-amber-300 rounded-3xl hover:bg-amber-600 disabled:bg-gray-600'
      >
        <Image
          src={"/arrowRightCircle.svg"}
          alt='arrow_right'
          width={30}
          height={30}
        />
      </button>
    </div>
  );
}

import { getWatchList } from "../../serverActions/movies";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";

type MovieGridProps = {
  params: Promise<{ page: string }>;
};

export default async function MovieGrid({ params }: MovieGridProps) {
  const { page } = await params;
  const { movies, totalPages } = await getWatchList(page);
  return (
    <div className='w-full grid place-items-center p-[5vh] bg-primary'>
      <div className='grid grid-cols-7 place-items-center gap-x-[13px] gap-y-2 w-fit'>
        {movies.map((movie) => (
          <Card url2x={movie.url2x} key={movie.url2x} />
        ))}
        <Pagination currentPage={Number(page)} totalPages={totalPages} />
      </div>
    </div>
  );
}

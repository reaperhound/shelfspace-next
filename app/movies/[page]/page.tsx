import { getWatchList } from "../../serverActions/movies";
import Card from "../../../components/Card";

type MovieGridProps = {
  params: Promise<{ page: string }>;
};

export default async function MovieGrid({ params }: MovieGridProps) {
  const { page } = await params;
  const movies = await getWatchList(page);
  return (
    <div className='w-full grid place-items-center p-[5vh]'>
      <div className='grid grid-cols-7 place-items-center gap-x-[13px] gap-y-2 w-fit'>
        {movies.map((movie) => (
          <Card url2x={movie.url2x} key={movie.url2x} />
        ))}
      </div>
    </div>
  );
}

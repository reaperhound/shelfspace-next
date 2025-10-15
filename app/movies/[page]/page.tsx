import { Suspense } from "react";
import { getWatchList } from "../../serverActions/movies";
import Card from "../../../components/Card";

export default async function MovieGrid({ params }: any) {
  const { page } = await params;
  const movies = await getWatchList(page);
  return (
    <div className='grid grid-cols-9 gap-[13px] w-full px-[15px] '>
      {movies.map((movie) => (
        <Card url2x={movie.url2x} key={movie.url2x} />
      ))}
    </div>
  );
}

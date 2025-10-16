import { getSeriesAethon } from "@/app/serverActions/books";
import Card from "@/components/Card";

type ExploreBooksProps = {
  params: Promise<{ source: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function ExploreBooks({
  params,
  searchParams,
}: ExploreBooksProps) {
  const { source } = await params;
  const { genre } = await searchParams;
  const books = await getSeriesAethon(genre || "");

  return (
    <div className='w-full grid place-items-center p-[5vh] bg-granny-smith-apple-50'>
      <div className='grid grid-cols-5 place-items-center gap-x-[13px] gap-y-2 w-fit'>
        {books.map((book) => (
          <Card key={book.image} url2x={book.image || ""} />
        ))}
      </div>
    </div>
  );
}

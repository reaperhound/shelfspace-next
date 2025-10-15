import getTBR from "@/app/serverActions/books";
import Card from "@/components/Card";

type BookGridProps = {
  params: Promise<{ page: string }>;
};

export default async function BookGrid({ params }: BookGridProps) {
  const { page } = await params;
  const books = await getTBR(page);
  return (
    <div className='w-full grid place-items-center p-[5vh] bg-granny-smith-apple-50'>
      <div className='grid grid-cols-5 place-items-center gap-x-[13px] gap-y-2 w-fit'>
        {books.map((book) => (
          <Card url2x={book.coverImage} key={book.coverImage} />
        ))}
      </div>
      {/* <Pagination currentPage={Number(page)} totalPages={totalPages} /> */}
    </div>
  );
}

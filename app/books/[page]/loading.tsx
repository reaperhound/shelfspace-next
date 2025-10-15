export default function Loading() {
  return (
    <div className='w-full grid place-items-center p-[5vh] bg-granny-smith-apple-50'>
      <div className='grid grid-cols-5 place-items-center gap-x-[13px] gap-y-2 w-fit'>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className='bg-gray-200/60 w-[182px] h-[273px] rounded-[12px] overflow-hidden animate-pulse' />
  );
}

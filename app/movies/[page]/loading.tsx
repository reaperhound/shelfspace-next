export default function Loading() {
  return (
    <div className='w-full grid place-items-center p-[5vh]'>
      <div className='grid grid-cols-7 place-items-center gap-x-[13px] gap-y-2 w-fit'>
        {Array.from({ length: 28 }).map((_, i) => (
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

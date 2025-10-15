import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className='w-[58px] h-[100vh] bg-granny-smith-apple-300 sticky top-0 flex flex-col items-center py-[15px] shadow-md'>
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt='Logo' width={20} height={20} />
      </Link>
      <div className='mt-[35px] flex flex-col gap-[33px]'>
        <Link href={"/movies/1"}>
          <Image src={"/movie.svg"} alt='Logo' width={20} height={20} />
        </Link>
        <Image src={"/movies.svg"} alt='Logo' width={20} height={20} />
        <Image src={"/movies.svg"} alt='Logo' width={20} height={20} />
        <Image src={"/movies.svg"} alt='Logo' width={20} height={20} />
        <Image src={"/movies.svg"} alt='Logo' width={20} height={20} />
      </div>
      <Image
        src={"/settings.svg"}
        alt='Logo'
        width={20}
        height={20}
        className='absolute bottom-[15px]'
      />
    </div>
  );
}

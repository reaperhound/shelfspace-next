import Image from "next/image";

export default function Sidebar() {
  return (
    <div className='w-[50px] h-[100vh] bg-[#ffffff] flex flex-col items-center py-[15px]'>
      <Image src={"/logo.svg"} alt='Logo' width={20} height={20} />
      <div className='mt-[35px] flex flex-col gap-[33px]'>
        <Image src={"/movies.svg"} alt='Logo' width={20} height={20} />
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

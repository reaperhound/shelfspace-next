import Image from "next/image";

export default function Card({ url2x }) {
  return (
    <div className='bg-red-200 w-[182px] '>
      <Image src={url2x} width={182} height={273} alt='poster' />
    </div>
  );
}

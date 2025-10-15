import Image from "next/image";

type CardProps = {
  url2x: string;
};

export default function Card({ url2x }: CardProps) {
  return (
    <div className='bg-red-200 w-[182px] rounded-[12px] overflow-hidden'>
      <Image src={url2x} width={182} height={273} alt='poster' />
    </div>
  );
}

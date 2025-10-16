import Link from "next/link";
import { getSeriesAethon } from "./serverActions/books";

export default async function Home() {
  const genres = ["fantasy", "science-fiction", "litrpg"];
  const html = await getSeriesAethon(genres[3]);
  return (
    <div className='w-[100vw] h-[100vh] ajmal'>
      <title>Shelf Space</title>
      {/* <p>{JSON.stringify(html)}</p> */}
      {/* <img src={html[0].image} alt='' /> */}
      <ul>
        <li className='font-bold'>Aethon</li>
        {genres.map((genre) => (
          <li key={genre} className='text-blue-600 underline '>
            <Link href={`/reccs/aethon?genre=${genre}`}>{genre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

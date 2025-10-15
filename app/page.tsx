import getTBR from "./serverActions/books";

export default function Home() {
  return (
    <div className='w-[100vw] h-[100vh] ajmal'>
      <title>Shelf Space</title>
      <h1>Dashboard</h1>
      <button className='bg-granny-smith-apple-300' onClick={getTBR}>
        get TBR
      </button>
    </div>
  );
}

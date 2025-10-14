import { getWatchList } from "../serverActions/movies";

export default async function MovieGrid() {
  const html = await getWatchList();
  return (
    <div>
      <title>Movies</title>
      <h1>Movies</h1>
      <p>{html}</p>
    </div>
  );
}

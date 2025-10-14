import { getWatchList } from "../serverActions/movies";

export default async function MovieGrid() {
  const html = await getWatchList();
  console.log("🚀 ~ MovieGrid ~ html:", html.length);
  return (
    <div>
      <title>Movies</title>
      <h1>Movies</h1>
    </div>
  );
}

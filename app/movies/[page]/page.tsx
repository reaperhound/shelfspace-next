import { Suspense } from "react";
import { getWatchList } from "../../serverActions/movies";
import Card from "../../../components/Card";

function Foo({ children }: React.PropsWithChildren) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

export default async function MovieGrid({ params }: any) {
  const { page } = await params;
  const html = await getWatchList(page);
  console.log("🚀 ~ MovieGrid ~ html:", html);
  return (
    <Foo>
      {/* <title>Movies</title> */}
      <div>
        <h1>Movies</h1>
        {html.map((movie) => (
          <Card url2x={movie.url2x} key={movie.url2x} />
        ))}
      </div>
    </Foo>
  );
}

"use server";
import * as cheerio from "cheerio";

type Movie = {
  title?: string;
  slug?: string;
  link?: string;
  fullLink?: string;
  filmId?: string;
  posterUrl?: string;
  year?: string;
  cleanTitle?: string;
};

type GetPosters = Promise<{
  url: string;
  url2x: string;
}>;

export async function getWatchList(pageNum: string) {
  const result = await fetch(
    `https://letterboxd.com/Reaper_Hound/watchlist/page/${pageNum}`
  );
  const html = await result.text();
  const parsedData = parseWithCheerio(html);

  const moviesWithPosters = await Promise.all(
    parsedData.movies
      .filter((movie) => (movie.link ? true : false))
      .map(async (movie) => {
        const posterData = await getPosters(movie.link!);
        return {
          ...movie,
          ...posterData,
        };
      })
  );
  console.log(moviesWithPosters);
  return { totalPages: parsedData.totalPages, movies: moviesWithPosters };
}

async function getPosters(link: string): GetPosters {
  const posterLink = `https://letterboxd.com${link}poster/std/230/?k=5c13e84e`;
  const result = await fetch(posterLink);
  const pstrLink = await result.json();
  return pstrLink;
}

function parseWithCheerio(html: string) {
  const $ = cheerio.load(html);
  const movies: Movie[] = [];

  $(".griditem").each((i, elem) => {
    const reactComponent = $(elem).find('[data-component-class="LazyPoster"]');

    if (reactComponent.length) {
      movies.push({
        title: reactComponent.attr("data-item-name"),
        slug: reactComponent.attr("data-item-slug"),
        link: reactComponent.attr("data-item-link"),
        fullLink: `https://letterboxd.com${reactComponent.attr(
          "data-item-link"
        )}`,
        filmId: reactComponent.attr("data-film-id"),
        posterUrl: reactComponent.attr("data-poster-url"),
        year: reactComponent.attr("data-item-name"),
        cleanTitle: reactComponent.attr("data-item-name"),
      });
    }
  });

  let totalPages = 1;
  $(".paginate-pages ul li").each((i, li) => {
    const aTag = $(li).find("a");
    if (aTag.length) {
      const match = aTag.attr("href")?.match(/page\/(\d+)/);
      if (match) totalPages = Math.max(totalPages, Number(match[1]));
    }
  });

  console.log("🚀 ~ parseWithCheerio ~ totalPages:", totalPages);

  return {
    movies,
    moviesOnPage: movies.length,
    totalPages,
  };
}

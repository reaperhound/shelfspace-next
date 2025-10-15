"use server";
import * as cheerio from "cheerio";

export async function getWatchList(pageNum: number) {
  const result = await fetch(
    `https://letterboxd.com/Reaper_Hound/watchlist/page/${pageNum}`
  );
  const html = await result.text();
  const parsedData = parseWithCheerio(html);

  const moviesWithPosters = await Promise.all(
    parsedData.movies.map(async (movie) => {
      const posterData = await getPosters(movie.link);
      return {
        ...movie,
        ...posterData,
      };
    })
  );

  return moviesWithPosters;
}

async function getPosters(link: string) {
  let posterLink = `https://letterboxd.com${link}poster/std/230/?k=5c13e84e`;
  const result = await fetch(posterLink);
  const pstrLink = await result.json();
  return pstrLink;
}

function parseWithCheerio(html: string) {
  const $ = cheerio.load(html);

  const totalEntries = $(".js-watchlist-content").attr("data-num-entries");
  const movies = [];

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

  return {
    totalCount: parseInt(totalEntries),
    movies,
    moviesOnPage: movies.length,
  };
}

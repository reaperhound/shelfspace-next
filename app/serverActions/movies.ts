"use server";

export async function getWatchList() {
  const result = await fetch("https://letterboxd.com/Reaper_Hound/watchlist/");
  const html = result.text();
  return html;
}

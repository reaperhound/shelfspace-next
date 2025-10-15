"use server";
import * as cheerio from "cheerio";

export default async function getTBR() {
  const result = await fetch(
    "https://app.thestorygraph.com/to-read/eithan_arellius",
    {
      headers: {
        Cookie:
          "cf_clearance=rd5Y7gBfU.EsQNzumou0y0DN26enL5xZZv_sQp59eXw-1760543428-1.2.1.1-z0uAhro2nv4ruq8AYjm48vDwZowtqJwbhDmvL6hK61h2tbZCOhn4c2dmO4PFDQgazSj5RLecMlwDWg7Onunj0dToT1Q9BourBc8JZ8STFaT7LJaaI5glw6AnU9ata3uXK4kCLD.bkpf0tU2f4oT5Y4ZcBw91t9iJP2q.YsiAd5RxKZx5E2ra8F24ssgET1zvPZgl.bvivR7xWh0Tc_8RSCKfSUoYb0bUEVrpJS1nidc; _storygraph_session=f%2BicTBaWFNZd2rrWGRbTeWYHZalPoJtnEYTwgVlnzMOdikBlcGTlJBqEsCD4HwC3aXwCItttkuNYuHlZvpuSFuTmdrby3GW7yq3ftEbOiNEfEyXIXAztp5ljDdHSArobuNbMdFLa3a7eS7C7H6D2P%2B%2B%2Fyd0QKrND1f3eJjE3b6ocG2%2BlQNhrRTk%2BX3xri8iRk7fGclFXWmSptZhCNTgeVcAjESCnW8WcF5kRo0F4nG%2BsZUwOo4NzhrV%2B1uTZ0yND13amg9bHK4V9DaoRx0mpt8kihXLU1%2F%2Fc8VJkBR%2FmiTir7bL%2B1tBXOExu6OmUJjEYmA%3D%3D--LKpQ6HS%2Bju2oqtQh--lFDua1v8VzKrnt9jxe3Lqg%3D%3D; up_next_onboarding=true",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0",
      },
    }
  );

  const html = await result.text();
  const parsed = parseBookHtml(html);
  console.log("🚀 ~ getTBR ~ parsed:", parsed);
  return html;
}

function parseBookHtml(html: string) {
  const $ = cheerio.load(html);
  const booksMap = new Map<string, any>();
  $(".cover-image-column").each((_, elem) => {
    const container = $(elem).closest("div.grid");
    const bookId = container.find(".edition-info").attr("data-book-id");
    if (!bookId || booksMap.has(bookId)) return; // skip duplicates

    const title = container
      .find(".book-title-author-and-series h3 a")
      .first()
      .text()
      .trim();
    const seriesLinks = container.find(".book-title-author-and-series p a");
    const series = seriesLinks.eq(0).text().trim();
    const seriesNumber = seriesLinks.eq(1).text().trim();
    const author = container
      .find(".book-title-author-and-series p a[href^='/authors/']")
      .text()
      .trim();
    const coverImage = $(elem).find(".book-cover img").attr("src");

    const editionInfo = container
      .find(".toggle-edition-info-link")
      .text()
      .trim();
    const [pages, format, year] = editionInfo.split("•").map((s) => s.trim());

    const isbn = container
      .find(".edition-info p:contains('ISBN/UID')")
      .text()
      .replace("ISBN/UID:", "")
      .trim();
    const publisher = container
      .find(".edition-info p:contains('Publisher')")
      .text()
      .replace("Publisher:", "")
      .trim();

    const tags: string[] = [];
    container.find(".book-pane-tag-section span").each((_, t) => {
      tags.push($(t).text().trim());
    });

    booksMap.set(bookId, {
      title,
      series,
      seriesNumber,
      author,
      coverImage,
      pages,
      format,
      year,
      isbn,
      publisher,
      tags,
    });
  });

  const books = Array.from(booksMap.values());

  return books;
}

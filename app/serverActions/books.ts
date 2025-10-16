"use server";
import * as cheerio from "cheerio";

interface Book {
  title: string;
  series: string;
  seriesNumber: string;
  author: string;
  coverImage?: string;
  pages?: string;
  format?: string;
  year?: string;
  isbn?: string;
  publisher?: string;
  tags: string[];
}

export default async function getTBR(pageNum: string) {
  const result = await fetch(
    `https://app.thestorygraph.com/to-read/eithan_arellius?page=${pageNum}`,
    {
      headers: {
        Cookie:
          "_storygraph_session=7CP2fePJ5vLIu%2F16qSscyeJMEtJcTA1KpZB9EPj7JKk%2FqftaJdsxsf0w0ky05x5LS9D6Qea6C2hsU0PN9cWlljMW5cJgwsSugPWPkEERSKJFNFgLA%2BDJIdzlNrHMLdhp9P9tlIxwDj9Ggv6Abe08ucxVNGoN%2BseZalrcBR8dJVUWjgPqd19yj6UQC%2BlWSNm2huJnkUn7zeLB%2Fy%2BtdK4zjDv0PGHgT4gHi1rBX5dqMdNU2ndOlJElHF557MbxstCQjNN4MA6lsCSpq1BhxJgkiBHS9B2xuAarkuQJQHKCmnFsaOXB4DCNb%2Fazw8PjETV9c%2BGTABkx15rH3k1%2Fm1UwSz6cSjaS1dy18trKr40PIFj8WqqrqpkYKviIG%2FIZItfK6h6Y8bfJ%2BESZpNLd3zNM9uH19OtbQ7gX4r1%2FYAvvHjJS2fLQw1IQfrmiCPMqNK4qJTp5aXytJ3%2F4FB5MoSNQPi%2B2I0Eid2%2BiTvoHV6wTHBUTJrcPBjEySJD6bFNWIaWgmyJo6eYetwsGoaWUYpE7E6Y1TZsvW6eGmSEZwrEbU%2B9O%2FAuAhnLwOef8NyCgRZOH0%2Bjn2MiQYEjegALi2vKp%2FSODUZ5f--MAKy3Mo4FiJMqE%2F%2F--5bNOuseogigp8FUHF5bxRw%3D%3D; remember_user_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6Ilcxc2laRFE1WkRneFl6SXROalF4TkMwMFlUUTRMVGhpWWpZdFl6RmpOR1V4T1RnM1pqZ3lJbDBzSWlReVlTUXhNU1JvYmxNMGJucHhSaTloWlRaYVluZ3pZMUptUjNKbElpd2lNVGMxTkRnd05UUTVOeTQwTmpJek5qUWlYUT09IiwiZXhwIjoiMjA0NS0wOC0xMFQwNTo1ODoxNy40NjJaIiwicHVyIjoiY29va2llLnJlbWVtYmVyX3VzZXJfdG9rZW4ifX0%3D--65f6b29c9e7f12b657d896643a6a8e3d2333d5fb; cookies_popup_seen=yes; up_next_onboarding=true; cf_clearance=am5T9mKH_r2VJZeaEKgK.oLDLZT74AqBB5y6jp3oaDs-1759853585-1.2.1.1-H2gJpG9igmVqOeYFjjCeXzWZ81I3_NPeKFOUy.NwfpKQABoddLYR9p02jIBs.Ayge5cHZEr04Z6ND1QT3fGLftyvvaDyxVHkCWGnZmhMwhXpU68qeu8qVhAmfh1OG5Ea.Nx9T2oIi.GDDOiV.9FblJ7eW5Mh5G_xegP6UCQmG0G50ACpEgOrsy4kAXL3doFFYehp5MM5W3eZtOXmu0FGwADELgb3Cvahsl5ci9DvPo8; plus_popup_seen=yes",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0",
      },
    }
  );

  const html = await result.text();
  const parsed = parseBookHtml(html);
  return parsed;
}

function parseBookHtml(html: string) {
  const $ = cheerio.load(html);
  const booksMap = new Map<string, Book>();
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

  const filterText = $("span.font-semibold.align-middle").text().trim();
  const match = filterText.match(/Filter list \((\d+) books\)/);
  let numberOfBooks = 0;
  if (match) {
    numberOfBooks = parseInt(match[1], 10);
  }
  console.log(numberOfBooks); // 412

  const books = Array.from(booksMap.values());

  return { books, totalBooks: numberOfBooks };
}

// --Aethon Books
export async function getSeriesAethon(genre: string) {
  const result = await fetch(`https://aethonbooks.com/${genre}/`);
  const html = await result.text();

  const $ = cheerio.load(html);
  const books: {
    title: string;
    link: string | undefined;
    image: string | undefined;
  }[] = [];

  $(".mfs-multi-tax-link").each((_, el) => {
    const elem = $(el);
    books.push({
      title: elem.find(".tax-list-title").text().trim(),
      link: elem.attr("href"),
      image: elem.find("img").attr("src"),
    });
  });

  return books;
}

// NYRB Classsics
export async function getNYRBClassics(page: string) {
  const result = await fetch(
    `https://www.nyrb.com/collections/classics?page=${page}`
  );
  const html = await result.text();
  const $ = cheerio.load(html);
  const books: {
    title: string;
    link: string;
    image: string;
    author?: string;
    price?: string;
  }[] = [];

  $(".card__inner").each((_, el) => {
    const element = $(el);

    const title = element.find(".card__heading a").first().text().trim();

    const link = element.find(".card__heading a").first().attr("href") || "";

    const image =
      element.find("img").first().attr("src")?.replace(/^\/\//, "https://") ||
      ""; // convert //cdn to full URL

    // author can appear outside .card__inner, so we’ll look at the nearest sibling
    const author =
      element
        .next(".card__content")
        .find(".author")
        .text()
        .trim()
        .replace(/\s+/g, " ") || "";

    // optional: try to extract price if the price section is uncommented
    const price =
      element
        .next(".card__content")
        .find(".price-item--regular")
        .first()
        .text()
        .trim() || "";

    books.push({ title, link, image, author, price });
  });

  return books;
}

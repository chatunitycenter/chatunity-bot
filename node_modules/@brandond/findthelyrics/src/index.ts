import * as cheerio from "cheerio";

export async function find_lyrics(query_string: string): Promise<string | Error> {
    if (!query_string)
        return new Error("Query string required.");

    const query = encodeURI(query_string).replace(" ", "+");

    const genius_search = await fetch("https://genius.com/api/search/song?page=1&q=" + query)
        .then((response) => { return response.json(); })
        .catch((error) => { return error.message ? error : new Error(error); });
    if (genius_search instanceof Error)
        return genius_search;

    if (genius_search.response.sections[0].hits[0]) {
        const genius_result = await fetch("https://genius.com" + genius_search.response.sections[0].hits[0].result.path)
            .then((response) => { return response.text(); })
            .catch((error) => { return error.message ? error : new Error(error); });
        if (genius_result instanceof Error)
            return genius_result;

        const elements = cheerio.load(genius_result)("div[data-lyrics-container|=true]");
        if (elements.text()) {
            let lyrics = "";
            elements.each((_, elem) => {
                lyrics += cheerio.load(cheerio.load(elem).html().replace(/<br>/gi, "\n")).text();
                lyrics += "\n";
            });
            return lyrics;
        }
    }

    const musix_search = await fetch("https://www.musixmatch.com/search/" + query)
        .then((response) => { return response.text(); })
        .catch((error) => { return error.message ? error : new Error(error); });
    if (musix_search instanceof Error)
        return musix_search;

    const musix_first_element = cheerio.load(musix_search)(".media-card-title a")[0];
    if (musix_first_element) {
        const musix_result = await fetch("https://www.musixmatch.com" + musix_first_element.attribs.href)
            .then((response) => { return response.text(); })
            .catch((error) => { return error.message ? error : new Error(error); });
        if (musix_result instanceof Error)
            return musix_result;

        const lyrics = cheerio.load(musix_result)(".mxm-lyrics .lyrics__content__ok");
        if (lyrics)
            return lyrics.text();
    }

    return new Error(`Could not find lyrics for: "${query_string}"`);
}

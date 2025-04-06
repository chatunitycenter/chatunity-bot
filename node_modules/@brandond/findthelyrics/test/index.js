import { find_lyrics } from "../dist/index.js";

const lyrics = await find_lyrics("Fitz and The Tantrums I Just Wanna Shine");
if (lyrics instanceof Error) {
    console.error(lyrics);
} else {
    console.log(lyrics);
    // [Chorus]
    // I just wanna shine like the sun when it comes up
    // Run the city from the rooftops
    // 'Cause today’s gonna be my day
    // I just wanna climb to the top of a mountain
    // Standing tall when I'm howlin'
    // ...
}

const expect = require("unexpected");

const {getLyrics, setApiKey} = require("../index")

describe("getLyrics", () => {
    context("when searching a known hit", () => {
        let lyrics;
        const artistName = "Foo Fighters";
        const trackName = "Times Like These";

        beforeEach(async () => {
            lyrics = await getLyrics(artistName, trackName);
        });

        it("should return a lyrics object", () => {
            expect(lyrics, "to be an", "object");
            expect(lyrics, "to only have properties", ["explicit", "lyrics"]);
            expect(lyrics.explicit, "to be a", "boolean");
            expect(lyrics.lyrics, "to be a", "string");
        });
    });

    context("when searching an unknown track", () => {
        it("should return an empty array", async () => {
            const lyrics = await getLyrics(
                "ARTIST_NAME_DOES_NOT_EXIST-sdfkjhvbdfkjvbdkjfvbdjlkfvbd",
                "TRACK_NAME_DOES_NOT_EXIST-sdflkjbsdkjbsdfkjbnsdfbkjnsdfkbjn"
            );

            expect(lyrics, "to be null");
        });
    });

    context("when not passing the track name", () => {
        it("should complain that track name is required", async () => {
            const lyrics = await getLyrics("Some band");
            expect(lyrics, "to have message", "Track name required");
        });
    });

    context("when not passing any parameters", () => {
        it("should complain that artist name is required", async () => {
            const lyrics = await getLyrics();
            expect(lyrics, "to have message", "Artist name required");
        });
    });

    context("when not setting the API key", () => {
        beforeEach(() => setApiKey(""));

        it("should complain that API key is required", async () => {
            const lyrics = await getLyrics();
            expect(lyrics, "to have message", "MusicMatch API key required");
        });
    });
});
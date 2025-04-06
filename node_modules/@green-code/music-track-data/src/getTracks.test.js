const expect = require("unexpected");

const {getTracks} = require("../index")

describe("getTracks", () => {
    const trackName = "Times Like These";

    context("when searching a known hit", () => {
        let tracks;

        beforeEach(async () => {
            tracks = await getTracks(trackName);
        });

        it("should return a non-empty array", () => {
            expect(tracks, "to be an", "array");
            expect(tracks, "to be non-empty");
        });

        it("should return an array of track objects", () => {
            tracks.forEach(track => {
                expect(track, "to be an", "object");
                expect(track, "to only have properties", ["id", "title", "artist", "preview", "album"]);
                expect(track.id, "to be greater than or equal to", 0);
                expect(track.title, "to contain", trackName);
                expect(track.artist, "to be a", "string");
                expect(track.preview, "to start with", "http");
                expect(track.album, "to be an", "object");
                expect(track.album.title, "to be a", "string");
                expect(track.album.artwork, "to start with", "http");
            });
        });
    });

    context("when searching an unknown track", () => {
        it("should return an empty array", async () => {
            const tracks = await getTracks("TRACK_NAME_DOES_NOT_EXIST-sdflkjbsdkjbsdfkjbnsdfbkjnsdfkbjn");
            expect(tracks, "to be empty");
        });
    });

    context("when not passing a track name", () => {
        it("should return an error", async () => {
            const tracks = await getTracks();
            expect(tracks, "to have message", "Track name required");
        });
    });
});
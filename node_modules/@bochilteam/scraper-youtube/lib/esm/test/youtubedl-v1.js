import { youtubedl } from '../index.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import got from 'got';
const YT_URL = 'https://youtu.be/iik25wqIuFo';
describe('Youtube Download V1', () => {
    let data;
    it('Getting metadata', async () => {
        data = await youtubedl(YT_URL);
    });
    let videoUrl;
    it('Getting video download link', async (t) => {
        if (!data)
            return t.skip('Test skipped -- error in getting metadata!');
        const keys = Object.keys(data.video);
        videoUrl = await data.video[keys[1]].download();
    });
    it('Download video', async (t) => {
        if (!videoUrl)
            return t.skip('Test skipped -- error getting the video download link!');
        const res = await got(videoUrl).buffer();
        assert.ok(res.byteLength > 0);
    });
    let audioUrl;
    it('Getting audio download link', async (t) => {
        if (!data)
            return t.skip('Test skipped -- error in getting metadata!');
        const keys = Object.keys(data.audio);
        audioUrl = await data.audio[keys[0]].download();
    });
    it('Download audio', async (t) => {
        if (!audioUrl)
            return t.skip('Test skipped -- error getting the audio download link!');
        const res = await got(audioUrl).buffer();
        assert.ok(res.byteLength > 0);
    });
});

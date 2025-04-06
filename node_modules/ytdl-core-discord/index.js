const ytdl = require('ytdl-core');
const prism = require('prism-media');
const { pipeline } = require('stream');

function filter(format) {
	return format.codecs === 'opus' &&
		format.container === 'webm' &&
		format.audioSampleRate == 48000;
}

/**
 * Tries to find the highest bitrate audio-only format. Failing that, will use any available audio format.
 * @private
 * @param {Object[]} formats The formats to select from
 * @param {boolean} isLive Whether the content is live or not
 */
function nextBestFormat(formats, isLive) {
	let filter = format => format.audioBitrate;
	if (isLive) filter = format => format.audioBitrate && format.isHLS;
	formats = formats
		.filter(filter)
		.sort((a, b) => b.audioBitrate - a.audioBitrate);
	return formats.find(format => !format.bitrate) || formats[0];
}

const noop = () => {};

async function download(url, options = {}) {
	const info = await ytdl.getInfo(url);
	// Prefer opus
	const format = info.formats.find(filter);
	const canDemux = format && info.videoDetails.lengthSeconds != 0;
	if (canDemux) options = { ...options, filter };
	else if (info.videoDetails.lengthSeconds != 0) options = { ...options, filter: 'audioonly' };
	if (canDemux) {
		const demuxer = new prism.opus.WebmDemuxer();
		return pipeline([
			ytdl.downloadFromInfo(info, options),
			demuxer,
		], noop);
	} else {
		const bestFormat = nextBestFormat(info.formats, info.videoDetails.isLiveContent);
		if (!bestFormat) throw new Error('No suitable format found');
		const transcoder = new prism.FFmpeg({
			args: [
				'-reconnect', '1',
				'-reconnect_streamed', '1',
				'-reconnect_delay_max', '5',
				'-i', bestFormat.url,
				'-analyzeduration', '0',
				'-loglevel', '0',
				'-f', 's16le',
				'-ar', '48000',
				'-ac', '2',
			],
			shell: false,
		});
		const opus = new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 });
		return pipeline([transcoder, opus], noop);
	}
}

module.exports = Object.assign(download, ytdl);

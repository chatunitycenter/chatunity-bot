## shazamio-core

This is a fork of [shazamio-core](https://github.com/shazamio/shazamio-core) for WebAssembly

## Installation

```
npm install shazamio-core
```

## Types

```ts
class DecodedSignature {
	readonly number_samples: number; // Number of samples used for this signature
	readonly samplems: number; // Number of ms of audio this sample contains
	readonly uri: string; // Signature data
}
```

## Examples

### Node.js

```ts
import { recognizeBytes } from "shazamio-core";
import { readFileSync } from "fs";

const songBytes = readFileSync("./my_song.flac");
const signatures: DecodedSignature[] = recognizeBytes(songBytes);
for (const signature of signatures) {
	console.log(`This sample contains ${signature.samplems}ms of audio, ${signature.number_samples} samples.`);
	// Make sure you free an objects memory when you're done with it!
	signature.free();
	// Accessing properties of signature after freeing memory will throw an exception.
}
```

### Web

```ts
import initShazamio, { recognizeBytes } from "shazamio-core/web";
await initShazamio();

// Get bytes from a File in browser from the user
const songBytes = new Uint8Array(await file.arrayBuffer());
const signatures: DecodedSignature[] = recognizeBytes(songBytes);

// Always free memory when done!
for (const sig of signatures) sig.free();
```

<br/>

## Methods

### recognizeBytes

Recognizes an audio fingerprint fron song bytes and returns decoded signatures.

```ts
function recognizeBytes(bytes: Uint8Array, offset?: number, seconds?: number): DecodedSignature[];
```

#### Parameters

- `bytes` - Bytes of the song file
- `offset` - When to start sampling from in seconds
- `seconds` - Seconds to sample from offset

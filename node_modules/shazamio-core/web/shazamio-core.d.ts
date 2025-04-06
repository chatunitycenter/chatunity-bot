/* tslint:disable */
/* eslint-disable */
/**
* Recognizes an audio fingerprint fron song bytes and returns decoded signatures.
* # Arguments
* * `bytes` - Bytes of the song file
* * `offset` - When to start sampling from in seconds
* * `seconds` - Seconds to sample from offset
* @param {Uint8Array} bytes
* @param {number | undefined} [offset]
* @param {number | undefined} [seconds]
* @returns {(DecodedSignature)[]}
*/
export function recognizeBytes(bytes: Uint8Array, offset?: number, seconds?: number): (DecodedSignature)[];
/**
*/
export function start(): void;
/**
*/
export class DecodedSignature {
  free(): void;
/**
* @param {Float32Array} f32_buffer
* @param {number} orig_sample_rate_hz
* @param {number} orig_channel_count
* @returns {DecodedSignature}
*/
  static new(f32_buffer: Float32Array, orig_sample_rate_hz: number, orig_channel_count: number): DecodedSignature;
/**
*/
  readonly number_samples: number;
/**
*/
  readonly samplems: number;
/**
*/
  readonly uri: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_decodedsignature_free: (a: number) => void;
  readonly decodedsignature_new: (a: number, b: number, c: number, d: number) => number;
  readonly decodedsignature_uri: (a: number, b: number) => void;
  readonly decodedsignature_samplems: (a: number) => number;
  readonly decodedsignature_number_samples: (a: number) => number;
  readonly recognizeBytes: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly start: () => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

export declare class ComplexNumber {
    real: number;
    imag: number;
    constructor(real: number, imag: number);
    static add(a: ComplexNumber, b: ComplexNumber): ComplexNumber;
    static subtract(a: ComplexNumber, b: ComplexNumber): ComplexNumber;
    static multiply(a: ComplexNumber, b: ComplexNumber): ComplexNumber;
}
export declare function fft(input: ComplexNumber[]): ComplexNumber[];

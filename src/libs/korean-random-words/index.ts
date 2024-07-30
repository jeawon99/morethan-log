import { nouns, adjectives, firstAdjSuffixes } from './words';

const getRandElem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

interface PhraseGenOptions {
    delimiter?: string;
    customNouns?: string[];
    customAdjectives?: string[];
    adjSuffix?: string;
    seed?: number;
}

class PhraseGen {
    private adjSuffix?: string;
    private nouns: string[];
    private adjectives: string[];
    private delimiter: string;
    private randFunc: () => number;

    constructor({
        delimiter = '-',
        customNouns,
        customAdjectives,
        adjSuffix,
        seed,
    }: PhraseGenOptions = {}) {
        this.adjSuffix = adjSuffix;
        this.nouns = customNouns || nouns;
        this.adjectives = customAdjectives || adjectives;
        this.delimiter = delimiter;

        if (seed !== undefined) {
            this.randFunc = seededRandom(seed);
        } else {
            this.randFunc = Math.random;
        }

        Object.preventExtensions(this);
    }

    private getRandElem(arr: string[]): string {
        return arr[Math.floor(this.randFunc() * arr.length)];
    }

    generatePhrase({ array = false }: { array?: boolean } = {}): string | string[] {
        const phraseBlocks = [
            this.getRandElem(this.adjectives) + (this.adjSuffix || this.getRandElem(firstAdjSuffixes)),
            `${this.getRandElem(this.adjectives)}한`,
            this.getRandElem(this.nouns),
        ];

        return array ? phraseBlocks : phraseBlocks.join(this.delimiter);
    }

    getNoun(): string {
        return this.getRandElem(this.nouns);
    }

    getAdjective(suffix = '하다'): string {
        return this.getRandElem(this.adjectives) + suffix;
    }

    set(props: Partial<PhraseGenOptions>): void {
        Object.entries(props).forEach(([k, v]) => { (this as any)[k] = v; });
    }
}

function seededRandom(seed: number): () => number {
    return function() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

export default PhraseGen;

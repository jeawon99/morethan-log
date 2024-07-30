import PhraseGen from '../libs/korean-random-words';

function generateSeed(userId: string, slug: string): number {
    let seed = 0;
    for (let i = 0; i < userId.length; i++) {
        seed += userId.charCodeAt(i);
    }
    for (let i = 0; i < slug.length; i++) {
        seed += slug.charCodeAt(i);
    }
    return seed;
}

export function generateKoreanPhrase(userId: string, slug: string): string {
    const seed = generateSeed(userId, slug);
    console.log(seed);
    const phraseGen = new PhraseGen({ seed });

    const phrase = phraseGen.generatePhrase();
    if (typeof phrase === 'string') {
        return phrase;
    } else {
        // 배열인 경우, 문자열로 변환하여 반환 (필요에 따라 적절한 변환 로직 추가)
        return phrase.join(' ');
    }
}

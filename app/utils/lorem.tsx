import { LoremIpsum } from "lorem-ipsum";

export const stringGen = new LoremIpsum({
	wordsPerSentence: { min: 6, max: 8 },
	sentencesPerParagraph: { min: 5, max: 7 }
});

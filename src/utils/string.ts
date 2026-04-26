export function removeColorCodingFromWord(word: string) {
    if (word.includes("|cff")) {
        //iterate through word, find every point where there is a |cff then remove the following 9 characters from the word
        for (let x = 0; x < word.length; x++) {
            const char = word[x];
            //Color code sequence detected

            if (char === "|" && word[x + 1] === "c" && word[x + 2] === "f" && word[x + 3] === "f") {
                //remove the color formatting characters
                const chars = word.split("");

                for (let i = x; i < x + 10; i++) {
                    chars[i] = "";
                }

                word = chars.join("");
            }
        }
        //remove the terminating character sequence from color encoding.
        word = word.replaceAll("|r", "");

        return word;
    }
    return word;
}

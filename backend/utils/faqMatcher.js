export const findBestFaq = (userQuestion, faqs) => {
  const qWords = userQuestion
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 2); // ignore tiny words

  let bestFaq = null;
  let bestScore = 0;

  for (const faq of faqs) {
    const text = (faq.question + " " + faq.answer).toLowerCase();
    let score = 0;

    for (const word of qWords) {
      if (text.includes(word)) {
        score++;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestFaq = faq;
    }
  }

  return { bestFaq, bestScore };
};

export const findBestFaq = (userQuestion, faqs) => {
  const qWords = userQuestion.toLowerCase().split(/\W+/).filter(Boolean);

  let bestFaq = null;
  let bestScore = -1;

  for (const faq of faqs) {
    const text =
      (faq.question + " " + faq.answer).toLowerCase();
    let score = 0;

    for (const w of qWords) {
      if (text.includes(w)) score++;
    }

    if (score > bestScore) {
      bestScore = score;
      bestFaq = faq;
    }
  }

  // fallback to first if nothing matches
  return bestFaq || faqs[0];
};

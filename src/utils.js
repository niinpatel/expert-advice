export const endsWithQuestionMark = text => {
    const trimmedText = text.trim()
    return trimmedText[trimmedText.length - 1] === '?'
  }
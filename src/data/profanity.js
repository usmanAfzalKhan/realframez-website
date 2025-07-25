// src/data/profanity.js
import Filter from 'bad-words'

// initialize with the default lists…
const filter = new Filter()

// …then add any custom words you absolutely need to catch:
filter.addWords(
  // English
  'damn','bastard','bitch','asshole',
  // Spanish
  'mierda','cabron',
  // French
  'putain','merde',
  // Hindi (romanized)
  'chutiya','bhosdi',
  // Urdu (romanized)
  'madarchod','lund',
  // …etc, whichever handful of extra words you really care about
)

export default filter

# Emoji Country Flags

Convert country codes to emoji flags.

## Install

```sh
npm install emoji-country-flags
```

## Usage

```typescript
import { codeToEmoji, flagToCountry } from 'emoji-country-flags';

const flag = codeToEmoji('GBR'); // '🇬🇧'
const country = flagToCountry('🇬🇧'); // Full country object
```

## Country Example

```json
{
  "name": "Germany",
  "codes": {
    "alpha_2": "DE",
    "alpha_3": "DEU"
  },
  "emoji": "🇩🇪"
}
```
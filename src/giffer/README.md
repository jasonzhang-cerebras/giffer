# Giffer - Multi-Source GIF Generator

Generate GIFs from text descriptions without using AI models or API keys.

## Features

- **Multiple Image Sources**: 8 different approaches without API keys
- **Advanced NLP**: Keyword extraction with stemming, synonyms, and semantic expansion
- **Multi-language Support**: Supports multiple languages with automatic translation
- **Interactive Selection**: Choose your favorite GIF from multiple options
- **No API Keys Required**: All sources work without authentication

## Image Sources

### 1. Lorem Picsum (`lorem-picsum`)

- Real photography from Lorem Picsum
- Uses keywords as seeds for consistent results
- High-quality, professional photos
- **Best for**: Realistic photography style

### 2. Placeholder (`placeholder`)

- Placeholder graphics with keyword text overlays
- Customizable colors and gradients
- Clean, modern design
- **Best for**: Wireframes, prototypes, showing keywords

### 3. Emoji (`emoji`)

- Emoji-based graphics with keyword representations
- Fun and visual approach
- Maps keywords to relevant emojis
- **Best for**: Playful, simple graphics

### 4. Canvas (`canvas`)

- Programmatic graphics with shapes and gradients
- Color palettes based on keywords
- SVG-based, scalable
- **Best for**: Custom graphics, artistic style

### 5. Pattern (`pattern`)

- Geometric patterns (stripes, dots, grids, waves, triangles)
- Color palettes based on keywords
- Multiple pattern variations
- **Best for**: Textured backgrounds, decorative graphics

### 6. Abstract Art (`abstract-art`)

- Abstract shapes and compositions
- Multiple art styles (geometric, organic, minimal, chaotic)
- Color palettes based on keywords
- **Best for**: Artistic, creative graphics

### 7. Gradient (`gradient`)

- Beautiful color gradients
- Multiple gradient types (linear, radial, conic)
- Color schemes based on keywords
- **Best for**: Smooth, modern backgrounds

### 8. Icon (`icon`)

- Simple icon-like graphics
- Maps keywords to relevant icons
- Multiple icon styles (simple, framed, patterned, multiple)
- **Best for**: Symbolic representations, icons

## Usage

```bash
opencode giffer <description> [options]
```

### Options

- `-s, --source <name>`: Image source to use (lorem-picsum, placeholder, emoji, canvas, pattern, abstract-art, gradient, icon)
- `--all`: Generate GIFs from all sources (default: true)
- `-i, --interactive`: Interactive mode to select from generated GIFs
- `-o, --output <path>`: Output file path
- `-f, --frames <number>`: Number of frames (default: 5)
- `-d, --duration <number>`: Duration per frame in ms (default: 500)
- `-l, --language <code>`: Language code (auto-detect if not specified)
- `--width <number>`: GIF width in pixels (default: 400)
- `--height <number>`: GIF height in pixels (default: 300)

### Examples

Generate from all sources (default):

```bash
opencode giffer "a beautiful sunset"
```

Use specific source:

```bash
opencode giffer "cats playing" --source emoji
```

Interactive selection:

```bash
opencode giffer "mountains with snow" --interactive
```

Custom settings:

```bash
opencode giffer "ocean waves" --frames 8 --duration 300 --width 500
```

Non-English description:

```bash
opencode giffer "un gato durmiendo" --language es
```

Save to specific file:

```bash
opencode giffer "sunset over ocean" --output sunset.gif
```

## How It Works

1. **Extract Keywords**: Extracts relevant keywords from your description using advanced NLP
2. **Language Detection**: Detects language and translates to English if needed
3. **NLP Processing**: Applies stemming, synonym expansion, and semantic categorization
4. **Generate Images**: Creates images from selected source(s)
5. **Create GIF**: Downloads and resizes images, then creates animated GIF
6. **Selection**: In interactive mode, lets you choose your favorite

## NLP Features

### Stemming

- Converts words to their root form: "cats" → "cat", "running" → "run"
- Improves keyword matching across different word forms

### Synonym Expansion

- Expands keywords with related terms: "happy" → "joyful", "glad", "cheerful"
- Increases the chance of finding relevant images

### Semantic Categorization

- Groups related concepts: "cat" → "kitten", "feline", "dog", "bird"
- Provides broader context for image generation

### Keyword Scoring

- Prioritizes original keywords over expanded ones
- Ensures the most relevant keywords are used

## Supported Languages

- English (en), Spanish (es), French (fr), German (de)
- Chinese (zh), Japanese (ja), Korean (ko)
- Russian (ru), Arabic (ar)

## Output Files

When generating from all sources, files are named:

- `giffer-lorem-picsum-{timestamp}.gif`
- `giffer-placeholder-{timestamp}.gif`
- `giffer-emoji-{timestamp}.gif`
- `giffer-canvas-{timestamp}.gif`
- `giffer-pattern-{timestamp}.gif`
- `giffer-abstract-art-{timestamp}.gif`
- `giffer-gradient-{timestamp}.gif`
- `giffer-icon-{timestamp}.gif`

## Troubleshooting

**"Failed to download image"**

- Check your internet connection
- Some sources may be temporarily unavailable

**"No images to generate GIF"**

- Try different keywords
- Some sources may not have matching content

**Interactive mode not working**

- Ensure you're running in a terminal that supports interactive prompts
- Use `--interactive` flag explicitly

**Keywords not matching expected content**

- Try using more specific keywords
- The NLP system expands keywords, so try related terms
- Check if the keyword is in the source's mapping

## Tips

- Use `--all` to see all options, then pick your favorite
- Lorem Picsum gives the most realistic results
- Placeholder is great for showing what keywords were used
- Emoji is fun and playful
- Canvas offers artistic, colorful graphics
- Pattern provides textured backgrounds
- Abstract Art creates unique compositions
- Gradient gives smooth, modern looks
- Icon is perfect for symbolic representations

## License

Part of the opencode project.

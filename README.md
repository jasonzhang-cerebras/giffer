# Giffer - Multi-Source GIF Generator

Generate GIFs from text descriptions without using AI models or API keys.

## Features

- **Multiple Image Sources**: 4 different approaches without API keys
- **Keyword Extraction**: Automatically extracts relevant keywords from descriptions
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
- Customizable colors and text
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

## Installation

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0) or Node.js (>= 18.0.0)
- Git

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/giffer.git
cd giffer

# Install dependencies
bun install

# Verify installation
bun test
```

### Quick Start

```bash
# Generate GIFs from all sources (default)
bun run dev "a beautiful sunset over the ocean"

# Use a specific source
bun run dev "cats playing" --source placeholder

# Interactive mode to select your favorite
bun run dev "mountains with snow" --interactive
```

## Usage

```bash
giffer <description> [options]
```

### Options

- `-s, --source <name>`: Image source to use (lorem-picsum, placeholder, emoji, canvas)
- `--all`: Generate GIFs from all sources (default: true)
- `-i, --interactive`: Interactive mode to select from generated GIFs
- `-o, --output <path>`: Output file path
- `-f, --frames <number>`: Number of frames (default: 5)
- `-d, --duration <number>`: Duration per frame in ms (default: 500)
- `-l, --language <code>`: Language code (auto-detect if not specified)
- `--width <number>`: GIF width in pixels (default: 400)
- `--height <number>`: GIF height in pixels (default: 300)

### Examples

```bash
# Generate from all sources (default)
giffer "a beautiful sunset"

# Use specific source
giffer "cats playing" --source emoji

# Interactive selection
giffer "mountains with snow" --interactive

# Custom settings
giffer "ocean waves" --frames 8 --duration 300 --width 500

# Non-English description
giffer "un gato durmiendo" --language es

# Save to specific file
giffer "sunset over ocean" --output sunset.gif
```

## How It Works

1. **Extract Keywords**: Extracts relevant keywords from your description
2. **Language Detection**: Detects language and translates to English if needed
3. **Generate Images**: Creates images from selected source(s)
4. **Create GIF**: Downloads and resizes images, then creates animated GIF
5. **Selection**: In interactive mode, lets you choose your favorite

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

## Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test test/giffer.test.ts
```

## After Installation Verification

```bash
# 1. Verify dependencies are installed
bun --version

# 2. Run tests to ensure everything works
bun test

# 3. Test basic functionality
bun run dev "a beautiful sunset"

# 4. Test all sources
bun run dev "cats playing" --source emoji
bun run dev "mountains" --source placeholder
bun run dev "ocean" --source canvas

# 5. Test interactive mode
bun run dev "sunset" --interactive

# 6. Verify generated files
ls -lh giffer-*.gif
```

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

**Sharp installation issues**

- Sharp requires native compilation
- Ensure you have build tools installed
- On macOS: `xcode-select --install`
- On Ubuntu: `sudo apt-get install build-essential`

## Tips

- Use `--all` to see all options, then pick your favorite
- Lorem Picsum gives the most realistic results
- Placeholder is great for showing what keywords were used
- Emoji is fun and playful
- Canvas offers artistic, colorful graphics

## Development

```bash
# Install dependencies
bun install

# Run in development mode with hot reload
bun run dev

# Run tests
bun test

# Type checking
bun run typecheck

# Build
bun run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lorem Picsum](https://picsum.photos/) for random photography
- [Placehold.co](https://placehold.co/) for placeholder images
- [Sharp](https://sharp.pixelplumbing.com/) for image processing
- [Yargs](https://yargs.js.org/) for CLI argument parsing
- [Clack](https://github.com/natemoo-re/clack) for interactive prompts

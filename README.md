# Giffer - Multi-Source Picture Generator

Generate pictures from text descriptions without using AI models or API keys.

## Features

- **Multiple Image Sources**: 4 different approaches without API keys
- **Keyword Extraction**: Automatically extracts relevant keywords from descriptions
- **Interactive Selection**: Choose your favorite picture from multiple options
- **No API Keys Required**: All sources work without authentication

## Image Sources

### 1. Lorem Picsum (`lorem-picsum`)

Real photography from Lorem Picsum. Uses keywords as seeds for consistent results. **Best for**: Realistic photography style

### 2. Placeholder (`placeholder`)

Placeholder graphics with keyword text overlays. Customizable colors and text. **Best for**: Wireframes, prototypes, showing keywords

### 3. Emoji (`emoji`)

Emoji-based graphics with keyword representations. Fun and visual approach. **Best for**: Playful, simple graphics

### 4. Canvas (`canvas`)

Programmatic graphics with shapes and gradients. Color palettes based on keywords. **Best for**: Custom graphics, artistic style

## Installation

```bash
# Clone the repository
git clone https://github.com/jasonzhang-cerebras/giffer.git
cd giffer

# Install dependencies
bun install

# Verify installation
bun test
```

## Quick Start

```bash
# Generate pictures from all sources (default)
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
- `--all`: Generate pictures from all sources (default: true)
- `-i, --interactive`: Interactive mode to select from generated pictures
- `-o, --output <path>`: Output file path
- `--width <number>`: Picture width in pixels (default: 400)
- `--height <number>`: Picture height in pixels (default: 300)

### Examples

```bash
# Generate from all sources (default)
giffer "a beautiful sunset"

# Use specific source
giffer "cats playing" --source emoji

# Interactive selection
giffer "mountains with snow" --interactive

# Custom settings
giffer "ocean waves" --width 500 --height 400

# Save to specific file
giffer "sunset over ocean" --output sunset.png
```

## Output Files

When generating from all sources, files are named:

- `giffer-lorem-picsum-{timestamp}.png`
- `giffer-placeholder-{timestamp}.png`
- `giffer-emoji-{timestamp}.png`
- `giffer-canvas-{timestamp}.png`

## Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test test/giffer.test.ts
```

## Troubleshooting

**"Failed to download image"**

- Check your internet connection
- Some sources may be temporarily unavailable

**"No images generated"**

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

## License

MIT License - see [LICENSE](LICENSE) file for details.

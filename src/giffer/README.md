# Giffer - GIF Generator

Generate GIFs from text descriptions without using AI models.

## Features

- **Keyword Extraction**: Automatically extracts relevant keywords from descriptions
- **Multi-language Support**: Supports multiple languages with automatic translation
- **Image Search**: Searches for relevant images using Unsplash API
- **GIF Generation**: Creates animated GIFs from found images

## Installation

The giffer command is included in the opencode CLI.

## Usage

```bash
opencode giffer <description> [options]
```

### Arguments

- `description`: Text description of the GIF you want to generate

### Options

- `-o, --output <path>`: Output file path (default: `giffer-{timestamp}.gif`)
- `-f, --frames <number>`: Number of frames in the GIF (default: 5)
- `-d, --duration <number>`: Duration per frame in milliseconds (default: 500)
- `-l, --language <code>`: Language of the description (auto-detect if not specified)
- `--width <number>`: GIF width in pixels (default: 400)
- `--height <number>`: GIF height in pixels (default: 300)

### Examples

Generate a GIF from a simple description:

```bash
opencode giffer "a beautiful sunset over the ocean"
```

Generate a GIF with custom settings:

```bash
opencode giffer "cats playing in a garden" --frames 8 --duration 300 --width 500 --height 400
```

Generate a GIF from a non-English description:

```bash
opencode giffer "un gato durmiendo en el sofá" --language es
```

Save to a specific file:

```bash
opencode giffer "mountains with snow" --output my-gif.gif
```

## Setup

### Unsplash API Key

Giffer uses the Unsplash API to search for images. You need to set up an API key:

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key
4. Set the environment variable:

```bash
export UNSPLASH_ACCESS_KEY=your_access_key_here
```

Or add it to your shell profile (`.bashrc`, `.zshrc`, etc.):

```bash
echo 'export UNSPLASH_ACCESS_KEY=your_access_key_here' >> ~/.bashrc
source ~/.bashrc
```

## How It Works

1. **Keyword Extraction**: Extracts relevant keywords from your description
2. **Language Detection**: Detects the language of your description
3. **Translation**: Translates non-English descriptions to English for better image search
4. **Image Search**: Searches Unsplash for relevant images based on keywords
5. **GIF Generation**: Downloads and resizes images, then creates an animated GIF

## Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- Russian (ru)
- Arabic (ar)

## Limitations

- Requires an Unsplash API key (free tier available)
- Image quality depends on Unsplash search results
- Maximum 10 images per search (configurable)
- GIF size limited by available memory

## Troubleshooting

### "UNSPLASH_ACCESS_KEY environment variable is required"

Make sure you've set your Unsplash API key as described in the Setup section.

### "Failed to search images"

Check your internet connection and verify your Unsplash API key is valid.

### "No images to generate GIF"

The search didn't return any results. Try different keywords or a more specific description.

## License

Part of the opencode project.

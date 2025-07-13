# DS Find Shell

A shell translation tool powered by DeepSeek AI that converts natural language descriptions into executable shell commands.

## Installation

```bash
npm install -g ds-find-shell
```

## Configuration

Set up your DeepSeek API key before using:

```bash
export DEEPSEEK_API_KEY="your-deepseek-api-key"
```

You can get your API key from [DeepSeek Platform](https://platform.deepseek.com/).

## Usage

```bash
ds-find-shell "find the largest file in current directory"
ds-find-shell "show current date and time like 2025-07-13 21:00:00"
ds-find-shell "check system memory usage"
```

## Features

- 🤖 **AI-Powered Translation**: Leverages DeepSeek AI for intelligent command generation
- 💬 **Natural Language Processing**: Convert plain English to shell commands
- 🔒 **Safety First**: Confirmation prompt before executing commands
- 📦 **Lightweight**: Minimal dependencies for fast installation
- 🌐 **Cross-Platform**: Works on macOS, Linux, and Windows (with WSL)

## Requirements

- Node.js >= 20.0.0
- DeepSeek API Key

## How It Works

1. Input your request in natural language
2. The tool sends your request to DeepSeek AI
3. AI generates the appropriate shell command
4. You can review and confirm before execution
5. The command runs in your terminal

## Examples

### File Operations
```bash
ds-find-shell "find all .js files modified in the last 7 days"
ds-find-shell "compress all images in current folder"
```

### System Information
```bash
ds-find-shell "show disk usage by directory"
ds-find-shell "list running processes sorted by memory usage"
```

### Development Tasks
```bash
ds-find-shell "find all TODO comments in my code"
ds-find-shell "count lines of code in this project"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/gnosis23/ds-find-shell/issues) on GitHub.

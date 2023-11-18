# MMM-MinecraftServer Module for MagicMirror²

The MMM-MinecraftServer module is designed for [MagicMirror²](https://github.com/MichMich/MagicMirror) to display the list of online players on a Minecraft server.

![Screenshot](screenshot.png)

## Installation

1. Navigate to your MagicMirror's `modules` directory.
2. Clone this repository:
   ```sh
   git clone https://github.com/ItsMeBrille/MMM-MinecraftServer.git
   ```

## Configuration

To use this module, add it to the modules array in the `config/config.js` file of your MagicMirror:

```javascript
{
  module: "MMM-MinecraftServer",
  position: "top_right",
  config: {
    ip: "your_minecraft_server_ip",
    title: "Minecraft Server",
    updateInterval: 300000,
  }
}
```

## Configuration Options

| Option          | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `ip`            | IP address of your Minecraft server. Default: `"127.0.0.1"`       |
| `updateInterval`| Update interval in milliseconds. Default: `300000` (5 minutes)    |

## Screenshot

![Screenshot](screenshot.png)

## Dependencies

- This module uses the `fetch` API to retrieve data from the Minecraft server API.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
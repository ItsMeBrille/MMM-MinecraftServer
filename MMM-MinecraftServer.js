Module.register("MMM-MinecraftServer", {
  defaults: {
    ip: "127.0.0.1", // Minecraft server IP
    title: "Minecraft Server",
    bedrock: false, // Whether the server is running on Bedrock edition
    hidePlayers: false, // Hide player list
    maxPlayers: 10, // Max players to show in list
    hideInfo: false, // Hide bottom info (ip, version)
    updateInterval: 5, // Default update interval (5 minutes)
  },

  players: [],
  info: [],

  start() {
    // Log module start
    Log.info(`Starting module: ${this.name}`);
    this.getPlayers();
    setInterval(() => {
      this.getPlayers();
    }, this.config.updateInterval * 60000);
  },

  getStyles() {
    return ["MMM-MinecraftServer.css"];
  },

  getPlayers() {
    fetch(`https://api.mcsrvstat.us${this.config.bedrock ? "/bedrock" : ""}/3/${this.config.ip}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.players && data.players.list) {
          this.players = data.players.list;
        }

        this.info.online = data.online;
        console.log(this.info.online);
        if (this.info.online) {
          this.info.motd = data.motd.html[0];
          this.info.hostname = data.hostname;
          this.info.port = data.port;
          this.info.version = data.version;
        }
        this.updateDom();
      })
      .catch((error) => {
        console.error("Error fetching Minecraft server data:", error);
      });
  },

  getDom() {
    // Wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "minecraft-card";

    // Title
    const title = document.createElement("h1");
    title.className = "title";
    title.innerHTML = this.config.title;
    wrapper.appendChild(title);

    // Server not available
    if (!this.info.online) {
      const info = document.createElement("span");
      info.className = "motd";
      info.innerHTML = `Server offline`;
      wrapper.appendChild(info);
    } else {
      // MOTD
      const motd = document.createElement("span");
      motd.className = "motd";
      motd.innerHTML = this.info.motd || "";
      wrapper.appendChild(motd);
    }

    // List players
    if (!this.config.hidePlayers) {
      const playerTable = document.createElement("table");
      playerTable.className = "players";

      this.players.slice(0, this.config.maxPlayers).forEach((player) => {
        const playerRow = document.createElement("tr");

        const avatarCell = document.createElement("td");
        const avatar = document.createElement("img");
        avatar.className = "player-avatar";
        avatar.src = `https://mc-heads.net/avatar/${player.uuid}/64`;
        avatarCell.appendChild(avatar);
        playerRow.appendChild(avatarCell);

        const nameCell = document.createElement("td");
        const playerName = document.createElement("span");
        playerName.className = "player-name";

        playerName.innerHTML = (player.name.length < 16) ? player.name : player.name.substring(0, 14) + "...";
        nameCell.appendChild(playerName);
        playerRow.appendChild(nameCell);

        const connectionCell = document.createElement("td");
        const connectionBars = document.createElement("div");
        connectionBars.className = "connection-bars";
        connectionCell.appendChild(connectionBars);
        playerRow.appendChild(connectionCell);

        playerTable.appendChild(playerRow);
      });
      wrapper.appendChild(playerTable);
    }

    // Info
    if (!this.config.hideInfo) {
      const info = document.createElement("span");
      info.className = "info";
      info.innerHTML = `${this.config.ip}${this.config.bedrock ? "<br><i>Bedrock<i>" : ""}${this.info.version ? " - " + (this.info.version.length > 25 ? this.info.version.substring(0, 23) + '...' : `<i>${this.info.version}`) : ""}`;
      wrapper.appendChild(info);
    }

    return wrapper;
  },
});

Module.register("MMM-MinecraftServer", {
    defaults: {
      ip: "127.0.0.1", // Default Minecraft server IP
      updateInterval: 300000, // Default update interval (5 minutes)
    },
  
    players: [],
  
    start() {
      this.getPlayers();
      setInterval(() => {
        this.getPlayers();
      }, this.config.updateInterval);
    },
  
    getStyles() {
      return ["MMM-MinecraftServer.css"]; // Add your CSS file here if needed
    },
  
    getPlayers() {
      fetch(`https://api.mcsrvstat.us/3/${this.config.ip}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.players && data.players.list) {
            this.players = data.players.list.map((player) => player.name);
            this.updateDom();
          }
        })
        .catch((error) => {
          console.error("Error fetching Minecraft server data:", error);
        });
    },
  
    getDom() {
      const wrapper = document.createElement("div");
      wrapper.className = "minecraft-players";
  
      const title = document.createElement("div");
      title.innerHTML = "Online Players:";
      wrapper.appendChild(title);
  
      const playerList = document.createElement("ul");
      this.players.forEach((player) => {
        const playerItem = document.createElement("li");
        playerItem.innerHTML = player;
        playerList.appendChild(playerItem);
      });
      wrapper.appendChild(playerList);
  
      return wrapper;
    },
  });
  
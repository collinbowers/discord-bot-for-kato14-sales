module.exports = async (msg) => {
    await msg.channel.send({embed: {
        color: 3447003,
        title: "List of commands:",
        fields: [
          { name: "!info", value: "Little bit about me" },
          { name: "!options", value: "List of commands" },
          { name: "!prices", value: "All current Kato 14 prices" },
          { name: "!last7days", value: "Last 7 days of Kato sales" },
          { name: "!monthlyhigh", value: "Highest sale of the last 30 days" },
        ]
      }
    });
}
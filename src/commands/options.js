module.exports = async (msg) => {
    await msg.channel.send({embed: {
        color: 3447003,
        title: "List of commands:",
        fields: [
          { name: "!info", value: "Little bit about me" },
          { name: "!options", value: "List of commands" },
          { name: "!dev", value: "Development information" },
          { name: "!last7days", value: "Last 7 days of Kato sales" },
          { name: "!highest", value: "Highest sale of the year" },
          //{ name: "!prices", value: "All current Kato 14 prices" },
        ]
      }
    });
}
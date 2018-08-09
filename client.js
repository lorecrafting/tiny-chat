const net = require("net");

const client = net.createConnection(6969, "34.219.169.7", () => {
  client.on("data", data => {
    console.log(data.toString());
  });
  process.stdin.pipe(client);
});

const net = require("net");
const DEFAULT_ATTACK_POWER = 10;
const DEFAULT_MAX_HP = 50;
const DEFAULT_MAX_MP = 50;

const clients = [];

const server = net.createServer(client => {
  client.hp = DEFAULT_MAX_HP;
  client.mp = DEFAULT_MAX_MP;
  console.log("CLIENT CONNECTED: ", client.address());
  client.write("ALOHA, TYPE IN /help FOR COMMANDS");
  client.on("data", data => {
    const msg = data.toString();
    if (msg.includes("/help")) {
      client.write("HERE ARE SOME COMMANDS: /NICK - REGISTER NAME & PASSWORD");
    } else if (msg.includes("/nick")) {
      const splitMessage = msg.split(" ");
      client.name = splitMessage[1];
      client.password = splitMessage[2];
      console.log("asdf", client.hame, client.password);
    } else if (msg.includes("/attack")) {
      console.log("message in attack", msg);
      const splitAttackMsg = msg.split(" ");
      const nameToAttack = splitAttackMsg[1];
      clients.forEach(socket => {
        if (socket.name === nameToAttack) {
          socket.hp = socket.hp - DEFAULT_ATTACK_POWER;
          socket.write(
            `YOU HAVE BEEN ATTACKED BY ${
              client.name
            } FOR ${DEFAULT_ATTACK_POWER}! WATCHOO GONNA DO???`
          );
          if (socket.hp < 1) {
            socket.write("YOU DED!!!!!!!! RECONNECT TO REVIVE");
            socket.end();
          }
        }
      });
    } else {
      clients.forEach(socket => {
        if (client !== socket) {
          socket.write(
            client.name + `HP: ${client.hp} MP: ${client.mp}: ` + msg
          );
        }
      });
      // for (var i = 0; i < clients.length; i++) {
      //   clients[i].write(msg)
      // }
    }

    console.log(data.toString());
    process.stdin.pipe(client);
  });
  client.on("end", data => {
    console.log("client disconnected");
  });
  clients.push(client); // <**** THE SEKRET TO BROADCAST IS HERE
});

server.listen(6969, () => {
  console.log("Server listening on port 6969");
});

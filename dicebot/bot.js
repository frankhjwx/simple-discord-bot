/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'MzU0NTcxMDAwMzgzMjc1MDA4.DJALpg.QqSaKBCxW69WSTu1yqazAcaMepA';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

function GetRandomNum(Min,Max)
{   
	var Rand = Math.random();   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}  

// Create an event listener for messages
client.on('message', message => {
	// If the message is "ping"
	if (message.content.substring(0, 1) == '!') {
  
		args = message.content.substring(1).split(' ');
		var cmd = args[0];
	
		switch(cmd) {
		
			case 'ping':
				// Send "pong" to the same channel
				message.channel.send('pong');
				break;
			case 'roll':
				var Max, Min;
				var N = parseInt(args[2]);
				if (parseInt(args[2])>0 && parseInt(args[2])<100) {
					N = parseInt(args[2]);
				} else {
					N = 1;
				}
				
				if (parseInt(args[1])>0 && parseInt(args[1])<32768) {
					Max = parseInt(args[1]);
					Min = 0;
				} else {
					Max = 100;
					Min = 0;
				}  
				var msg = "";
				for (var i=0;i<N;i++) {
					var Result = GetRandomNum(Min, Max);
					msg = msg + Result + " ";
				}
				message.channel.send(msg);
				break;
				
			case 'summon': 
				var msg = "";
				var files = [];
				var num_3 = 12, num_equip = 12;
				while (num_3 == 12 || num_equip == 12) {
					files = [];  // clear the array
					num_3 = 0; num_equip = 0;
					msg = "";
					for (var i=0;i<12;i++) {
						var Result = GetRandomNum(1,100);
						if (Result < 2) {
							var id = GetRandomNum(1,54);
							files.push("img/servent/5/"+id+".jpg");
							msg+="5☆s "+id+"   ";
						} else if (Result < 5) {
							var id = GetRandomNum(1,19);
							files.push("img/equipments/5/"+id+".jpg");
							num_equip++;
							msg+="5☆e "+id+"   ";
						} else if (Result < 9) {
							var id = GetRandomNum(1,53);
							files.push("img/servent/4/"+id+".jpg");
							msg+="4☆s "+id+"   ";
						} else if (Result < 25) {
							var id = GetRandomNum(1,28);
							files.push("img/equipments/4/"+id+".jpg");
							num_equip++;
							msg+="4☆e "+id+"   ";
						} else if (Result < 39) {
							var id = GetRandomNum(1,36);
							files.push("img/servent/3/"+id+".jpg");
							num_3++;
							msg+="3☆s "+id+"   ";
						}
						else {
							var id = GetRandomNum(1,46);
							files.push("img/equipments/3/"+id+".jpg");
							num_equip++;
							num_3++;
							msg+="3☆e "+id+"   ";
						}
					}
				}
				var gm = require('gm');
				
				gm()
					.in('-page','+0+0')
					.in(files[0])
					.in('-page','+128+0')
					.in(files[1])
					.in('-page','+256+0')
					.in(files[2])
					.in('-page','+384+0')
					.in(files[3])
					.in('-page','+0+140')
					.in(files[4])
					.in('-page','+128+140')
					.in(files[5])
					.in('-page','+256+140')
					.in(files[6])
					.in('-page','+384+140')
					.in(files[7])
					.in('-page','+0+280')
					.in(files[8])
					.in('-page','+128+280')
					.in(files[9])
					.in('-page','+256+280')
					.in(files[10])
					.in('-page','+384+280')
					.in(files[11])
					.mosaic()
					.write('tmp.jpg', function (err) {
						if (err) console.log(err);
					});
				message.channel.send("",{files:["tmp.jpg"]});
				//message.channel.send(msg,{files:[files[0],files[1],files[2],files[3],files[4],files[5],files[6],files[7],files[8],files[9]]});
				break;
			
		}
	}
});

// Log our bot in
client.login(token);

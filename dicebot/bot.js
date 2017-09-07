/*
  A Simple discord bot used for play and management.
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

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

function judgeMemberAdmin(member){
	if (!member.roles.exists('name','Administrator') && !member.roles.exists('name','Key Person'))
		return false;
	else
		return true;
}

var tmproom;
// Create an event listener for messages
client.on('message', message => {
	// If the message is "ping"
	if (message.content.substring(0, 1) == '!' || message.content.substring(0, 2) == '！') {
  
		if (message.content.substring(0, 1) == '!')
			args = message.content.substring(1).split(' ');
		else
			args = message.content.substring(2).split(' ');
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
			case 'setchat':
				if (message.channel.name == "administrators") {
					if (!judgeMemberAdmin(message.member)){
						message.channel.send("你没有相关权限！");
					} else {
						var server = message.guild;
						var name = "chatroom" + GetRandomNum(10000,99999);
						tmproom = name;
						server.createChannel(name,"text");
						message.channel.send("临时会话已建立");
					}
				}
				break;
			case 'ally':
				if (message.channel.name == "administrators") {
					if (parseInt(args[1])>=10000 && parseInt(args[1])<=99999) {
						var name = 'chatroom' + parseInt(args[1]);
						var channel = message.guild.channels.find('name' , name);
						if (!judgeMemberAdmin(message.member)){
							message.channel.send("你没有相关权限！");
							break;
						} else {
							channel.overwritePermissions(message.guild.roles.find('name','Observer') , {SEND_MESSAGES: false});
							for (var i = 1; i <= 7; i++){
								channel.overwritePermissions(message.guild.roles.find('name','Player'+i) , {READ_MESSAGES: false});
							}
							for (var i = 2; i < args.length;i++){
								if (parseInt(args[i])>=1 && parseInt(args[i])<=7) {
									channel.overwritePermissions(message.guild.roles.find('name','Player'+parseInt(args[i])) , {READ_MESSAGES: true});
									channel.overwritePermissions(message.guild.roles.find('name','Player'+parseInt(args[i])) , {SEND_MESSAGES: true});
								}
							}
							message.channel.send("权限设置成功");
						}
					} else if (parseInt(args[1])>=1 && parseInt(args[1])<=7){
						var channel = message.guild.channels.find('name' , tmproom);
						if (!judgeMemberAdmin(message.member)){
							message.channel.send("你没有相关权限！");
							break;
						} else {
							channel.overwritePermissions(message.guild.roles.find('name','Observer') , {SEND_MESSAGES: false});
							for (var i = 1; i <= 7; i++){
								channel.overwritePermissions(message.guild.roles.find('name','Player'+i) , {READ_MESSAGES: false});
							}
							for (var i = 1; i < args.length;i++){
								if (parseInt(args[i])>=1 && parseInt(args[i])<=7) {
									channel.overwritePermissions(message.guild.roles.find('name','Player'+parseInt(args[i])) , {READ_MESSAGES: true});
									channel.overwritePermissions(message.guild.roles.find('name','Player'+parseInt(args[i])) , {SEND_MESSAGES: true});
								}
							}
							message.channel.send("权限设置成功");
						}
					} else {
						message.channel.send("权限设置有误，请参阅!help");
					}
				}
				break;
			case 'help':
				if (message.channel.name == "administrators") {
					message.channel.send("欢迎使用咕哒子机器人！\n\n !roll: 用于掷点(1~100)； !roll + 数字A：在1~A内掷点； !roll + 数字A + 数字B： 在1~A内掷B个点 \n\n !summon：抽卡，请前往#playroom进行避免影响频道环境；\n\n !setchat：建立一个新的临时频道；\n\n !ally + 数字A + 数字B1 + 数字B2 + ...：对临时频道A进行权限设置，使其成为B1、B2、...的临时聊天频道； \n !ally + 数字A1 + 数字A2 + ...：对刚刚建立的临时频道进行权限设置，使其成为A1、A2、...的临时聊天频道");	
				} else {
					message.channel.send("欢迎使用咕哒子机器人！\n\n !roll: 用于掷点(1~100)； !roll + 数字A：在1~A内掷点； !roll + 数字A + 数字B： 在1~A内掷B个点 \n\n !summon：抽卡，请前往#playroom进行避免影响频道环境");	
				}
				break;
			
		}
	}
});

// Log our bot in
client.login(token);

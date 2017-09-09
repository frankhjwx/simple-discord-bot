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
	if (!member.roles.exists('name','Administrator') && !member.roles.exists('name','Key Person') && !member.roles.exists('name','bot'))
		return false;
	else
		return true;
}

function rewritePermissions(name, message, args){
	var channel = message.guild.channels.find('name' , name);
	channel.overwritePermissions(message.guild.roles.find('name','Observer') , {READ_MESSAGES: true, SEND_MESSAGES: false});
	for (var i = 1; i < args.length;i++){
		if (parseInt(args[i])>=1 && parseInt(args[i])<=7) {
			channel.overwritePermissions(message.guild.roles.find('name','Player'+parseInt(args[i])) , {READ_MESSAGES: true, SEND_MESSAGES: true});
		}
	}
	channel.overwritePermissions(message.guild.roles.find('name','Observer') , {READ_MESSAGES: true, SEND_MESSAGES: false});
}

function findchannel(message, name) {
	return client.channels.find('id' , message.guild.channels.find('name',name).id);
}

function channelexists(message, name){
	if (message.guild.channels.exists('name',name) == false)
		return false;
	return client.channels.exists('id' , message.guild.channels.find('name',name).id);
}

function judgeChannelAdmin(message){
	if (message.channel.name == "administrators" || message.channel.name == "kp")
		return true;
	return false;
}

function msgTime(time){
	var msg = time.year + '/' + time.month + '/' + time.date + ' ' + time.hours + ':' + time.minutes + ':' + time.seconds;
	return msg;
}

var tmproom;
// Create an event listener for messages
client.on('message', message => {
	// 记录msg
	if (message.content!="") {
		var fs = require("fs"); 
		fs.appendFile('logs/log_' + message.channel.name + '.txt', message.member.nickname + '(#'+message.channel.name + ') ' + String(message.createdAt) + ' :' + message.content + '\r\n', function (err) {
			if (err) throw err;
			//console.log('The "data to append" was appended to file!');
		});
	}
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
				if (message.channel.name!='playroom') {
					message.channel.send("请前往#playroom抽卡！");
				} else {
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
						.write('gudako.jpg', function (err) {
							if (err) console.log(err);
						});
					message.channel.send("",{files:["gudako.jpg"]});
					//message.channel.send(msg,{files:[files[0],files[1],files[2],files[3],files[4],files[5],files[6],files[7],files[8],files[9]]});
				}
				break;
			case 'setchat':
				if (judgeChannelAdmin(message)) {
					if (!judgeMemberAdmin(message.member)){
						message.channel.send("你没有相关权限！");
					} else {
						if (parseInt(args[1])>=1 && parseInt(args[1])<=7) {
							var server = message.guild;
							var name = "chatroom" + GetRandomNum(10000,99999);
							while (message.guild.channels.exists('name',name)) {
								name = "chatroom" + GetRandomNum(10000,99999);
							}
							
							tmproom = name;
							
							var per = message.guild.channels.find('name' , 'administrators').permissionOverwrites;
							var perarr = per.array();
							server.createChannel(name,"text",perarr)
								.then(() => rewritePermissions(name, message, args));
							message.channel.send("临时会话已建立");
							
							var msg = "";
							for (var i=1; i<args.length; i++) {
								msg = msg + " player" + parseInt(args[i]);
							}
							var livechannel = findchannel(message, 'live-broadcasting');
							
							livechannel.send("临时会话频道 "+name+" 已建立，为"+msg+"的结盟频道");
							
						}
					}
				}
				break;
			// 仅用于pl频道被误操作(删除)时使用
			// case 'setplayer':
				// if (judgeChannelAdmin(message)) {
					// if (!judgeMemberAdmin(message.member)){
						// message.channel.send("你没有相关权限！");
					// } else {
						// if (parseInt(args[1])>=1 && parseInt(args[1])<=7) {
							// var server = message.guild;
							// var name = "player" + parseInt(args[1]);
							
							// tmproom = name;
							
							// var per = message.guild.channels.find('name' , 'administrators').permissionOverwrites;
							// var perarr = per.array();
							// server.createChannel(name,"text",perarr)
								// .then(() => rewritePermissions(name, message, args));
							// message.channel.send("pl频道"+name+"已建立");
							
							
						// }
					// }
				// }
				// break;
			case 'checkroom':
				if (message.channel.name.substring(0,6)!='player' && message.channel.name.substring(0,8)!='chatroom' && message.channel.name.substring(0,8)!='playroom') {
					if (args.length == 1) {
						var msg = '';
						var allchannels = message.guild.channels.array();
						for (var j=0; j < allchannels.length; j++) {
							if (allchannels[j].name.substring(0,8) == 'chatroom') {
								var tmpmsg = '';
								var channel = allchannels[j];
								for (var i=1;i<=7;i++) {
									var roleid = message.guild.roles.find('name', 'Player'+i).id;
									if (channel.permissionOverwrites.exists('id', roleid))
										tmpmsg = tmpmsg + ' player' + i;
								}
								tmpmsg = '临时会话频道'+allchannels[j].name+'为'+tmpmsg+' 的结盟频道';
								msg = msg + tmpmsg + '\n';
							}
							
						}
						message.channel.send(msg);
					} else if (args.length == 2 && parseInt(args[1])>=10000 && parseInt(args[1])<=99999) {
						if (message.guild.channels.exists('name', 'chatroom'+parseInt(args[1]))) {
							var msg = '';
							var channel = message.guild.channels.find('name', 'chatroom'+parseInt(args[1]));
							for (var i=1;i<=7;i++) {
								var roleid = message.guild.roles.find('name', 'Player'+i).id;
								if (channel.permissionOverwrites.exists('id', roleid))
									msg = msg + ' player' + i;
							}
							message.channel.send('临时会话频道'+channel.name+'为'+msg+' 的结盟频道');
						} else {
							message.channel.send('指令有误，该频道不存在！');
						}
					} else{
						message.channel.send('指令有误，请参阅!help');
					}
				}
				break;
			case 'delete':
				if (judgeChannelAdmin(message)) {
					if (parseInt(args[1])>=10000 && parseInt(args[1])<=99999) {
						var name = 'chatroom' + parseInt(args[1]);
						if (!message.guild.channels.exists('name' , name)) {
							message.channel.send("频道删除失败，请确认数字是否正确");
						} else {
							var channel = message.guild.channels.find('name' , name);
							channel.delete();
							message.channel.send("频道 "+name+" 删除成功");
							var livechannel = findchannel(message, 'live-broadcasting');
							livechannel.send("临时会话频道 "+name+" 已删除");
						}
					}  else {
						message.channel.send("频道号码有误，请参阅!help");
					}
				} else if (message.channel.name.substring(0,8) == 'chatroom' && args.length == 1){
					if (!judgeMemberAdmin(message.member)){
						message.channel.send("你没有相关权限！");
					} else {
						var name = message.channel.name;
						var channel = message.guild.channels.find('name' , name);
						channel.delete();
						var adminchannel = findchannel(message, 'administrators');
						adminchannel.send("频道 " + name + " 删除成功");
					}
				}
				break;
			case 'announcement':
				if (judgeChannelAdmin(message)) {
					for (var i = 1; i <= 7 ; i++){
						var plchannel = findchannel(message, 'player'+i);
						plchannel.send("公告：" + message.content.substring(14));
					}
					var allchannels = message.guild.channels.array();
					for (var i=0; i<allchannels.length; i++) 
						if (allchannels[i].name.substring(0,8) == 'chatroom')
							allchannels[i].send("公告：" + message.content.substring(14));
					var livechannel = findchannel(message, 'live-broadcasting');
					livechannel.send("公告：" + message.content.substring(14));
					message.channel.send("公告发送成功！");
				}
				break;
			case 'renewchannel':
				if (judgeChannelAdmin(message) && args.length == 2 && parseInt(args[1])>=1 && parseInt(args[1])<=7) {
					var channel = message.guild.channels.find('name' , 'player'+parseInt(args[1]));
					var per = message.guild.channels.find('name' , 'player'+parseInt(args[1])).permissionOverwrites;
					channel.delete();
					var name = 'player'+ parseInt(args[1]);
					var perarr = per.array();
					var server = message.guild;
					server.createChannel(name,"text",perarr);
					message.channel.send("pl"+parseInt(args[1])+"的频道刷新成功！");
				} else if (judgeChannelAdmin(message) && args[1] == "all") {
					for (var i=1; i<=7; i++) {
						if (message.guild.channels.exists('name' , 'player'+i)) {
							var channel = message.guild.channels.find('name' , 'player'+i);
							var per = message.guild.channels.find('name' , 'player'+i).permissionOverwrites;
							channel.delete();
							var perarr = per.array();
							var server = message.guild;
							var name = 'player' + i;
							server.createChannel(name,"text",perarr);	
						}
					}
					message.channel.send("全pl频道刷新成功！");
				} else if (message.member.nickname == '小古') {
					if (message.guild.channels.exists('name' , args[1])){
						var channel = message.guild.channels.find('name' , args[1]);
						var per = message.guild.channels.find('name' , args[1]).permissionOverwrites;
						channel.delete();
						var perarr = per.array();
						var server = message.guild;
						var name = args[1];
						server.createChannel(name,"text",perarr);
						message.channel.send('done');
					}
				}
				break;
			case 'help':
				if (args.length == 1) {
					if (judgeChannelAdmin(message)) {
						message.channel.send("欢迎使用咕哒子机器人！\n\n !roll: 用于掷点(1~100)； !roll + 数字A：在1~A内掷点； !roll + 数字A + 数字B： 在1~A内掷B个点 \n\n !summon：抽卡，请前往#playroom进行避免影响频道环境；\n\n !setchat + 数字A1 + 数字A2 + ...：新建一个A1、A2、...的__临时频道__； \n\n !delete + 数字A (在admin频道)：删除临时频道A； \n !delete(在临时频道)：删除本频道 \n\n !announcement + 广播信息：向全pl频道公告广播信息；\n\n !renewchannel + 数字A：刷新__playerA__的频道，将以往数据全部抹除 \n !renewchannel all：抹除所有__player__的聊天数据 (**!!!请注意 renewchannel只建议在新一轮游戏时使用，正常情况请不要启动！**)； \n\n **KP使用** ~数字X + message： 若数字为1~7，则向__playerX__的频道发送一条信息，若数字为10000~99999，则向__chatroomX__频道发送一条信息。 \n\n !checkroom + 临时频道号X：查看__临时频道X__的结盟信息。");	
					} else {
						message.channel.send("欢迎使用咕哒子机器人！\n\n !roll: 用于掷点(1~100)； !roll + 数字A：在1~A内掷点； !roll + 数字A + 数字B： 在1~A内掷B个点 \n\n !summon：抽卡，请前往#playroom进行避免影响频道环境 \n\n");	
					}
				} else if (args.length == 2) {
					switch (args[1]) {
						case 'roll':
							message.channel.send("!roll: 用于掷点(1~100)； !roll + 数字A：在1~A内掷点； !roll + 数字A + 数字B： 在1~A内掷B个点 \n e.g.: !roll 10, !roll 100 10");
							break;
						case 'summon':
							message.channel.send("!summon：抽卡，请前往#playroom进行避免影响频道环境 \n e.g.: !summon");
							break;
						case 'setchat':
							if (judgeChannelAdmin(message)) 
								message.channel.send("!setchat + 数字A1 + 数字A2 + ...：新建一个A1、A2、...的临时频道 \n e.g.:!setchat 2 5");
							break;
						case 'delete':
							if (judgeChannelAdmin(message))
								message.channel.send("!delete + 数字A (在admin频道)：删除__临时频道A__； \n !delete(在临时频道)：删除本频道 \n e.g.:!delete 12345");
							break;
						case 'renewchannel':
							if (judgeChannelAdmin(message))
								message.channel.send("!renewchannel + 数字A：刷新__playerA__的频道，将以往数据全部抹除 \n !renewchannel all：抹除所有__player__的聊天数据 (**!!!请注意 renewchannel只建议在新一轮游戏时使用，正常情况请不要启动！**) \n e.g.: !renewchannel 2");
							break;
						case 'checkroom':
							if (judgeChannelAdmin(message))
								message.channel.send("!checkroom + 临时频道号X：查看__临时频道X__的结盟信息。\n e.g.:!checkroom 12345");
							break;
						case '~':
							if (judgeChannelAdmin(message))
								message.channel.send("**KP使用** ~数字X + message： 若数字为1~7，则向__playerX__的频道发送一条信息，若数字为10000~99999，则向__chatroomX__频道发送一条信息。 \n e.g.: ~2 你好, ~12345 你们好");
							break;
						default:
							message.channel.send("指令有误，请重新输入！");
					}
				}
				
				break;
			
		}
	}
	
	for (var i=1; i<=7; i++)
		if (channelexists(message,'player'+i) && message.channel == findchannel(message, 'player'+i)) {
			var livechannel = findchannel(message, 'live-broadcasting');
			var msg;
			if (message.member.nickname == "")
				msg = message.member.user.username + '(#player'+i+')';
			else
				msg = message.member.nickname + '(#player'+i+')';
			if (!(message.content.search('公告') >= 0 && message.member.roles.find('name','bot')) && message.content!="")
			 livechannel.send(msg + ": "+message.content);
		}
	
	var allchannels = message.guild.channels.array();
	for (var i=0; i<allchannels.length; i++) {
		if (allchannels[i].name.substring(0,8) == 'chatroom' && message.channel == findchannel(message, allchannels[i].name)) {
			var livechannel = findchannel(message, 'live-broadcasting');
			var msg;
			if (message.member.roles.find('name','Player'+i))
				msg = 'player'+i;
			else {
				if (message.member.nickname == "")
					msg = message.member.user.username;
				else
					msg = message.member.nickname;
			}
			msg = msg + '(#' + allchannels[i].name + ')'; 
			if (!(message.content.search('公告') >= 0 && message.member.roles.find('name','bot')) && message.content!="")
			 livechannel.send(msg + ": "+message.content);
		}
	}
	
	if (message.content.substring(0, 1) == '~' && message.member.roles.exists('name', 'Key Person')) {
		var args = message.content.substring(1).split(' ');
		if (parseInt(args[0])>=1 && parseInt(args[0])<=7) {
			var plchannel = findchannel(message, 'player'+parseInt(args[0]));
			plchannel.send(message.content.substring(3));
			message.channel.send('消息发送成功');
		} else if (parseInt(args[0])>=10000 && parseInt(args[0])<=99999) {
			if (client.channels.exists('name', 'chatroom'+parseInt(args[0]))) {
				var plchannel = findchannel(message, 'chatroom'+parseInt(args[0]));
				plchannel.send(message.content.substring(7));
				message.channel.send('消息发送成功');
			}
		}
	}
});

// Log our bot in
client.login(token);

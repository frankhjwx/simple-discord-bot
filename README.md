# simple-discord-bot
This is a simple discord bot made for daily use.

### Gudako bot
A discord bot to assist trpg:CAC holy grail war. Including features below:

#### !roll [num] [count]
Generate an integer between 1 and `num`. Max `num` is 32768 and default num is 100. Config `count` to roll multiple times.  
Both `num` and `count` are optional

#### !summon
Summon 12 servants and equipments. Only availble in channel `#playroom`

#### !setchat [playerNum1] [playerNum2] [...]
Create a temp channel for `playerNum1`,`playerNum2` and so on to chat. Other players cannot see this channel.   
A random number between 10000 and 99999 is named after the temp channel. e.g.: `#Chatroom 39284`

#### !delete [chatroomNumber]
Delete a temp channel created by command `!setchat`. Input chatroom number `num1` in `#admin` channel to delete any chatroom,or just input `delete` in the chatroom to delete that chatroom.

#### !checkroom [chatroomNumber]
Check the players availble in a channel.

#### !renewchannel [all|playerNum1]
Clear chatting history in player channels. Use all to clear all the players' channels.

#### ~[Num] [message]
Send a message to a player or chatroom channel. Num 1-7 to player, 10000-99999 to chatroom.

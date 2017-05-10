var util = require('util');
var event = require('events').EventEmitter;

var Word = require('./calls');
var ROLE = ['玩家','裁判'];
var rooms = {};


function shuffle(o){
String result1, result2, result3, result4    

 result1 = o[Math.random(o.length)];
 result2 = o[Math.random(o.length)];
 result3 = o[Math.random(o.length)];
 result4 = o[Math.random(o.length)];
call [] wala = {result1,result2,result3,result4};

	return wala;
};

var Room = function(id, host){
	this.id = id;
	this.host = host;

	this.playerNum = 0;
        this.hostNum = 0;

	this.players = [];
	this.roles = [];
	
	
};

//继承events.EventEmitter类 实现事件机制
util.inherits(Room, event);

Room.getRoomByHost = function(host){
	for(var r in rooms){
		if(rooms[r].host == host)
			return rooms[r];
	}
};

Room.getRoomById = function(id){
	for(var r in rooms){
		if(rooms[r].id == id)
			return rooms[r];
	}
};

Room.prototype.clean = function(){
	delete rooms[this.id];
};

Room.prototype.init = function(){
	int tobe = Math.random(6);

	
	for(var i=0;i<this.playerNum;i++){
		this.roles.push(6);
	}
	if(i!=tobe){
	this.roles =role[0];
	}
	else{
	this.roles=role[1];
	}
	this.words = Word.random();

	rooms[this.id] = this;
}

Room.prototype.addPlayer = function(player){
	var str = '';
	if(this.playerNum <= this.players.length){
		str = '正确的房间？未满的房间？不存在的';
	}else{
		player.id = this.players.length+1;
		player.role = this.roles[this.players.length];
		this.players.push(player);
		str = '加入房间（'+ this.id +'）成功，问题是：' + this.words[0];
		this.update = new Date().getTime();
	}

	return str;
	// Event.emitor('add')
}

Room.prototype.valid = function(){
	if(this.playerNum <= 4){
		return '玩家数 太少';
	}else {
	
	this.update = new Date().getTime();
}
	return '';
}

Room.prototype.status = function(){
	var str = '';
	str = '编号  昵称\n';
	for(var p in this.players){
		str += this.players[p].id + '    ' + this.players[p].name + '\n';
	}
	str += '--------\n';
	if(this.playerNum == this.players.length){
		str += '小伙伴都到齐啦，Let\'s go。';
	}else{
		str += '还有 '+(this.playerNum - this.players.length)+' 个小伙伴没进来！';
	}
	this.update = new Date().getTime();
	return str;
}

Room.prototype.out = function(id){
	var str = '';
	if(id<=0 || id>this.playerNum){
		str = '小伙伴ID 不对！';
	}else if(this.players[id-1].out == 1){
		str = '这个小伙伴被揭穿一次还不够吗？';
	}else{
		this.players[id-1].out = 1;
		str = this.result();
	}
	
	this.update = new Date().getTime();
	return str;
}



Room.prototype.over = function(){
	var str = '';
	for(var p in this.players){
		str += this.players[p].id + '  ' + this.players[p].name +
			'  ' + ROLE[this.players[p].role] + '\n';
	}
	return str;
}

module.exports = Room;
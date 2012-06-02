Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
	if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};
var generate_i = 0 , queue_i = 0 , server_i = 0 , sink_i = 0;
Raphael.fn.new_generate = function (paper,dragger,move, up)
	{
	if(paper.getById('gen0'))
		{
		return alert('В данной версии возможен только один генератор!');
		}
	var generate = paper.path("m 13.238076,13.442228 c 2.774405,2.455941 4.296812,5.726541 4.285996,9.205393 -0.0073,3.48364 -1.553955,6.764613 -4.349091,9.238908 l 4.276982,3.786044 c 8.119505,-7.187501 8.144743,-18.857614 0.05949,-26.0147956 L 13.237176,13.44143 z m 7.584095,-6.7039742 c 9.89069,8.7553792 9.845621,23.0378242 -0.09735,31.8394802 L 25,42.362183 C 37.300043,31.474013 37.344211,13.7949 25.096446,2.9530075 L 20.821269,6.737456 z M 11.69043,25.290273 c -1.63598,1.448192 -4.2887,1.44899 -5.9237785,0.0016 -1.6350772,-1.447395 -1.634176,-3.79562 0.00178,-5.243812 1.6341773,-1.446596 4.2868965,-1.447393 5.9219765,0 1.635078,1.447394 1.635078,3.794822 0,5.242216 z").dblclick
		(
		function()
			{
			alert("ok");
			}
		);
	var color = Raphael.getColor();
	generate.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
	generate.drag(move, dragger, up);
	generate.translate(100,100);
	generate.id ='gen'+generate_i++;
	};
	
Raphael.fn.new_queue = function (paper,dragger,move, up,connections)
	{
	var queue = paper.path("M 10,10 h 105 v 30 h -105 zM 17.5,17.5 h 15 v 15 h -15 zM 42.5,17.5 h 15 v 15 h -15 zM 67.5,17.5 h 15 v 15 h -15 zM 92.5,17.5 h 15 v 15 h -15 z").dblclick
		(
		function()
			{
			alert("ok");
			}
		);
	var color = Raphael.getColor();
	queue.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
	queue.drag(move, dragger, up);
	if(paper.getById('que0'))
		{
		queue.translate(250,100+queue_i*50);
		}
	else
		{
		queue.translate(250,100);
		}
	queue.id ='que'+queue_i++; 
	if(paper.getById('gen0') && !paper.getById('ser0') )
		{
		connections.push(paper.connection(paper.getById('gen0'), queue, "#000", "#fff"));
		}
	if(paper.getById('gen0') && paper.getById('ser0') )
		{
		for(var i = 0; i < connections.length; i++)
			{
			if (connections[i].from.id == 'gen0' && connections[i].to.id == 'ser0')
				{
				connections[i].to.translate(250,0);
				if(paper.getById('sink0'))
					{
					paper.getById('sink0').translate(250,0);
					}
				connections[i].line.remove();
				connections.splice(i,1);
				}
			}
		connections.push(paper.connection(paper.getById('gen0'), queue, "#000", "#fff"));
		connections.push(paper.connection(queue, paper.getById('ser0'), "#000", "#fff"));
		}
	};
	
Raphael.fn.new_server = function (paper,dragger,move, up,connections)
	{
	if(paper.getById('ser0'))
		{
		return alert('В данной версии возможен только один сервер!');
		}
	var server = paper.rect(30, 30, 60, 40, 10)
		.dblclick
		(
		function()
			{
			alert("ok");
			}
		);
	var color = Raphael.getColor();
	server.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
	server.drag(move, dragger, up);
	server.translate(200,75);
	server.id = 'ser'+server_i++;
	if(paper.getById('gen0') && !paper.getById('que0'))
		{
		connections.push(paper.connection(paper.getById('gen0'),server, "#000", "#fff"));
		}
	if(paper.getById('gen0') && paper.getById('que0'))
		{
		server.translate(250,0);
		connections.push(paper.connection(paper.getById('que0'),server, "#000", "#fff"));
		}
	};

Raphael.fn.new_sink = function (paper,dragger,move, up,connections)
	{
	if(paper.getById('sink0'))
		{
		return alert('В данной версии возможен только один прибор сбора данных!');
		}
	var sink = paper.path("m 11.703734,23.204311 c 0.639017,-0.368628 1.596857,-0.266938 2.129143,0.227532 l 4.232286,3.93034 c 0.532285,0.49447 1.402551,0.49447 1.934837,0 l 9.512723,-8.838179 c 0.532285,-0.49447 0.532285,-1.30291 0,-1.79738 l -3.985984,-3.701536 c -0.532286,-0.49447 -0.61165,-1.366466 -0.179253,-1.937204 l 7.254956,-9.550013 c 0.432396,-0.57073816 1.271191,-0.68259782 1.859579,-0.2478707 0,0 5.656731,4.1705832 5.656731,8.0017742 0,15.6794095 -13.683433,28.3894555 -30.5605801,28.3894555 -4.1255551,0 -8.1389061,-7.033172 -8.1389061,-7.033172 -0.3530326,-0.61777 -0.1190459,-1.42621 0.5199705,-1.794838 l 9.7644977,-5.648909 z").dblclick
		(
		function()
			{
			alert("ok");
			}
		);
	var color = Raphael.getColor();
	sink.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
	sink.drag(move, dragger, up);
	if(paper.getById('que0') )
		{
		sink.translate(700,100);
		}
	else
		{
		sink.translate(400,100);
		}
	sink.id = 'sink'+sink_i++;
	if(paper.getById('ser0'))
		{
		connections.push(paper.connection(paper.getById('ser0'),sink, "#000", "#fff"));
		}
	};
var el;
window.onload = function () {
    var dragger = function () {
        this.ox = (this.type == "rect" || this.type == "path" ) ? this.attr("x") : this.attr("cx");
        this.oy = (this.type == "rect" || this.type == "path" ) ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": .2}, 100);
    },
        move = function (dx, dy) {
	var att = this.type == "rect" 
				? {x: this.ox + dx, y: this.oy + dy} 
				: ( this.type == "path"
					? {x: this.ox + dx, y: this.oy + dy}
					: {cx: this.ox + dx, cy: this.oy + dy}
				);
	if(this.type == "path")
		{
		this.translate(dx,dy);
		this.translate(-dx+dx/10,-dy+dy/10);
		}
	else
		{
		this.attr(att);
		}
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            r.safari();
        },
        up = function () {
            this.animate({"fill-opacity": 0}, 500);
        },
        r = Raphael("holder", 1200, 550),
        panel = Raphael("editor-panel", 1200, 38),
        connections = [],
	icons =
		[
		//new save open
		panel.path("M23.024,5.673c-1.744-1.694-3.625-3.051-5.168-3.236c-0.084-0.012-0.171-0.019-0.263-0.021H7.438c-0.162,0-0.322,0.063-0.436,0.18C6.889,2.71,6.822,2.87,6.822,3.033v25.75c0,0.162,0.063,0.317,0.18,0.435c0.117,0.116,0.271,0.179,0.436,0.179h18.364c0.162,0,0.317-0.062,0.434-0.179c0.117-0.117,0.182-0.272,0.182-0.435V11.648C26.382,9.659,24.824,7.49,23.024,5.673zM22.157,6.545c0.805,0.786,1.529,1.676,2.069,2.534c-0.468-0.185-0.959-0.322-1.42-0.431c-1.015-0.228-2.008-0.32-2.625-0.357c0.003-0.133,0.004-0.283,0.004-0.446c0-0.869-0.055-2.108-0.356-3.2c-0.003-0.01-0.005-0.02-0.009-0.03C20.584,5.119,21.416,5.788,22.157,6.545zM25.184,28.164H8.052V3.646h9.542v0.002c0.416-0.025,0.775,0.386,1.05,1.326c0.25,0.895,0.313,2.062,0.312,2.871c0.002,0.593-0.027,0.991-0.027,0.991l-0.049,0.652l0.656,0.007c0.003,0,1.516,0.018,3,0.355c1.426,0.308,2.541,0.922,2.645,1.617c0.004,0.062,0.005,0.124,0.004,0.182V28.164z")
		.translate(0, 5)
		.click
			(
			function()
				{
				alert("click new");
				}
			),
		panel.path("M28.625,26.75h-26.5V8.375h1.124c1.751,0,0.748-3.125,3-3.125c3.215,0,1.912,0,5.126,0c2.251,0,1.251,3.125,3.001,3.125h14.25V26.75z")
		.translate(40,5)
		.click
			(
			function()
				{
				alert("click open");
				}
			),
		panel.path("M2.379,14.729 5.208,11.899 12.958,19.648 25.877,6.733 28.707,9.561 12.958,25.308z")
		.translate(80,5)
		.click
			(
			function()
				{
				alert("click save");
				}
			),
		//generator queue server sink
		panel.path("m 13.238076,13.442228 c 2.774405,2.455941 4.296812,5.726541 4.285996,9.205393 -0.0073,3.48364 -1.553955,6.764613 -4.349091,9.238908 l 4.276982,3.786044 c 8.119505,-7.187501 8.144743,-18.857614 0.05949,-26.0147956 L 13.237176,13.44143 z m 7.584095,-6.7039742 c 9.89069,8.7553792 9.845621,23.0378242 -0.09735,31.8394802 L 25,42.362183 C 37.300043,31.474013 37.344211,13.7949 25.096446,2.9530075 L 20.821269,6.737456 z M 11.69043,25.290273 c -1.63598,1.448192 -4.2887,1.44899 -5.9237785,0.0016 -1.6350772,-1.447395 -1.634176,-3.79562 0.00178,-5.243812 1.6341773,-1.446596 4.2868965,-1.447393 5.9219765,0 1.635078,1.447394 1.635078,3.794822 0,5.242216 z")
		.translate(130,-2).scale(.7)
		.click
			(
			function()
				{
				//alert("click generator");
				r.new_generate(r,dragger,move, up,connections);
				}
			),
		panel.path("M 10,10 h 105 v 30 h -105 zM 17.5,17.5 h 15 v 15 h -15 zM 42.5,17.5 h 15 v 15 h -15 zM 67.5,17.5 h 15 v 15 h -15 zM 92.5,17.5 h 15 v 15 h -15 z")
		.translate(150,-2).scale(.7)
		.click
			(
			function()
				{
				//alert("click queue");
				r.new_queue(r,dragger,move, up,connections);
				}
			),
		panel.rect(30, 30, 60, 40, 10)
		.translate(230,-28).scale(.7)
		.click
			(
			function()
				{
				//alert("click server");
				r.new_server(r,dragger,move, up,connections);
				}
			),
		panel.path("m 11.703734,23.204311 c 0.639017,-0.368628 1.596857,-0.266938 2.129143,0.227532 l 4.232286,3.93034 c 0.532285,0.49447 1.402551,0.49447 1.934837,0 l 9.512723,-8.838179 c 0.532285,-0.49447 0.532285,-1.30291 0,-1.79738 l -3.985984,-3.701536 c -0.532286,-0.49447 -0.61165,-1.366466 -0.179253,-1.937204 l 7.254956,-9.550013 c 0.432396,-0.57073816 1.271191,-0.68259782 1.859579,-0.2478707 0,0 5.656731,4.1705832 5.656731,8.0017742 0,15.6794095 -13.683433,28.3894555 -30.5605801,28.3894555 -4.1255551,0 -8.1389061,-7.033172 -8.1389061,-7.033172 -0.3530326,-0.61777 -0.1190459,-1.42621 0.5199705,-1.794838 l 9.7644977,-5.648909 z")
		.translate(320,1.25).scale(.8)
		.click
			(
			function()
				{
			//	alert("click sink");
				r.new_sink(r,dragger,move, up,connections);
				}
			),
		//run step diogram
		panel.path("M17.41,20.395l-0.778-2.723c0.228-0.2,0.442-0.414,0.644-0.643l2.721,0.778c0.287-0.418,0.534-0.862,0.755-1.323l-2.025-1.96c0.097-0.288,0.181-0.581,0.241-0.883l2.729-0.684c0.02-0.252,0.039-0.505,0.039-0.763s-0.02-0.51-0.039-0.762l-2.729-0.684c-0.061-0.302-0.145-0.595-0.241-0.883l2.026-1.96c-0.222-0.46-0.469-0.905-0.756-1.323l-2.721,0.777c-0.201-0.228-0.416-0.442-0.644-0.643l0.778-2.722c-0.418-0.286-0.863-0.534-1.324-0.755l-1.96,2.026c-0.287-0.097-0.581-0.18-0.883-0.241l-0.683-2.73c-0.253-0.019-0.505-0.039-0.763-0.039s-0.51,0.02-0.762,0.039l-0.684,2.73c-0.302,0.061-0.595,0.144-0.883,0.241l-1.96-2.026C7.048,3.463,6.604,3.71,6.186,3.997l0.778,2.722C6.736,6.919,6.521,7.134,6.321,7.361L3.599,6.583C3.312,7.001,3.065,7.446,2.844,7.907l2.026,1.96c-0.096,0.288-0.18,0.581-0.241,0.883l-2.73,0.684c-0.019,0.252-0.039,0.505-0.039,0.762s0.02,0.51,0.039,0.763l2.73,0.684c0.061,0.302,0.145,0.595,0.241,0.883l-2.026,1.96c0.221,0.46,0.468,0.905,0.755,1.323l2.722-0.778c0.2,0.229,0.415,0.442,0.643,0.643l-0.778,2.723c0.418,0.286,0.863,0.533,1.323,0.755l1.96-2.026c0.288,0.097,0.581,0.181,0.883,0.241l0.684,2.729c0.252,0.02,0.505,0.039,0.763,0.039s0.51-0.02,0.763-0.039l0.683-2.729c0.302-0.061,0.596-0.145,0.883-0.241l1.96,2.026C16.547,20.928,16.992,20.681,17.41,20.395zM11.798,15.594c-1.877,0-3.399-1.522-3.399-3.399s1.522-3.398,3.399-3.398s3.398,1.521,3.398,3.398S13.675,15.594,11.798,15.594zM27.29,22.699c0.019-0.547-0.06-1.104-0.23-1.654l1.244-1.773c-0.188-0.35-0.4-0.682-0.641-0.984l-2.122,0.445c-0.428-0.364-0.915-0.648-1.436-0.851l-0.611-2.079c-0.386-0.068-0.777-0.105-1.173-0.106l-0.974,1.936c-0.279,0.054-0.558,0.128-0.832,0.233c-0.257,0.098-0.497,0.22-0.727,0.353L17.782,17.4c-0.297,0.262-0.568,0.545-0.813,0.852l0.907,1.968c-0.259,0.495-0.437,1.028-0.519,1.585l-1.891,1.06c0.019,0.388,0.076,0.776,0.164,1.165l2.104,0.519c0.231,0.524,0.541,0.993,0.916,1.393l-0.352,2.138c0.32,0.23,0.66,0.428,1.013,0.6l1.715-1.32c0.536,0.141,1.097,0.195,1.662,0.15l1.452,1.607c0.2-0.057,0.399-0.118,0.596-0.193c0.175-0.066,0.34-0.144,0.505-0.223l0.037-2.165c0.455-0.339,0.843-0.747,1.152-1.206l2.161-0.134c0.152-0.359,0.279-0.732,0.368-1.115L27.29,22.699zM23.127,24.706c-1.201,0.458-2.545-0.144-3.004-1.345s0.143-2.546,1.344-3.005c1.201-0.458,2.547,0.144,3.006,1.345C24.931,22.902,24.328,24.247,23.127,24.706z")
		.translate(420,5).scale(1.2)
		.click
			(
			function()
				{
				alert("click RUN");
				}
			),
		panel.path("M25.5,15.5,15.2,9.552,15.2,15.153,5.5,9.552,5.5,21.447,15.2,15.847,15.2,21.447z")
		.translate(475,5).scale(1.6)
		.click
			(
			function()
				{
				alert("click STEP");
				}
			),
		panel.path("M3.625,25.062c-0.539-0.115-0.885-0.646-0.77-1.187l0,0L6.51,6.584l2.267,9.259l1.923-5.188l3.581,3.741l3.883-13.103l2.934,11.734l1.96-1.509l5.271,11.74c0.226,0.504,0,1.095-0.505,1.321l0,0c-0.505,0.227-1.096,0-1.322-0.504l0,0l-4.23-9.428l-2.374,1.826l-1.896-7.596l-2.783,9.393l-3.754-3.924L8.386,22.66l-1.731-7.083l-1.843,8.711c-0.101,0.472-0.515,0.794-0.979,0.794l0,0C3.765,25.083,3.695,25.076,3.625,25.062L3.625,25.062z")
		.translate(530,5).scale(1.6)
		.click
			(
			function()
				{
				alert("click diogram");
				}
			)
		];
	/*shapes = 
		[  
	//		r.ellipse(190, 100, 30, 20),
	//		r.rect(290, 180, 60, 40, 2),
	//		r.ellipse(450, 100, 20, 20),
	//		r.path(Raphael.format("M{0},{1}h{2}v{3}h{4}z", x, y, width, height, -width)),
			//r.path("M 70, 50 L 30 30 L 70 10 L 60 30 L 70 50 C 70 50 90 30 70 10 L 70 20 C 70 20 80 30 70 40 z"),
			r.path("m 13.238076,13.442228 c 2.774405,2.455941 4.296812,5.726541 4.285996,9.205393 -0.0073,3.48364 -1.553955,6.764613 -4.349091,9.238908 l 4.276982,3.786044 c 8.119505,-7.187501 8.144743,-18.857614 0.05949,-26.0147956 L 13.237176,13.44143 z m 7.584095,-6.7039742 c 9.89069,8.7553792 9.845621,23.0378242 -0.09735,31.8394802 L 25,42.362183 C 37.300043,31.474013 37.344211,13.7949 25.096446,2.9530075 L 20.821269,6.737456 z M 11.69043,25.290273 c -1.63598,1.448192 -4.2887,1.44899 -5.9237785,0.0016 -1.6350772,-1.447395 -1.634176,-3.79562 0.00178,-5.243812 1.6341773,-1.446596 4.2868965,-1.447393 5.9219765,0 1.635078,1.447394 1.635078,3.794822 0,5.242216 z").dblclick
				(
					function()
						{
						alert("ok");
						}
				),
			r.path("M 10,10 h 105 v 30 h -105 zM 17.5,17.5 h 15 v 15 h -15 zM 42.5,17.5 h 15 v 15 h -15 zM 67.5,17.5 h 15 v 15 h -15 zM 92.5,17.5 h 15 v 15 h -15 z").dblclick
				(
					function()
						{
						alert("ok");
						}
				),
			r.rect(30, 30, 60, 40, 10).dblclick
				(
					function()
						{
						alert("ok");
						}
				),
			//r.path("M 30, 50 L 70 30 L 30 10 C 30 10 50 30 30 50")
			r.path("m 11.703734,23.204311 c 0.639017,-0.368628 1.596857,-0.266938 2.129143,0.227532 l 4.232286,3.93034 c 0.532285,0.49447 1.402551,0.49447 1.934837,0 l 9.512723,-8.838179 c 0.532285,-0.49447 0.532285,-1.30291 0,-1.79738 l -3.985984,-3.701536 c -0.532286,-0.49447 -0.61165,-1.366466 -0.179253,-1.937204 l 7.254956,-9.550013 c 0.432396,-0.57073816 1.271191,-0.68259782 1.859579,-0.2478707 0,0 5.656731,4.1705832 5.656731,8.0017742 0,15.6794095 -13.683433,28.3894555 -30.5605801,28.3894555 -4.1255551,0 -8.1389061,-7.033172 -8.1389061,-7.033172 -0.3530326,-0.61777 -0.1190459,-1.42621 0.5199705,-1.794838 l 9.7644977,-5.648909 z").dblclick
				(
					function()
						{
						alert("ok");
						}
				)
                ]*/
	//r.set().push(shapes[3],r.circle((shapes[3].attr('x')+shapes[3].attr('height')/2+5),(shapes[3].attr('y')+shapes[3].attr('width')/2+5),10));
	for (var i = 0, ii = icons.length; i < ii; i++)
		{
		if(i >= 0 && i < 3)
			{
			icons[i].attr({fill: "#000", stroke: "#000", "fill-opacity": 100, "stroke-width": 1});
			icons[i].hover
				(
				function ()
					{
					this.attr({stroke:"#fff","stroke-width": 5,"stroke-opacity": 0.8});
					},
				function ()
					{
					this.attr({stroke:"#000","stroke-width": 1,"stroke-opacity":0});
					}
				);
			}
		if(i >= 3 )
			{
			icons[i].attr({fill: "#fff", stroke: "#000", "fill-opacity": 0.2, "stroke-width": 2});
			icons[i].hover
				(
				function ()
					{
					this.attr({stroke:"#fff"});
					},
				function ()
					{
					this.attr({stroke:"#000"});
					}
				);
			}
		}
	/*for (var i = 0, ii = shapes.length; i < ii; i++) {
		var color = Raphael.getColor();
		shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
		shapes[i].drag(move, dragger, up);
		}
    
    //shapes[0].route(45,4.135,16.762);
    shapes[0].translate(90,63.5);
    shapes[1].translate(200,55);
    shapes[2].translate(202.5,125);
    var phone = shapes[3].translate(380,159);
  */
    //connections.push(r.connection(shapes[0], shapes[1], "#000","#fff"));
    //connections.push(r.connection(shapes[1], shapes[2], "#000", "#fff"));
    //connections.push(r.connection(shapes[2], phone, "#000", "#fff"));
    //connections.push(r.connection(shapes[1], shapes[4], "#000", "#fff"));
 //   connections.push(r.connection(shapes[1], shapes[5], "#000", "#fff"));
 //   connections.push(r.connection(shapes[1], shapes[6], "#000", "#fff"));
 //   connections.push(r.connection(shapes[1], shapes[7], "#000", "#fff"));
};

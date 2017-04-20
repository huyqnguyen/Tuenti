//process.stdout.write(process.argv[2]+"\r\n");
//process.exit();
var exec = require('child_process').exec;
var dse_sessionId_last = '';
var argv = process.argv;
var config_cardInfoID = argv[2];
var bindhost = '0.0.0.0';
var bindport = argv[3];
var targethost = '';
var targetport = 0;
var net = require('net');
var loglevel = 1;
var firadio = require('firadio');
var gbk_to_utf8 = firadio.gbk_to_utf8;
//===================================
// var reopen_icbc = (function (timeout) {
// 	return;
// 	if (timeout == undefined) timeout = 10000;
// 	setTimeout(function () {
// 		exec("taskkill /f /im iexplore.exe", function (error, stdout, stderr) {
// 			exec("\"C:/Program Files/Internet Explorer/IEXPLORE.EXE\" http://127.0.0.1:" + bindport);
// 		});
// 	}, timeout);
// });
process.title = 'Forwarder[' + bindport + ']';
var stdin = process.openStdin();
stdin.setEncoding('binary');
stdin.on('data', function (chunk) {
	var chunk_len = chunk.length - 2;
	chunk = gbk_to_utf8(chunk.substr(0, chunk_len));
	if (chunk == 'exit') {
		process.exit();
	}
	process.stdout.write('data:[' + chunk + '](' + chunk_len + ")\r\n");
});
stdin.on('end', function () {
	process.stdout.write('end');
});
//===================================
var config = require('./config.js');
var setloginok = (function (dse_sessionId) {
	var path = 'c:/windows/temp/icbc_cardid_' + config_cardInfoID + '.txt';
	var fs = require('fs');
	fs.writeFile(path, dse_sessionId, function (err) {
		if (err) throw err;
		console.log('write to ' + path + ' is succeed!');
	});
});
var logwrite = function (resultBuffer, isclose) {
	resultBuffer = firadio.date('Y-m-d H:i:s.K') + " " + resultBuffer;
	console.log(resultBuffer);
	if (isclose != undefined) process.exit();
	var fs = require('fs');
	fs.open('./logs/' + bindport + '.txt', "a", 0644, function (e, fd) {
		if (e) throw e;
		fs.write(fd, resultBuffer + "\r\n", 0, 'utf8', function (e) {
			if (e) throw e;
			fs.closeSync(fd);
			if (isclose != undefined) process.exit();
		});
	});
}
var mysqlclient = require('mysql').Client;
/*
mysqlclient.on('error',function(data){
	logwrite('Connecting to MySQL...');
});//*/
var mysqlconn = new mysqlclient();
mysqlconn.host = config.mysql.host;
mysqlconn.port = config.mysql.port;
mysqlconn.database = config.mysql.database;
mysqlconn.user = config.mysql.user;
mysqlconn.password = config.mysql.password;
/*
logwrite('Connecting to MySQL...');
mysqlconn.connect(function(error,results){
	if(error){
		logwrite('Connection Error: '+error.message);
		return;
	}
	logwrite('Connected to MySQL');
});//*/
mysqlconn.charset = 'utf8';
mysqlconn.query("set names '" + mysqlconn.charset + "'", function (error, results) {
	if (error) {
		logwrite('ClientConnectionReady Error: ' + error.message);
		return;
	}
	get_ipport();
	if (loglevel >= 1) logwrite('Connected to Mysql !!!');
});
//完成数据库连接
var mysql_updatebankinfo = function (data) {
	var sql = "UPDATE bank_cardinfo SET getdata_list='" + data + "' WHERE id='1'";
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('ClientConnectionReady Error: ' + error.message);
			//mysqlconn.end();
			return;
		}
	});
	//logwrite(data);
}
function replaceAll(s1, s2, s3) {
	var r = new RegExp(s2.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
	return s1.replace(r, s3);
}
var server = net.createServer(function (serverc) {
	var conndatetime = +new Date();
	var conndatetime_txt = 0, attachment_content_buf = new Buffer(0);
	var ContentLength = 0;
	if (loglevel >= 2) logwrite('[Forwarder] There is a new connection!');
	console.log('target server: ', targethost, targetport);
	var client = net.connect(targetport, targethost, function () {
		console.log('Conntected to [target server]!');
		if (loglevel >= 2) logwrite('Conntected to [target server]!');
		//client.write('world!\r\n');
	});
	client.on('data', function (data) {
		if (loglevel >= 2) logwrite('Received data from [target server]!');
		writemysql(2, conndatetime, data);//将收到的数据写入数据库
		var header = firadio.http.getheader(data);
		// if (config_cardInfoID == 5 || config_cardInfoID == 6) {//建设银行
		// 	if (header['Content-disposition'] != undefined) {
		// 		ContentLength = firadio.intval(header['Content-Length']);
		// 		attachment_content_buf = data.slice(header['buf_headeroveri'], header['buf_length']);
		// 		conndatetime_txt = conndatetime;
		// 		//logwrite(header);
		// 		//logwrite(firadio.gbk_to_utf8(attachment_content_buf.toString('binary')));
		// 	} else if (conndatetime_txt == conndatetime) {
		// 		//firadio.log('['+attachment_content_buf);
		// 		attachment_content_buf = new Buffer(attachment_content_buf.toString('binary') + data.toString('binary'), 'binary');
		// 		//logwrite(firadio.gbk_to_utf8(data.toString('binary')));
		// 		//logwrite('=======================================================');
		// 		if (attachment_content_buf.length >= ContentLength) {
		// 			//logwrite('接到来自[目标服务器]的数据:'+firadio.gbk_to_utf8(attachment_content_buf.toString('binary')));
		// 			var utf8_content = firadio.gbk_to_utf8(attachment_content_buf.toString('binary'));
		// 			var arr = utf8_content.split("\r\n");
		// 			for (var key in arr) {
		// 				var line = arr[key];
		// 				var row = line.split(',');
		// 				var transfers = {};
		// 				if (row.length >= 9) {
		// 					transfers['serialNo'] = firadio.md5(line);
		// 					transfers['payDateTime'] = row[0];//发生日期
		// 					transfers['tradingPlaces'] = row[1];//交易地点
		// 					if (row[2] > '') {//支出
		// 						transfers['amount'] = -(firadio.intval(row[2]));//支出
		// 						transfers['payerCardNum'] = '';
		// 						transfers['payerName'] = '';
		// 						transfers['payeeCardNum'] = row[5];//对方账号(收款卡号)
		// 						transfers['payeeName'] = row[6];//对方户名
		// 					} else {
		// 						transfers['amount'] = (firadio.intval(row[3]));//收入
		// 						transfers['payerCardNum'] = row[5];//对方账号(支付卡号)
		// 						transfers['payerName'] = row[6];//对方户名
		// 						transfers['payeeCardNum'] = '';
		// 						transfers['payeeName'] = '';
		// 					}
		// 					transfers['balance'] = firadio.intval(row[4]);//账户余额
		// 					transfers['moneyType'] = row[7];//币种
		// 					transfers['notes'] = row[8];//摘要
		// 					transfers['paystate'] = '';
		// 					transfers['payisok'] = 0;
		// 					//logwrite(transfers);
		// 					//=======================================================================================
		// 					insert_transfers(transfers);
		// 				}
		// 			}
		// 			//var fs=require('fs');
		// 			//fs.writeFileSync('1.txt', attachment_content_buf,'binary');
		// 		}
		// 	}
		// }
		//client.end();
		var arr = data.toString().split("\r\n");
		if (arr[0].substr(0, 12) == 'HTTP/1.1 200') {
			for (var i = 0; i < 10; i++) {
				if (arr[i] == "" || arr[i] == "\r\n" || arr[i] == "\r" || arr[i] == "\n") break;
				//logwrite(arr[i]);
			}
			//logwrite('');
		}
		for (var key in arr) {
			var headerline = arr[key];
			var linearr = headerline.split(': ');
			var headername = linearr[0];
			var headervalue = linearr[1];
			if (headername == 'Set-Cookie') {
				writemysql_setcookie(config_cardInfoID, headervalue);
				//logwrite(headerline);
				break;
			}
		}
		try {
			serverc.write(data);//向[客户端]发送数据
		} catch (e) {
			if (loglevel >= 2) logwrite('Encountered error' + e + ' while send data to [Client]');
		}
	});
	client.on('end', function () {
		console.log('[Target Server] closed connection!');
		if (loglevel >= 2) logwrite('[Target Server] closed connection!');
		serverc.end();//关闭客户端的连接
	});
	client.on('error', function (err) {
		console.log('Can\'t connect to [Target Server]!', err);
		if (loglevel >= 1) logwrite('Can\'t connect to [Target Server]!');
	});
	//serverc.write('hello\r\n');
	serverc.on('end', function () {
		if (loglevel >= 2) logwrite('There is a client is disconnected!');
		client.end();//断开目标服务器
	});
	serverc.on('error', function () {
		if (loglevel >= 1) logwrite('[serverc-on-error] encountered error while send data to client!');
	});
	serverc.on('data', function (data) {
		/*
			data=replaceAll(data,'http://192.168.0.10:'+bindport,'https://mybank.icbc.com.cn');
			data=replaceAll(data,'http://127.0.0.1:'+bindport,'https://mybank.icbc.com.cn');
			data=replaceAll(data,'192.168.0.10:'+bindport,'mybank.icbc.com.cn');
			data=replaceAll(data,'127.0.0.1:'+bindport,'mybank.icbc.com.cn');
		//*/
		//console.log("there is data coming from serverc");
		//console.log(data);
		if (loglevel >= 2) logwrite('Received data from [Client]!');
		//logwrite('转发器有数据传入'+data.toString());
		var i = data.toString().indexOf("\r\n");
		var line1 = data.toString().substr(0, i);
		var header_method = '';
		if (line1.substr(0, 3) == 'GET') {
			header_method = 'GET';
		} else if (line1.substr(0, 4) == 'POST') {
			header_method = 'POST';
		}
		var browser_header = '', browser_data = '';
		if (header_method > '') {
			var i = data.toString().indexOf("\r\n\r\n");
			browser_header = data.toString().substr(0, i);
			browser_data = data.toString().substr(i + 4);
		}
		if (targetport != '8800') {
			//writemysql_postdata：数据标记,配置卡ID，数据，是否覆盖原有数据
			writemysql_postdata(conndatetime, config_cardInfoID, data, 0);
		}
		//logwrite(browser_header);
		if (browser_header > '') {
			var browser_cookie = '';
			var header_arr = browser_header.split("\r\n");
			for (var key in header_arr) {
				var headerline = header_arr[key];
				var linearr = headerline.split(': ');
				var headername = linearr[0];
				var headervalue = linearr[1];
				if (headername == 'Cookie') {
					browser_cookie = headervalue;
					//logwrite(headerline);
					//break;
				}
			}
			var getinfo = header_arr[0].split(' ');
			var urls = getinfo[1].split('?');
			var url = urls[0];//不包含请求信息的URL
			var i = getinfo[1].indexOf('dse_sessionId');
			if (i != -1) {
				var dse_sessionId = getinfo[1].substr(i + 14, 40);
				writemysql_icbc_sessionId(config_cardInfoID, dse_sessionId, url);

				//工行使用的Cookie.BIGipServergeren_80_pool
				if (browser_cookie.indexOf('BIGipServergeren_80_pool') != -1) {
					logwrite("Cookie.BIGipServergeren_80_pool inserted to database");
					writemysql_setcookie(config_cardInfoID, browser_cookie)
				}
			}

			if (url == '/CmbBank_PB/UI/PBPC/DebitCard_AccountManager/am_QueryTodayTrans.aspx' || url == '/CmbBank_PB/UI/PBPC/DebitCard_AccountManager/am_QueryHistoryTrans.aspx') {
				writemysql_postdata(conndatetime, config_cardInfoID, data, 1);
			}
			// else if (url == '/app/B2CMainB1L1' && urls[1].indexOf('CCB_IBSVersion=V5&SERVLET_NAME=B2CMainB1L1&ROW_NO=3') != -1) {
			// 	//建行
			// 	logwrite("---Get CCB Info---");
			// 	writemysql_postdata(conndatetime, config_cardInfoID, data, 1);
			// 	/*
			// 	if(urls.length >= 2){
      //               if(urls[1] == "CCB_IBSVersion=V5&SERVLET_NAME=B2CMainB1L1"){
      //                   logwrite("hello...");
      //                   writemysql_postdata(conndatetime,config_cardInfoID,data,1);
      //               }
      //           }
      //           */
			// }

			if (header_method == 'GET') {
				var urlrequest = urls[1];
				var urlarr = url.split("/");
				var urlpathlast = urlarr[urlarr.length - 1];
				filenamearr = urlpathlast.split(".");
				//logwrite(url);
				var filenameext = '';
				if (filenamearr.length >= 2) {
					filenameext = filenamearr[filenamearr.length - 1].toLowerCase();
				}
				if (filenameext == 'gif' || filenameext == 'jpg' || filenameext == 'js' || filenameext == 'png' || filenameext == 'htm' || filenameext == 'html' || filenameext == 'css') {
					if (loglevel >= 1.5) logwrite(url);
				} else if (filenameext == 'Verifyimage2') {
					if (loglevel >= 1.5) logwrite(url);
				} else {
					if (loglevel >= 2) logwrite('send data to [Target Server]');
					writemysql(1, conndatetime, data);//写入数据库
					if (urlpathlast == 'ICBCINBSReqServlet') {
						//用于抓取转账汇款
						//mysql_updatebankinfo(data.toString());
						logwrite(data[0] + ',' + data[1]);
						//logwrite(arrTOhex(data));
					} else {
						logwrite(url);
					}
				}
			} else if (header_method == 'POST') {
				//POST类型的数据
				writemysql(1, conndatetime, data);//写入数据库
			}
		}
		try {
			client.write(data);//向[目标服务器]发送数据
		} catch (e) {
			if (loglevel >= 2) logwrite('encountered error ' + e + ' while send data to [target server]');
		}
	});
	//serverc.pipe(serverc);
});
server.on('error', function (data) {
	var errorinfo = data.toString();
	if (errorinfo == 'Error: listen EADDRINUSE') {
		errorinfo = 'the port trying to listen is occupied already!';
	}
	logwrite('forwarder got error :' + errorinfo, 1);
});
server.listen(bindport, bindhost, function () {
	logwrite('the forwarder is listenning on: ' + bindhost + ':' + bindport);
	// reopen_icbc(1);
});
function arrTOhex(arr) {
	//将字符串转化成16进制表示的字符串，用于MYSQL二进制形式插入数据，例如0xa30f
	var hexi = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	var outstr = '';
	for (var key in arr) {
		if (arr[key] >= 0 && arr[key] <= 255) {
			var bit0 = hexi[arr[key] % 16];
			var bit1 = hexi[parseInt(arr[key] / 16)];
			outstr += bit1 + bit0;
		}
	}
	return (outstr);
}
function writemysql(type, dateid, data) {
	if (loglevel < 2) return (false);
	var addtime = dateid / 1000;
	var datahex = arrTOhex(data);
	if (type == 1) {//发送的
		var sql = "INSERT INTO netdata(addtime,data1,data2)VALUES('" + addtime + "',0x" + datahex + ",'');";
	} else {//接收的
		var sql = "UPDATE netdata SET data2=concat(data2,0x" + datahex + ") WHERE addtime='" + addtime + "';";
	}
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('ClientConnectionReady Error: ' + error.message);
			return;
		}
		if (loglevel >= 2) logwrite('Mysql插入成功！');
	});
}
function writemysql_setcookie(id, browser_cookie) {
	var sql = "UPDATE bank_cardinfo SET browser_cookie='" + browser_cookie + "' WHERE id='" + id + "';";
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('ClientConnectionReady Error: ' + error.message + " sql=" + sql);
			return;
		}
		logwrite('Mysql更新成功：browser_cookie=' + browser_cookie);
		/*if(browser_cookie_last!=browser_cookie){
			browser_cookie_last=browser_cookie;
			setloginok(browser_cookie);
		}*/
	});
}
function writemysql_setheader(id, browser_header, browser_cookie) {
	//javascript:alert('asdf'.indexOf('a'));----[0]
	//javascript:alert('asdf'.indexOf('b'));----[-1]
	if (browser_cookie.indexOf('twcookie{JSESSIONID}=') != -1) {
		return;
	}
	var sql = "UPDATE bank_cardinfo SET browser_header ='" + browser_header + "',browser_cookie='" + browser_cookie + "' WHERE id='" + id + "';";
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('ClientConnectionReady Error: ' + error.message + " sql=" + sql);
			return;
		}
		logwrite('Mysql更新成功：browser_header成功！');
	});
}
function writemysql_icbc_sessionId(id, dse_sessionId, url) {
	var sql = "UPDATE bank_cardinfo SET dse_sessionId='" + dse_sessionId + "' WHERE id='" + id + "';";
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('ClientConnectionReady Error: ' + error.message + " sql=" + sql);
			return;
		}
		logwrite('Mysql更新成功：dse_sessionId=' + dse_sessionId + ',url' + url);
		if (dse_sessionId_last != dse_sessionId) {
			dse_sessionId_last = dse_sessionId;
			setloginok(dse_sessionId);
		}
		/*
		/servlet/com.icbc.inbs.person.servlet.ICBCINBSCenterServlet
		/icbc/newperbank/account/index_buttom.jsp
		//*/
		// if (url == '/icbc/newperbank/account/index_buttom.jsp') {
		// 	reopen_icbc();
		// }
	});
}
function writemysql_postdata(conndatetime, id, browser_postdata, isnew) {
	var sql = '';
	if (isnew == 1) {
		sql = "UPDATE bank_cardinfo SET browser_posttime='" + conndatetime + "',browser_postdata='" + browser_postdata + "' WHERE id='" + id + "';";
	} else {
		sql = "UPDATE bank_cardinfo SET browser_postdata=CONCAT(browser_postdata,'" + browser_postdata + "') WHERE browser_posttime='" + conndatetime + "' AND id='" + id + "';";
	}
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('ClientConnectionReady Error: ' + error.message);
			return;
		}
		if (loglevel >= 2) logwrite('Mysql更新[browser_header]成功！');
	});
}
function get_ipport() {
	var sql = "SELECT id,zhuaqu_ipv4,zhuaqu_port FROM bank_cardinfo WHERE id='" + config_cardInfoID + "'";
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('get_ipport Error: ' + error.message);
		} else if (results.length == 1) {
			_targethost = results[0]['zhuaqu_ipv4'];
			_targetport = results[0]['zhuaqu_port'];
			{
				//_targethost=_targethost.replace(/[0-9]{1,3}(.*)/,"127$1");
			}
			if (targethost != _targethost || targetport != _targetport) {
				if (targethost == '' && targetport == 0) {
					targethost = _targethost; targetport = _targetport;
					process.title += "[" + targethost + ":" + targetport + "]";
					logwrite('targethost: ' + targethost + ', targetport: ' + targetport);
				} else {
					logwrite("抓取服务器的IP地址有更新！", 1)
				}
			}
			setTimeout(get_ipport, config.mysql.interval * 1000);
		}
	});
}
function insert_transfers(transfers) {
	var adddoutsp = (+new Date()) / 1000;
	var sql = "UPDATE bank_cardinfo SET checkstate='1',checktime='" + adddoutsp + "' WHERE id='" + config_cardInfoID + "'";
	mysqlconn.query(sql, function (error, results) { });
	var sql = "SELECT id FROM bank_transfers WHERE serialNo='" + transfers['serialNo'] + "'";
	mysqlconn.query(sql, function (error, results) {
		if (error) {
			logwrite('ClientConnectionReady Error: ' + error.message);
			//return;
		} else if (results.length == 0) {
			var adddoutsp = (+new Date()) / 1000;
			var sql = "INSERT INTO bank_transfers(adddoutsp,payDateTime,cardInfoID,cardTypeID,serialNo,tradingPlaces,payerCardNum,payerName,payeeCardNum,payeeName,amount,balance,fuyan_state,paystate,payisok)";
			sql += "VALUES('" + adddoutsp + "','" + transfers['payDateTime'] + "','" + config_cardInfoID + "','2','" + transfers['serialNo'] + "','" + transfers['tradingPlaces'] + "'";
			sql += ",'" + transfers['payerCardNum'] + "','" + transfers['payerName'] + "','" + transfers['payeeCardNum'] + "','" + transfers['payeeName'] + "'";
			sql += ",'" + transfers['amount'] + "','" + transfers['balance'] + "','1','" + transfers['paystate'] + "','" + transfers['payisok'] + "'";
			sql += ")";
			mysqlconn.query(sql, function (error, results) {
				if (error) {
					logwrite('ClientConnectionReady Error: ' + error.message);
					//return;
				}
			});
			//logwrite(sql);
			//insert_transfers(transfers);
		}
	});

}
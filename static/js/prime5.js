function clearChart(cardid='chart_body'){
	$("div[id='" + cardid +  "']").empty();
	//$("div[id='" + cardid +  "']").destroy();
}
// aso amenability and seq converter같은 api에는 optionid 제공해주어야함.
// optionid= '#id1,#id2,#id2.....'
function sendSeq(sub_function, route, cardid="#chart_body", convid="#convtable", optionid='') {
	//console.log(optionid);
	if(optionid == ''){
		var seq = $("#seq").val();
		/*var donor_site = $("#donor_site").val();
		if (seq == '' && donor_site == '') {
			alert("Enter sequence first!! 😜");
			return null
		}*/
		if(route == '/spliceai/asodesign'){
			var tableData = showAllData();
			console.log(tableData, "test");
			var response_data = request_data(data=tableData, http_method="post", asysnc_bool=false, route=route, time=100000000);
		}
		else if(route == '/spliceai'){
			var original = $("#original").is(":checked");
			request_data1(data={"seq":seq, "original": original}, http_method="post", asysnc_bool=true, route=route, time=100000000, sub_function=sub_function, cardid=cardid, convid=convid);
		}
		else{
			var match_point = $("#match_point").val();
			if (route=='/maxentscan_seq'){
				var route = route.split('_')[0];
				console.log(route);
				var utr5 = $("#utr5").val();
				var utr3 = $("#utr3").val();
				if (/^$|^[ACTGacgt]{9}$/.test(utr5) ==false){
					alert('Please check your input format (5`(donor) is 9 mer).');
					return
				}
				if (/^$|^[ACTGacgt]{23}$/.test(utr3) ==false){
					alert('Please check your input format (5`(donor) is 9 mer).');
					return
				}
				if (utr5=="" && utr3==""){
					alert('Please check your input format(input data is non).');
					return
				}
				var seq=""
			}
			request_data1(data={"seq":seq, "match_point": match_point, 'utr5': utr5, 'utr3': utr3 }, http_method="post", asysnc_bool=true, route=route, time=100000000, sub_function=sub_function, cardid=cardid, convid=convid);
		}
	}
	else{
		var seq = $("#seq").val();
		//var hg19 = $("#btncheck_hg19").val();
		//var hg38 = $("#btncheck_hg38").val();
		if (seq == '') {
			alert("Enter sequence first!! 😜");
			return null
		}

		var opt_list = optionid.replace(' ', '').split(',');
		var data = {};
		data["seq"] = seq;
		for(var opt of opt_list){
			var name = opt.replace('#', '');
			var checked = $(opt).is(":checked");
			data[name] = checked;
		}
		console.log('data');
		var response_data = request_data(data=data, http_method="post", asysnc_bool=false, route=route, time=100000000);
	}
	sub_function(response_data, cardid, convid);
}

function check_exon(){
	var check_exon = $("#check_exon").is(":checked");
	console.log(check_exon);
	if (check_exon==true){
		return 0;
	}
	else{

	}
}

function send_splice_site(sub_function, route, cardid="#chart_body", convid="#convtable", optionid='') {
	if(route == '/spliceai/asodesign'){
		var mut_sites = document.getElementById("mutation").value;
		var n_mask = document.getElementById("n_mask").value;
		var tilingLen = document.getElementById("tiling_len").value;
		var strands = document.getElementById('strands');
		var strand = strands.value;
		var rank = document.getElementById("rank").value;
		var distance = document.getElementById('distance').value;
		var interval = document.getElementById('interval').value;
		var cache = document.getElementById('btncheck_cached').checked;

		if (tilingLen == ""){ tilingLen=18; }
		if (rank == ""){ rank=20; }
		if (interval == ""){ interval=1; }
		console.log(interval, "interval");
		console.log(n_mask, "n_mask");


		var valid_lines = validateGeneticData(mut_sites);
		if (valid_lines.includes(false)) {
			return
		}

		var tableData = showAllData();
		var tableData = tableData.map(item => {
			return {
			acceptor_site: item.acceptorSite,
			donor_site: item.donorSite,
			mut_sites: mut_sites,
			strategy: item.strategy,
			tiling_len: String(tilingLen),
			strand: String(strand),
			rank: String(rank),
			distance: String(distance),
			interval: String(interval),
			cache: cache
		  };
		});

		console.log(JSON.stringify(tableData));
		var response_data = request_data(data=tableData, http_method="post", asysnc_bool=false, route=route, time=100000000);
		document.getElementById("seq").value = "";
		document.getElementById("donor_site").value = "";
		document.getElementById("mutation").value = "";
		rank.value="";
		tilingLen="";
	}
	else{
		alert('This page is not spliceAI ASO Design.');
		return 0;
	}
	sub_function(response_data, cardid, convid);
}



function request_data(data, http_method, asysnc_bool, route, time) {
	var response_data;
	$.ajax({
		type: http_method,
		async: asysnc_bool,
		url: "http://" + "143.248.23.236" + ":" + "4042" + route,
		contentType: 'application/json; charset=utf-8;',
		headers: { 'Access-Control-Allow-Origin': '*', },
		dataType: 'json',
		data: JSON.stringify(data),
		cors: true,
		timeout: time,
		success: function (received_data) {
			console.log("Response is success!");
			response_data = received_data
		},
		error: function(xhr, status, error) {
			alert("fail\n" + '\n' +status +'\n' + error);
		},
		beforeSend: function () {
			$('.loader').removeClass('display-none');
		},
		complete: function () {
			$('.loader').addClass('display-none');
		}
	});
	return response_data;
}


function request_data1(data, http_method, asysnc_bool, route, time, sub_function, cardid, convid) {
	var response_data;
	$.ajax({
		type: http_method,
		async: asysnc_bool,
		url: "http://" + "143.248.23.236" + ":" + "4042" + route,
		contentType: 'application/json; charset=utf-8;',
		headers: { 'Access-Control-Allow-Origin': '*', },
		dataType: 'json',
		data: JSON.stringify(data),
		cors: true,
		timeout: time,
		success: function (received_data) {
			console.log("Response is success!");
			response_data = received_data
			sub_function(response_data, cardid, convid);
		},
		error: function(xhr, status, error) {
			alert("fail\n" + '\n' +status +'\n' + error);
		},
		beforeSend: function () {
			$('.loader').removeClass('display-none');
		},
		complete: function () {
			$('.loader').addClass('display-none');
		}
	});
}

function request_data2(data, http_method, async_bool, route, time, callback) {
    $.ajax({
        type: http_method,
        async: async_bool,
        url: "http://" + "143.248.23.236" + ":" + "4042" + route,
        contentType: 'application/json; charset=utf-8',
        headers: { 'Access-Control-Allow-Origin': '*' },
        dataType: 'json',
        data: JSON.stringify(data),
        timeout: time,
        success: function (received_data) {
            console.log("Response is success!");
			if (callback) callback(null, received_data);
        },
        error: function(xhr, status, error) {
            alert("fail\n" + '\n' +status +'\n' + error);
			if (callback) callback(error, null);
        },
        beforeSend: function () {
            $('.loader').removeClass('display-none');
        },
        complete: function () {
            $('.loader').addClass('display-none');
        }
    });
}



function test_run(response_data, cardid){
	var cardid = cardid.split(',');
	//var convid = convid.split(',');
	console.log(cardid);
	for(var card of cardid ){
		clearChart(card);
	}
	//clearChart(cardid);
	var ref_seq = response_data["seq"][0];
	let ref_seq_len = ref_seq.length;
	var alt_seq = response_data["seq"][1];
	let alt_seq_len = alt_seq.length;
	//id="#chart_body"
	hexamer_figure(data=response_data["resources"][0], id=cardid[0], hexamerid="ref_hexamer_plot", seq_len=ref_seq_len);
	hexamer_figure(data=response_data["resources"][1], id=cardid[1], hexamerid="alt_hexamer_plot", seq_len=alt_seq_len);
}


function oligo_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = ["input", "match_point", "link"];
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}


function gnomad_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = Object.keys(response_data['resources'][0]);
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function topmed_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = Object.keys(response_data['resources'][0]);
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function labranchor_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = Object.keys(response_data['resources'][0]);
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function hexamer_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = Object.keys(response_data['resources'][0]);
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function vep_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = Object.keys(response_data['resources'][0]);
	show_converted(response_data['resources'], columns, id=cardid, index=true, tableid=convid);
}

function parse2mane_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	//var columns = Object.keys(response_data['resources'][0])
	var columns = ['Variant', 'Strand', 'Gene', 'Transcript ID', 'Variant Type', 'HGVS'];
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function litvar_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = ['LitVar Link', 'Publication Count']; //"facets_year" -> graph
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function maxentscan_run(response_data, cardid, convid){
	var cardid = cardid.split(',');
	var convid = convid.split(',');
	for(var card of cardid ){
		clearChart(card);
	}
	console.log(response_data);
	var columns = ['MaxEntScan', 'Scores'];
	if(typeof response_data['resources'] == "object"){
		let strands =  Object.keys(response_data['resources']);
		for(var index=0; index<strands.length; index++){
			if(strands[index] == '+'){
				show_converted(response_data['resources'][strands[index]], columns, cardid[0], false, convid[0] );
			}
			else{
				show_converted(response_data['resources'][strands[index]], columns, cardid[1], false, convid[1] );
			}
		}
	}
	else{
		show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
	}
}


function maxentscan_seq_run(response_data, cardid, convid){
	for(var card of cardid ){
		clearChart(card);
	}
	console.log(response_data);
	var columns = ['MaxEntScan', 'Scores'];
	if(typeof response_data['resources'] == "object"){
		show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
	}
	else{
		show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
	}
}


function utrannotator_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	var columns = ['Transcript ID', 'existing_InFrame_oORFs', 'existing_OutOfFrame_oORFs', 'existing_uORFs',
				  '5_prime_UTR_variant_annotation', '5_prime_UTR_variant_consequence'];
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function seq_converter_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	// 나중에 수정
	let microsynth = $("#microsynth").is(":checked");
	var columns = [];
	for(var key in response_data['resources'][0]){
		if(response_data['resources'][0][key] != "none"){
			if(key == 'microsynth'){
				let microsynth = $("#microsynth").is(":checked");
				if(microsynth){columns.push(key);}
			}
			else{
				columns.push(key);
			}
		}
	}
	console.log(microsynth);
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function split2vcf_run(response_data, cardid, convid){
	console.log(response_data);
	var cardid = cardid.split(',');
	for(var card of cardid){
		clearChart(card);
	}
	var columns_ensembl = ['Gene', 'Gene ID', 'Transcript ID', 'Strand', 'Exon', 'Intron', 'HGVSc', 'HGVSp',
					'Variant Type', 'Canonical', 'MANE Select', 'Mane Plus Clinical', 'APPRIS', 'Clinical Significance',
					'Existing Variation', 'SIFT', 'SIFT4G', 'PolyPhen2', 'Condel', 'REVEL' ];

	var columns_refseq = ['Gene', 'Gene ID', 'Transcript ID', 'Strand', 'Exon', 'Intron', 'HGVSc', 'HGVSp',
                	'Variant Type', 'Canonical', 'MANE Select', 'Mane Plus Clinical', 'APPRIS', 'Clinical Significance',
   			        'Existing Variation', 'SIFT', 'PolyPhen2'];
	var convid = convid.split(',');
	show_converted(response_data['ensembl'], columns_ensembl, id=cardid[0], index=true, tableid=convid[0]);
	show_converted(response_data['refseq'], columns_refseq, id=cardid[1], index=true, tableid=convid[1]);
}

function spliceai_run(response_data, cardid, convid){
	var cardid = cardid.split(',');
	var convid = convid.split(',');
	console.log(cardid, convid);
	for(var card of cardid ){
		clearChart(card);
	}
	var columns=['result (Acceptor Loss)','pre-mRNA position (Acceptor Loss)', 'AL_mes',
		'result (Donor Loss)', 'pre-mRNA position (Donor Loss)', 'DL_mes',
		'result (Acceptor Gain)','pre-mRNA position (Acceptor Gain)', 'AG_mes',
		'result (Donor Gain)','pre-mRNA position (Donor Gain)', 'DG_mes'];
	if(typeof response_data['resources'] == "object"){
		let strands =  Object.keys(response_data['resources']);
        if (!strands.includes('+')){
            const card_element_plus = document.getElementById(cardid[0].replace('#', ''));
            const conv_element_plus = document.getElementById(cardid[0].replace('#', ''));
            const nav_element_plus = document.getElementById('nav-strand-spliceai-plus')
            card_element_plus.remove();
            conv_element_plus.remove();
            nav_element_plus.remove();
        }
        if (!strands.includes('-')){
            const card_element_minu = document.getElementById(cardid[1].replace('#', ''));
            const conv_element_minu = document.getElementById(cardid[1].replace('#', ''));
            const nav_element_minu = document.getElementById('nav-strand-spliceai-minus')
            card_element_minu.remove();
            conv_element_minu.remove();
            nav_element_minu.remove();
        }
		//console.log(response_data);
		if(response_data['merged_link'] != null){
			document.getElementById("ucsc-link").innerHTML = response_data['merged_link'];
		}
		//const ucsc_link = document.getElementById('ucsc-link');
		for(var index=0; index<strands.length; index++){
			if(strands[index] == '+'){
				show_converted(response_data['resources'][strands[index]]['values'], columns, cardid[0], false, convid[0] );
				//if ('resources1' in response_data){
				if (response_data["resources1"]!=null){
					show_converted(response_data['resources1'][strands[index]]['values'], columns, cardid[2], false, convid[2] );
				}
			}
			else{
				show_converted(response_data['resources'][strands[index]]['values'], columns, cardid[1], false, convid[1] );
				if (response_data["resources1"] != null){
					show_converted(response_data['resources1'][strands[index]]['values'], columns, cardid[3], false, convid[3] );
				}
			}
		}
	}
	else{
		show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
	}
}

function spliceai_aso_run(response_data, cardid, convid){
	if(response_data['msg'] != "None"){
		if(response_data['msg'].includes('service')){
			console.log(response_data['msg']);
		}
		else{
			alert(response_data['msg']);
		}
	}
	clearChart(cardid);
	var service_columns = Object.keys(response_data['resources'][0]);
	console.log(service_columns);
	if(service_columns.includes('status') == true){
		show_converted1(response_data['resources'], service_columns , service_columns, id=cardid, index=false, tableid=convid);
		return 0;
	}
	//var columns = [ "acceptor_site", "donor_site", "ucsc_link", "ucsc_merged_link", "wig_link", "wig_hx_link","task_status", "submission_time", "complete_time", "download_files", "tiling_len", "rank_limit", "strategy", "task_id"];
	var headers = ["Submission time", "Completion time" , "Task ID",  "Task status",
					"Splicing Position Analysis[Given Input]", "Mutation Sites",
					"Tile length", "Rank limit", "Model Distance", "Interval",
					"UCSC link",  "Result files", "User Name", "Action"];
	var columns = ["submission_time", "complete_time", "task_id", "task_status",
					"pos_analysis", "mut_sites",
					"tiling_len" , "rank_limit", "distance", "interval",
					"ucsc_merged_link", "download_files", "email", "delete_btn"];
	show_converted1(response_data['resources'], headers, columns, id=cardid, index=false, tableid=convid);
}

function prime5_loc_run(response_data, cardid, convid){
	console.log(response_data);
	clearChart(cardid);
	if ('msg' in response_data['resources'][0]){
		var columns = ["Variant", "msg"];
	}
	else{
		var columns = ["ref_MRL", "alt_MRL", "delta_MRL"];
	}
	show_converted(response_data['resources'], columns, id=cardid, index=false, tableid=convid);
}

function asoamenable_run(response_data, cardid, convid){
	console.log(response_data);
	var cardid = cardid.split(',');
	var convid = convid.split(',');
    var columns = ["result","status", "result", "status"];
	var strands = Object.keys(response_data['resources']);
	console.log(strands);
	var new_cardid = [];
	var new_convid = [];
	if(strands.includes('+') ==true){
		new_cardid.push(cardid[0]);
		new_cardid.push(cardid[1]);
		new_convid.push(convid[0]);
		new_convid.push(convid[1]);
	}
	if(strands.includes('-')==true){
		new_cardid.push(cardid[2]);
		new_cardid.push(cardid[3]);
		new_convid.push(convid[2]);
		new_convid.push(convid[3]);
	}

	console.log(new_cardid);
	console.log(new_convid);

	for(var card_index=0; card_index < new_cardid.length ; card_index++){
		clearChart(new_cardid[card_index].replace('#',''));
		if(new_cardid[card_index].includes('plus') == true ){
			var new_columns = Object.keys(response_data['resources']['+']['result'][columns[card_index]][0]);
			color2paper(response_data['resources']['+']['colors']);
			show_converted(response_data['resources']['+']['result'][columns[card_index]], new_columns, id=new_cardid[card_index], index=false, tableid=new_convid[card_index]);
		}
		else if(new_cardid[card_index].includes('minus') == true){
			var new_columns = Object.keys(response_data['resources']['-']['result'][columns[card_index]][0]);
			color2paper(response_data['resources']['-']['colors']);
			show_converted(response_data['resources']['-']['result'][columns[card_index]], new_columns, id=new_cardid[card_index], index=false, tableid=new_convid[card_index]);
		}
	}
	//clearChart(cardid);
	//var columns = ["name", "category", "details"];
	//show_converted(response_data['resources']['status'], columns, id=cardid, index=false, tableid=convid);
}

function color2paper(colors){
	$("li[id*='paper-condition']").css('color', 'black');
	//document.getElementById('paper-group').style.color = 'black';
	for(var i=0; i<colors.length; i++){
		var colorid ='paper-condition-' + colors[i];
		console.log(colorid);
		document.getElementById(colorid).style.color = 'red';
	}
}

function prime5_run(response_data){
	clearChart();
	var num = 0;
	//insert chart body
	for(var series in response_data["serieses"]){
		num = num+1;
		var chart_body = document.getElementById('chart_body');
		chart_body.innerHTML += "<div class='card-body' id='chart_" + num + "'></div>"
	}
	var num = 0;
	//inset response data
	for(var series in response_data["serieses"]){
		num = num+1;
		var chartid = "#chart_" + num;
		console.log(chartid);
		plot_heatmap(response_data["serieses"][num-1], response_data["colors"][num-1], chartid);
	}
	$('#seqlen').val(response_data["seq_len"]);
	$('#mrl').val(response_data["mrl"]);
}

function plot_heatmap(series, color, chartid){
    var options = {
        series: series,
        chart: {
            height: 250,
            type: 'heatmap',
        },
		plotOptions:{
			heatmap: {
				shadeIntensity: 1,
				colorScale:{
					ranges : [
						{
							from: -1,
							to: -0.25,
							name: "low",
							color: "#33FFFF"
						},
						{
							from: -0.25,
							to: 0.25,
							name: "medium",
							color: "#FFFFFF"
						},
						{
							from: 0.25,
							to: 1,
							name: "high",
							color: "#FF0000"
						}
					]
				}
			}
		},
        dataLabels: {
        enabled: false
        },
        title: {
            text: 'In-Silico Saturation Mutagenesis'
        },
        grid: {
            padding: {
                right: 20
            }
        }
    };
	var chart = new ApexCharts(document.querySelector(chartid), options);
    chart.render();
	chart.updateSeries(series);
}

// 순서를 정해서 update (column parameter에 순서를 정해야 함)
function table_headers(column, index, tableid){
	if(index == true){
		var ret = '<thead class="thead-dark"><tr><th>index</th>'
	}
	else{
		var ret = '<thead class="thead-dark"><tr>'
	}
	if (tableid.includes('spliceai')) {
		for(var i=0; i<column.length; i++){
			//if (i % 6 < 3) {
			if (i % 3 == 0) {
				ret += '<th style="background-color: #eee;">'+ column[i] +'</th>'
			}else{
				ret += '<th>'+ column[i] +'</th>'
			}
		}
	}
	else{
		for(var i=0; i<column.length; i++){
			ret += '<th>'+ column[i] +'</th>'
		}
	}
	ret += '</tr></thead>'
	return ret
}
// 순서를 정해서 update (column parameter에 순서를 정해야 함)
function table_columns(res, column, index, tableid){
	var ret = '<tbody>'
	for (var i = 0; i < res.length; i++){
		if(index == true){
			ret += '<tr><td></td>'
		}
		else{
			ret += '<tr>'
		}
		if (tableid.includes('spliceai')) {
			for (var j=0; j< column.length; j++){
				//if (j % 6 < 3) {
				if (j % 3 == 0) {
					ret += '<td style="background-color: #eee;">'+res[i][column[j]]+'</td>'
				}else{
					ret += '<td>'+res[i][column[j]]+'</td>'
				}
			}
		}
		else{
			for (var j=0; j< column.length; j++){
				ret += '<td>'+res[i][column[j]]+'</td>'
			}
		}
		ret += '</tr>'
	}
	ret += '</tbody>'
	return ret
}


function show_converted(resource, column, id, index, tableid) {
	console.log(tableid);
	if(tableid == undefined){
		return ;
	}
	let origin_tableid = tableid.replace('#', '');
	$(id).html('<table id="' + origin_tableid + '" class="dispaly" style="width: 100%; font-size:12pt; overflow: auto;">\
													'+ table_headers(column, index, tableid)+ table_columns(resource, column, index, tableid) +'\
											</table>');
	$(id).ready(function(){
			var table = $(tableid).DataTable({
					"paging": false,
					"dom": 'Bfrtip',
					"buttons": [{extend:'copy', text: 'Copy', header: false, title: null},
											,'csv', 'excel','selectNone'],
					"select": {style: 'multi'},
					"fixedHeader": true,
					"columnDefs": [{sortable: false, "class":"index", targets:0}],
					"fixedColumns": true,
					//"scrollX": true,
					"initComplete": function (settings, json) {
						$(tableid).wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
					},
					"aaSorting" : []
			});
			if(index == true){
				table.on( 'order.dt search.dt', function () {
					table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) { cell.innerHTML = i+1;} );
				} ).draw();
			}
			else{
				table.on( 'order.dt search.dt', function () { } ).draw();
			}
	});
}


function show_converted1(resource, headers, column, id, index, tableid) {
	console.log(tableid);
	let origin_tableid = tableid.replace('#', '');
	$(id).html('<table id="' + origin_tableid + '" class="dispaly" style="width: 100%; font-size:12pt; overflow: auto;">\
													'+ table_headers(headers, index, tableid)+ table_columns(resource, column, index, tableid) +'\
											</table>');
	$(id).ready(function(){
			var table = $(tableid).DataTable({
					"paging": false,
					"dom": 'Bfrtip',
					"buttons": [{extend:'copy', text: 'Copy', header: false, title: null},
											,'csv', 'excel','selectNone'],
					"select": {style: 'multi'},
					"fixedHeader": true,
					"columnDefs": [{sortable: false, "class":"index", targets:0}],
					"fixedColumns": true,
					//"scrollX": true,
					"initComplete": function (settings, json) {
						$(tableid).wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
					},
					"aaSorting" : []
			});
			if(index == true){
				table.on( 'order.dt search.dt', function () {
					table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) { cell.innerHTML = i+1;} );
				} ).draw();
			}
			else{
				table.on( 'order.dt search.dt', function () { } ).draw();
			}
	});
}


function addDataToTable() {
	//입력 값이 모두 채워져 있는지 확인
	if (acceptorSite === "" && donorSite === "") {
		alert("Check your input site");
		return; }
	var valid_lines = validateGeneticData(document.getElementById('mutation').value);
	if (valid_lines.includes(false)) {
		return
	}
	var acceptorSite = document.getElementById("seq").value.replace(/\s+|\t/g, "").trim();
	var donorSite = document.getElementById("donor_site").value.replace(/\s+|\t/g, "").trim();
	var strategy = document.getElementById("inclusion").checked ? "Strengthening" : "Weakening";

	var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
	var newRow = tableBody.insertRow();

	var cell1 = newRow.insertCell(0);
	var cell2 = newRow.insertCell(1);
	var cell3 = newRow.insertCell(2);
	var cell4 = newRow.insertCell(3);
	cell1.innerHTML = acceptorSite;
	cell2.innerHTML = donorSite;
	cell3.innerHTML = strategy;
    cell4.innerHTML = '<button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>';
	document.getElementById("seq").value = "";
	document.getElementById("donor_site").value = "";
}

function addExampleToTable() {
	var item = $(event.target).text().split(' ');
	var acceptorSite = item[0].split('-');
	var chrom = acceptorSite[0].split(':')[0];
	var donorSite = chrom+":"+acceptorSite[1];
	var strategy = document.getElementById("inclusion").checked ? "Strengthening" : "Weakening";

	var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
	var newRow = tableBody.insertRow();

	var cell1 = newRow.insertCell(0);
	var cell2 = newRow.insertCell(1);
	var cell3 = newRow.insertCell(2);
	var cell4 = newRow.insertCell(3);
	cell1.innerHTML = acceptorSite[0];
	cell2.innerHTML = "";
	cell3.innerHTML = strategy;
    cell4.innerHTML = '<button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>';

	var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
	var newRow = tableBody.insertRow();

	var cell1 = newRow.insertCell(0);
	var cell2 = newRow.insertCell(1);
	var cell3 = newRow.insertCell(2);
	var cell4 = newRow.insertCell(3);
	cell1.innerHTML = "";
	cell2.innerHTML = donorSite;
	cell3.innerHTML = strategy;
    cell4.innerHTML = '<button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>';

	document.getElementById("seq").value = "";
	document.getElementById("donor_site").value = "";
}

function deleteRow(button) {
	// 해당 버튼이 속한 행 가져오기
	var row = button.parentNode.parentNode;
	// 행 삭제
	row.parentNode.removeChild(row);
}



// 예시: 테이블에 추가된 모든 값을 콘솔에 출력
function showAllData() {
	var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
	var allRows = tableBody.getElementsByTagName("tr");
	var allData = [];
	for (var i = 0; i < allRows.length; i++) {
		var row = allRows[i];
		var rowData = {
			acceptorSite: row.cells[0].innerHTML,
			donorSite: row.cells[1].innerHTML,
			strategy: row.cells[2].innerHTML
		};
		allData.push(rowData);
	}
	return allData;
}


function validateGeneticData(input) {
  const outputElement = document.getElementById('mutation_log');
  outputElement.innerHTML = ''; // Clear previous results
  let valid_lines = [];

  const lines = input.split('\n');
  //const pattern = /^chr\d+:\d+-\d+ [ACGT+]>[ACGT+]$/;
  const pattern = /^chr[XY\d]+:\d+-\d+ ([ACGT]+)>([ACGT+])$/;


  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') {
      outputElement.innerHTML += `Line ${index + 1} is empty and is considered invalid.<br>`;
      valid_lines.push(true);
	  return valid_lines;
    }

    if (pattern.test(trimmedLine)) {
      outputElement.innerHTML += `Line ${index + 1}: "${trimmedLine}" is valid.<br>`;
      valid_lines.push(true);
    } else {
      outputElement.innerHTML += `Line ${index + 1}: "${trimmedLine}" is not valid.<br>`;
      valid_lines.push(false);
    }
  });
  return valid_lines;
}

function sendSeq() {
	clear_inputs();
	var seq = $("#seq").val();
	if (seq == '') {
		alert("Enter sequence first!! 😜");
		return null
	}

	var hg19_checked= $("#hg19").is(":checked");
	if(hg19_checked == true){
		seq_status = get_converted_liftover(seq, hg19_checked);
		seq = seq_status[0];
		check_ref = seq_status[1];
		if(seq == 'Position Error'){
			//alert("Position Error) "+ "input_ref: " + seq.split(' ')[1].split('>')[0]+ " original_ref: "+ check_ref);
			alert("Reference sequence is " + check_ref + ", please check your input ref sequence of the position.");
			return seq;
		}
	}
	else{
		seq_status = get_converted_liftover(seq, hg19_checked);
		if(seq_status[0] == 'Position Error'){
			alert("Reference sequence is " + seq_status[1] + ", please check your input ref sequence of the position.");
			//alert('Please check your input format.');
			return seq_status;
		}
		else{
			seq = seq_status[0];
		}
	}
	
	document.getElementById("seq_text1").innerHTML = "+ strand is not operated because no gene is annotated in the locus";
	document.getElementById("seq_text_splice").innerHTML = "- strand is not operated because no gene is annotated in the locus";
	document.getElementById("seq_text_maxentscan").innerHTML = "+ strand is not operated because no gene is annotated in the locus";
	document.getElementById("seq_text_maxentscan_minu").innerHTML = "- strand is not operated because no gene is annotated in the locus";
	
	get_converted_variants(seq);
	const strands = get_converted(seq);
	get_converted_gnomad(seq);
	get_converted_topmed(seq);
	if(strands.length>1){
		if(strands.includes('+') == true){
			get_converted_spliceai(seq, '+', '.wrap-loading-spliceai_plus');
			get_converted_maxentscan(seq, '+');
		}
		if(strands.includes('-') == true){
			get_converted_spliceai(seq, '-', '.wrap-loading-spliceai_minu');
			get_converted_maxentscan(seq, '-');
		}
	}
	else{
		if(strands[0] == '+'){
			get_converted_spliceai(seq, strands[0], '.wrap-loading-spliceai-plus');
		}
		else{
			get_converted_spliceai(seq, strands[0], '.wrap-loading-spliceai-minu');
		}
		get_converted_maxentscan(seq, strands[0]);
	}
	get_converted_litvar(seq);
	get_converted_aso_amenability(seq);
	get_converted_hexamer(seq);
	get_converted_hexamer_image(seq);
	get_converted_labranchor(seq);
	get_converted_prime5(seq);
}

function get_converted_id2variant(seq) {
	$("#seq_text").empty();
	var variant; 
	$.ajax({
		type: "post",
		url: "http://" + server_ip + ":" + "4041" + "/api/id2variant",
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({"seq":seq}),
		async: false,
		timeout: 200000,
		success: function (received_data) {
			variant = received_data["res"]["variant"]
		},
		error: function(xhr, status, error) {
			alert("fail\n" + '\n' +status +'\n' + error);
		},
		beforeSend: function () {
			//loading(true);
			$('.wrap-loading-variant').removeClass('display-none');
		},
		complete: function () {
			//loading(false);
			$('.wrap-loading-variant').addClass('display-none');
		}
	});
	return variant;
}

function get_converted_liftover(seq, checked) {
	$("#seq_text").empty();
	var seq_status;
	var ref_check;
	$.ajax({
		type: "post",
		url: "http://" + server_ip + ":" + "4041" + "/api/liftover",
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({"seq":seq, "checked" : checked}),
		async: false,
		timeout: 200000,
		success: function (received_data) {
			seq_status = received_data["variant"];
			ref_check = received_data["check_ref"];
			document.getElementById("hg19_variant").value = seq_status;
		},
		error: function(xhr, status, error) {
			alert("fail\n" + '\n' +status +'\n' + error);
		},
		beforeSend: function () {
			//loading(true);
			$('.wrap-loading-variant').removeClass('display-none');
		},
		complete: function () {
			//loading(false);
			$('.wrap-loading-variant').addClass('display-none');
		}
	});
	return [seq_status, ref_check];
}

function get_converted(seq) {
	const strand_array = [];
$("#seq_text").empty();
$.ajax({
type: "post",
url: "http://" + server_ip + ":" + "4041" + "/variant",
contentType: 'application/json; charset=utf-8',
dataType: 'json',
data: JSON.stringify({"seq":seq}),
async: false,
timeout: 200000,
success: function (received_data) {
	//alert(received_data["res"]);
	show_converted_ensembl(received_data["res"]);
	show_converted_refseq(received_data["res1"]);

	// merge the resource data
	const res = received_data["res"];
	const res1 = received_data["res1"];
	res.push(...res1);
	
	// filtering the resource data
	const new_res = {};
	const new_array = [];
	let count = 0;
	for (var i = 0; i < res.length; i++){
		strand_array.push(res[i]['STRAND']);
		if (res[i]['existing_InFrame_oORFs'] == "-"){count+=1;}
		if (res[i]['existing_OutOfFrame_oORFs'] == "-"){ count+=1; }
		if (res[i]['existing_uORFs'] == "-"){count+=1;}
		if (res[i]['five_prime_UTR_variant_annotation'] == "-"){count+=1;}
		if (res[i]['five_prime_UTR_variant_consequence'] == "-"){count+=1;}
		if (count == 5){
			count=0;
			continue;		
		}
		else{
			new_array.push(res[i]);
		}
		count = 0;
	}
	show_converted_utr5_annotator(new_array);
},
error: function(xhr, status, error) {
	alert("fail\n" + '\n' +status +'\n' + error);
},
beforeSend: function () {
	//loading(true);
	$('.wrap-loading-data').removeClass('display-none');
},
complete: function () {
	//loading(false);
	$('.wrap-loading-data').addClass('display-none');
}
});
	const strand_set = new Set(strand_array);
	const strand_new = [...strand_set];
	return strand_new;
}

function get_converted_spliceai(seq, strand, loadingid) {
$("#seq_text1").empty();
var verbose = $("#verbose").is(":checked");
var distance = $("#distance").val();
var view = $("#view").val();
$.ajax({
type: "post",
url: "http://" + server_ip + ":" + "4041" + "/api/spliceai",
contentType: 'application/json; charset=utf-8',
dataType: 'json',
data: JSON.stringify({"seq":seq, "verbose":verbose, "distance": distance, "view" : view, "strand" : strand }),
timeout: 100000,
success: function (received_data) {
	if(strand == '+'){
		show_converted_spliceai(received_data["res"], "convtable-spliceai-plus" , "#seq_text1");
	}
	else{
		show_converted_spliceai(received_data["res"], "convtable-spliceai-minu" , "#seq_text_splice");
	}
},
error: function(xhr, status, error) {
	alert("fail\n" + '\n' +status +'\n' + error);
},
beforeSend: function () {
	//loading(true);
	$(loadingid).removeClass('display-none');
},
complete: function () {
	//loading(false);
	$(loadingid).addClass('display-none');
}
});
}

function pick_header_spliceai(){
let ret = '<thead class="thead-dark"><tr>'
ret += '<th style="background-color: #eee;">delta score<br>(Acceptor Loss)</th>'
ret += '<th style="background-color: #eee;">pre-mRNA position<br>(Acceptor Loss)</th>'
ret += '<th style="background-color: #eee;">MES score<br>(Acceptor Loss)</th>'	
ret += '<th style="background-color: #eee;">CSS transcript ID<br>(Acceptor Loss)</th>'	

ret += '<th>delta score<br>(Donor Loss)</th>'
ret += '<th>pre-mRNA position<br>(Donor Loss)</th>'
ret += '<th>MES score<br>(Donor Loss)</th>'	
ret += '<th>CSS transcript ID<br>(Donor Loss)</th>'	

ret += '<th style="background-color: #eee;">delta score<br>(Acceptor Gain)</th>'
ret += '<th style="background-color: #eee;">pre-mRNA position<br>(Acceptor Gain)</th>'	
ret += '<th style="background-color: #eee;">MES score<br>(Acceptor Gain)</th>'	
ret += '<th style="background-color: #eee;">CSS transcript ID<br>(Acceptor Gain)</th>'	

ret += '<th>delta score<br>(Donor Gain)</th>'
ret += '<th>pre-mRNA position<br>(Donor Gain)</th>'	
ret += '<th>MES score<br>(Donor Gain)</th>'	
ret += '<th>CSS transcript ID<br>(Donor Gain)</th>'	
ret += '</tr></thead>'
return ret
}

function pick_cols_spliceai(res){
let ret = '<tbody>'

	for (var i = 0; i < res.length; i++){
		ret += '<tr>'
		ret += '<td style="background-color: #eee;">'+res[i]['delta score (Acceptor Loss)']+'</td>'
		ret += '<td style="background-color: #eee;">'+res[i]['pre-mRNA position (Acceptor Loss)']+'</td>'
		let al_mes = res[i]['AL_mes'].split('\n');	
		ret += '<td style="background-color: #eee;">'+al_mes[0]+'<br>'+ al_mes[1] +'</td>'
		ret += '<td style="background-color: #eee;">'+res[i]['transcriptID (Acceptor Loss)']+'</td>'

		ret += '<td>'+res[i]['delta score (Donor Loss)']+'</td>'
		ret += '<td>'+res[i]['pre-mRNA position (Donor Loss)']+'</td>'
		let dl_mes = res[i]['DL_mes'].split('\n');	
		ret += '<td>'+dl_mes[0]+'<br>'+ dl_mes[1] +'</td>'
		ret += '<td>'+res[i]['transcriptID (Donor Loss)']+'</td>'

		ret += '<td style="background-color: #eee;">'+res[i]['delta score (Acceptor Gain)']+'</td>'        
		ret += '<td style="background-color: #eee;">'+res[i]['pre-mRNA position (Acceptor Gain)']+'</td>'
		let ag_mes = res[i]['AG_mes'].split('\n');	
		ret += '<td style="background-color: #eee;">'+ag_mes[0]+'<br>'+ ag_mes[1] +'</td>'
		ret += '<td style="background-color: #eee;">'+res[i]['transcriptID (Acceptor Gain)']+'</td>'

		ret += '<td>'+res[i]['delta score (Donor Gain)']+'</td>'        
		ret += '<td>'+res[i]['pre-mRNA position (Donor Gain)']+'</td>'
		let dg_mes = res[i]['DG_mes'].split('\n');	
		ret += '<td>'+dg_mes[0]+'<br>'+ dg_mes[1] +'</td>'
		ret += '<td>'+res[i]['transcriptID (Donor Gain)']+'</td>'

		ret += '</tr>'
	}
	ret += '</tbody>'
	return ret
}


function show_converted_spliceai(res, tableid, showid) {
$(showid).html('<table id="'+tableid+ '" class="dispaly" style="width:100%; font-size:12pt">\
					'+ pick_header_spliceai()+ pick_cols_spliceai(res) +'\
				</table>');
$(showid).ready(function(){
var table = $("#"+tableid).DataTable({
	"paging": false,
	"dom": 'Bfrtip',
	"buttons": [{extend:'copy', text: 'Copy', header: false, title: null},
				,'csv', 'excel','selectNone'],
	"select": {style: 'multi'},
	"fixedHeader": false,
	"columnDefs": [{sortable: false, "class":"index", targets:0}],
	"fixedColumns": true,
	"scrollX": true
});
table.on( 'order.dt search.dt', function () {
} ).draw();
});
}

function get_converted_maxentscan(seq, strand) {
	$("#seq_text_maxentscan").empty();
	var verbose = $("#verbose").is(":checked");
	var distance = $("#distance").val();
	var view = $("#view").val();
	$.ajax({
		type: "post",
		url: "http://" + server_ip + ":" + "4041" + "/api/maxentscan",
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({"seq":seq, "verbose":verbose, "distance": distance, "view" : view, "strand": strand}),
		timeout: 100000,
		success: function (received_data) {
			if(strand == '+'){
				show_converted_maxentscan(received_data["res"], "convtable-maxentscan-plus", '#seq_text_maxentscan');
			}
			else{
				show_converted_maxentscan(received_data["res"], "convtable-maxentscan-minu", '#seq_text_maxentscan_minu');
			}
		},
		error: function(xhr, status, error) {
			alert("fail\n" + '\n' +status +'\n' + error);
		},
		beforeSend: function () {
			//loading(true);
			$('.wrap-loading-maxentscan').removeClass('display-none');
		},
		complete: function () {
			//loading(false);
			$('.wrap-loading-maxentscan').addClass('display-none');
		}
	});
}

function pick_header_maxentscan(){
	let ret = '<thead class="thead-dark"><tr>'
	ret += '<th>Maxentscan</th>'
	ret += '<th>Scores</th>'
	ret += '</tr></thead>'
	return ret
}

function pick_cols_maxentscan(res){
	let ret = '<tbody>'
	
	ret += '<tr>'
	ret += '<td>'+'5_ref'+'</td>'
	ret += '<td>'+res["5_ref"]+'</td>'
	ret += '</tr>'
	
	ret += '<tr>'
	ret += '<td>'+'5_alt'+'</td>'
	ret += '<td>'+res["5_alt"]+'</td>'
	ret += '</tr>'

	ret += '<tr>'
	ret += '<td>'+'5_delta'+'</td>'
	ret += '<td>'+res["5_delta"]+'</td>'
	ret += '</tr>'

	ret += '<tr>'
	ret += '<td>'+'3_ref'+'</td>'
	ret += '<td>'+res["3_ref"]+'</td>'
	ret += '</tr>'

	ret += '<tr>'
	ret += '<td>'+'3_alt'+'</td>'
	ret += '<td>'+res["3_alt"]+'</td>'
	ret += '</tr>'

	ret += '<tr>'
	ret += '<td>'+'3_delta'+'</td>'
	ret += '<td>'+res["3_delta"]+'</td>'
	ret += '</tr>'

	ret += '</tbody>'
	return ret
}

function show_converted_maxentscan(res, tableid, showid) {
	$(showid).html('<table id="' + tableid + '" class="dispaly" style="width:100%; font-size:12pt">\
							'+ pick_header_maxentscan()+ pick_cols_maxentscan(res) +'\
						</table>');
	$(showid).ready(function(){
		var table = $("#"+tableid).DataTable({
			"paging": false,
			"dom": 'Bfrtip',
			"buttons": [{extend:'copy', text: 'Copy', header: false, title: null},
						,'csv', 'excel','selectNone'],
			"select": {style: 'multi'},
			"fixedHeader": false,
			"columnDefs": [{sortable: false, "class":"index", targets:0}],
			"fixedColumns": true,
			"scrollX": true
		});
		table.on( 'order.dt search.dt', function () {
		} ).draw();
	});
}


function get_converted_hexamer_image(seq) {
	$("#seq_text_hexamer").empty();
	var verbose = $("#verbose").is(":checked");
	var distance = $("#distance").val();
	var view = $("#view").val();
	$.ajax({
		type: "post",
		url: "http://" + server_ip + ":" + "4041" + "/hexamer_image",
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({"seq":seq, "verbose":verbose, "distance": distance, "view" : view}),
		timeout: 100000,
		success: function (received_data) {
			show_track_hexamer_data(received_data["res"]);
		},
		error: function(xhr, status, error) {
			alert("fail\n" + '\n' +status +'\n' + error);
		},
		beforeSend: function () {
			//loading(true);
			$('.wrap-loading-hexamer').removeClass('display-none');
		},
		complete: function () {
			//loading(false);
			$('.wrap-loading-hexamer').addClass('display-none');
		}
	});
}

function show_track_hexamer_data(track_data) {
	$("#seq_text_hexamer_image_ref").attr('src', 'data:image/png;base64,' + track_data['base64_ref']);
	$("#seq_text_hexamer_image_ref").attr('style', 'width: 100%; display: none;');
	$("#seq_text_hexamer_image_alt").attr('src', 'data:image/png;base64,' + track_data['base64_alt']);
	$("#seq_text_hexamer_image_alt").attr('style', 'width: 100%; display: none;');
}

function get_converted_aso_amenability(seq) {
	var verbose = $("#verbose").is(":checked");
	var distance = $("#distance").val();
	var view = $("#view").val();
	var clf_checked= $("#clf-no").is(":checked");
	var ssg_checked= $("#ssg-no").is(":checked");
		$.ajax({
		type: "post",
		url: "http://" + server_ip + ":" + "4041" + "/api/aso_amenability",
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({"seq":seq, "verbose":verbose, "distance": distance, "view" : view,  "clf" : clf_checked, "ssg" : ssg_checked}),
		timeout: 100000,
		success: function (received_data) {
			show_converted_aso_amenability(received_data["res"]);
			show_converted_aso_amenability1(received_data["res"]);
		},
		error: function(xhr, status, error) {
			alert("fail\n" + '\n' +status +'\n' + error);
		},
		beforeSend: function () {
			//loading(true);
			$('.wrap-loading-aso').removeClass('display-none');
		},
		complete: function () {
			//loading(false);
			$('.wrap-loading-aso').addClass('display-none');
		}
	});
}

function pick_header_aso_amenability(res){
	let ret = '<thead class="thead-dark"><tr>'
	ret += '<th></th>'
	ret += '<th>Category</th>'
	ret += '<th>Details</th>'
	ret += '</tr></thead>'
	return ret
}

function pick_cols_aso_amenability(res){

	let ret = '<tbody>'
	for (var i = 0; i < res['status'].length; i++){
		ret += '<tr>'
		ret += '<td>'+ res['status'][i]['name'] +'</td>'
		ret += '<td>'+res["status"][i]['category']+'</td>'
		if((res["status"][i]['details'][0]).includes("SIFT")){
			ret += '<td>'+res["status"][i]['details'][0] + ', ' + res["status"][i]['details'][1] +'</td>'
		}
		else{
			if((res["status"][i]['name']).includes("canonical")){
				ret += '<td>'+res["status"][i]['details'][0] + ', ' + res["status"][i]['details'][1] +'</td>'
			}
			else{
				if((res["status"][i]['details']).length == 2){
					ret += '<td>'+res["status"][i]['details'][0] + ', ' + res["status"][i]['details'][1] +'</td>'
				}
				else{
					ret += '<td>'+res["status"][i]['details']+'</td>'
				}
			}
		}
		ret += '</tr>'
	}
	ret += '</tbody>'
	return ret

}

function show_converted_aso_amenability(res) {
	$('#seq_text_aso').html('<table id="convtable-aso" class="dispaly" style="width:100%; font-size:12pt">\
							'+ pick_header_aso_amenability(res)+ pick_cols_aso_amenability(res) +'\
						</table>');
	$("#seq_text_aso").ready(function(){
		var table = $("#convtable-aso").DataTable({
			"paging": false,
			"dom": 'Bfrtip',
			"buttons": [],
			"select": {style: 'multi'},
			"fixedHeader": false,
			"columnDefs": [{sortable: false, "class":"index", targets:0}],
			"fixedColumns": true,
			"scrollX": true
		});
		table.on( 'order.dt search.dt', function () {}).draw();
	});
}

function pick_header_aso_amenability1(res){
	let ret = '<thead class="thead-dark"><tr>'
	ret += '<th>Variant</th>'
	ret += '<th>ASO Amenability</th>'
	ret += '</tr></thead>'
	return ret
}

function pick_cols_aso_amenability1(res){

	let ret = '<tbody>'
	ret += '<tr>'
	ret += '<td>'+ res['variant'] +'</td>'
	ret += '<td>'+res["result"]+'</td>'
	ret += '</tr>'
	ret += '</tbody>'
	return ret

}

function show_converted_aso_amenability1(res) {
	$('#seq_text_aso1').html('<table id="convtable-aso1" class="dispaly" style="width:100%; font-size:12pt">\
							'+ pick_header_aso_amenability1(res)+ pick_cols_aso_amenability1(res) +'\
						</table>');
	$("#seq_text_aso1").ready(function(){
		var table = $("#convtable-aso1").DataTable({
			"paging": false,
			"dom": 'Bfrtip',
			"buttons" : [],
			"select": {style: 'multi'},
			"fixedHeader": false,
			"columnDefs": [{sortable: false, "class":"index", targets:0}],
			"fixedColumns": true,
			"scrollX": true
		});
		table.on( 'order.dt search.dt', function () {}).draw();
	});
}

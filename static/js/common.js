$("#seq").focus();
function insert_Into_input() {
	$("#seq").val($(event.target).text());
}

function insert_Into_spliceai_aso() {
	var item = $(event.target).text().split(' ');
	var acceptor_site = item[0].split('-');
	var chrom = acceptor_site[0].split(':')[0];
	var donor_site = chrom+":"+acceptor_site[1];
    if ($('#acceptor-group').css('display') !== 'none' && $('#acceptor-group').css('display') !== 'none') {
		$("#seq").val(acceptor_site[0]);
		$("#donor_site").val(donor_site);
	}else{
		// #seq가 보이는 상태라면 값을 설정
		if ($('#acceptor-group').css('display') !== 'none') {
			$("#seq").val(acceptor_site[0]);
			//$("#donor_site").val(acceptor_site[0]);
			$("#donor_site").val("");
		}

		// #donor_site가 보이는 상태라면 값을 설정
		if ($('#donor-group').css('display') !== 'none') {
			$("#seq").val("");
			$("#donor_site").val(donor_site);
		}
	}
}

function insert_Into_search() {
	/*$("#search").val($(event.target).text());
    $("#serach").focus();*/
    var input = document.getElementById('search');
    input.value = $(event.target).text();

    // 2. 입력 필드에 포커스 설정
    input.focus();

    // 3. 커서를 입력 필드의 끝으로 이동 (옵션)
    input.setSelectionRange(input.value.length, input.value.length);
}

function insert_Into_dropdown() {
	$("#dropdown_content").val($(event.target).text());
}

function cleanInput() {
	$("#seq").val('');
}

function formCheck(){
	var search = $("#search").val();
	if (search === '') {
		alert("Enter sequence first!! 😜");
		return false;
	}
	else{
		$('.loader').removeClass('display-none');
	}
}

function seqCheck(){
	var seq = $("#seq").val();
	if (seq == '') {
		alert("Enter sequence first!! 😜");
		return null;
	}
	else{
		$('.loader').removeClass('display-none');
	}
}

function apiToggle(){
	if ($("#btn-special-all").is(':checked')) {
		$("input:checkbox[id='btn-special-all']").prop("checked", true);
		$("input:checkbox[id*='btn-api-']").prop("checked", true);
	}
	if($("input:checkbox[id*='btn-api-']").is(':checked')){
		$("input:checkbox[id='btn-special-all']").prop("checked", false);
	}

	/*else {
		console.log('1');
		$("input:checkbox[id='btn-all']").prop("checked", false);
		//$("input:checkbox[id*='btn-api-']").prop("checked", );
	}*/
}

function openWindow() {
	var new_win = window.open("guide", "Guide", "width=500,height=600");
}

function openCloseDiv(chartid, toggleid){
	if(document.getElementById(chartid).style.display === 'block'){
		//console.log("h");
		document.getElementById(chartid).style.display = 'none';
		document.getElementById(toggleid).textContent = '+';
	}
	else{
		//console.log("i");
		document.getElementById(chartid).style.display = 'block';
		document.getElementById(toggleid).textContent = '-';
	}
}

// checkboxToggle.js
/*
function setupCheckboxToggle(hg19CheckboxId, hg38CheckboxId) {
  const hg19Checkbox = document.getElementById(hg19CheckboxId);
  const hg38Checkbox = document.getElementById(hg38CheckboxId);

  hg19Checkbox.addEventListener('change', function() {
    if (this.checked) {
      hg38Checkbox.checked = false;
    }
  });

  hg38Checkbox.addEventListener('change', function() {
    if (this.checked) {
      hg19Checkbox.checked = false;
    }
  });
}*/



// 페이지 로딩이 완료되면 함수 실행
window.onload = function() {
	if(document.getElementById('refreshButton')!= null){
    	var img = document.getElementById('refreshButton').querySelector('img');
    	img.classList.add('spinning'); // 이미지에 spinning 클래스 추가하여 애니메이션 시작
    	setInterval(refreshContent, 10000); // 10초마다 refreshContent 함수를 호출
	}
};

function refreshContent(cardid="#chart_body", convid="#convtable") {
    // 여기에 새로고침 로직을 구현하세요.
	var route = '/spliceai/asodesign';
	var data = {"service": {"refresh": true} };
	//var response_data = request_data(data=data, http_method="post", asysnc_bool=false, route=route, time=100000000);
	request_data2(data=data, http_method="post", async_bool=true, route=route, time=100000000, function(error, response_data) {
    	if (error) {
        	console.error('Error:', error);
    	} else {
        // 응답 데이터 처리
        //console.log(response_data);
		spliceai_aso_run(response_data, cardid, convid);
		console.log('Content refreshed');
		}
	});

	//spliceai_aso_run(response_data, cardid, convid);
    //console.log('Content refreshed');
    // 예를 들어, AJAX 요청을 통해 데이터를 가져오거나 페이지를 업데이트할 수 있습니다.
}


// 삭제 버튼 클릭 이벤트 핸들러
function deleteRowJoblist(button, cardid="#chart_body", convid="#convtable") {
	var table = $(convid).DataTable();

	var row = $(button).closest('tr'); // 버튼이 속한 행을 찾기
	var rowIndex = table.row(row).index(); // 행의 인덱스 찾기
	console.log(rowIndex);
	var route = '/spliceai/asodesign';
	var data = {"service": {"delete": rowIndex} };
	var response_data = request_data(data=data, http_method="post", asysnc_bool=false, route=route, time=100000000);
	spliceai_aso_run(response_data, cardid, convid);
    console.log('Content'+ ' ' + rowIndex + ' delete.');

	//table.row(row).remove().draw();
}

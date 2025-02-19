let dataTable; // DataTable 인스턴스 저장
let lastSelectedYear = null; // 마지막 선택된 연도 저장
let yearChart; // Chart.js 인스턴스 저장

$(document).ready(function() {
    setupUI();  // UI 자동 생성
    loadData(); // 데이터 로드
});
/**
 * 기본 UI 요소를 자동 생성 (테이블 내부 크기 조정)
 */
function setupUI() {
    let app = document.getElementById("app");

    app.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

        <div class="container mt-4">
            <!-- 하나의 카드 안에 그래프 & 테이블 배치 -->
            <div class="card shadow">
                <div class="card-header text-center">
                    <h4>Research Summary</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <!-- 그래프 영역 -->
                        <div class="col-md-6 d-flex flex-column align-items-center" style="height: 400px;">
                            <h5>Publication Count by Year</h5>
                            <canvas id="yearChart" class="w-100 h-100"></canvas>
                        </div>

                        <!-- 테이블 영역 (작은 폰트, 내부 스크롤 가능) -->
                        <div class="col-md-6">
                            <h5 class="text-center">Research Articles</h5>
                            <div class="table-responsive" style="height: 400px; overflow-y: auto; overflow-x: hidden;">
                                <table id="dataTable" class="table table-striped table-bordered"
                                    style="table-layout: fixed; width: 100%; font-size: 12px;">
                                    <thead id="tableHeader">
                                        <tr>
                                            <th style="width: 8%; padding: 5px;">PMID</th>
                                            <th style="width: 8%; padding: 5px;">PMCID</th>
                                            <th style="width: 25%; padding: 5px;">Title</th>
                                            <th style="width: 20%; padding: 5px;">Journal</th>
                                            <th style="width: 25%; padding: 5px;">Authors</th>
                                            <th style="width: 8%; padding: 5px;">Year</th>
                                        </tr>
                                    </thead>
                                    <tbody style="line-height: 1.2;"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * JSON 데이터를 불러와 DataTables 및 Chart.js 초기화
 */
function loadData() {
    $.getJSON("./test.json", function(data) {
        if (data.length === 0) {
            showNoDataMessage();
            return;
        }

        let yearCounts = countYears(data);
        createChart(yearCounts);
        createTable(data);
    }).fail(function() {
        alert("Failed to load data.");
    });
}

/**
 * 데이터가 없을 때 테이블에 메시지를 표시하고 차트를 숨김
 */
function showNoDataMessage() {
    // 차트 숨기기
    document.getElementById("chartContainer").style.display = "none";

    // 테이블 헤더를 "Message"로 변경
    document.getElementById("tableHeader").innerHTML = `
        <tr>
            <th>Message</th>
        </tr>
    `;

    // 테이블에 "No publications available." 메시지 추가
    $('#dataTable tbody').html(`
        <tr>
            <td style="text-align:center; font-weight: bold; color: red;">
                No publications available.
            </td>
        </tr>
    `);
}

/**
 * 연도별 개수 계산
 * @param {Array} data - JSON 데이터 배열
 * @returns {Object} - 연도별 개수 객체
 */
function countYears(data) {
    let yearCounts = {};
    data.forEach(item => {
        let year = item.year;
        if (year) {
            yearCounts[year] = (yearCounts[year] || 0) + 1;
        }
    });
    return yearCounts;
}

/**
 * Chart.js를 생성하고 클릭 이벤트 추가 (카드 내에서 조정)
 * @param {Object} yearCounts - 연도별 개수 객체
 */
function createChart(yearCounts) {
    let sortedYears = Object.keys(yearCounts).sort((a, b) => a - b);
    let counts = sortedYears.map(year => yearCounts[year]);

    let ctx = document.getElementById("yearChart").getContext("2d");
    yearChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: sortedYears,
            datasets: [{
                label: "Publication Count",
                data: counts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            //maintainAspectRatio: false, // 👈 카드 내에서 높이 자동 조정
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        precision: 0
                    }
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    let index = elements[0].index;
                    let selectedYear = sortedYears[index];
                    highlightRows(selectedYear);
                }
            }
        }
    });
}

/**
 * DataTables를 생성 및 초기화 (폰트 크기 & 레이아웃 조정)
 * @param {Array} data - JSON 데이터 배열
 */
function createTable(data) {
    let tableData = data.map(item => [
        item.pmid || "N/A",
        item.pmcid || "N/A",
        item.title || "No Title",
        item.journal || "No Journal",
        item.authors ? item.authors.join(", ") : "No Authors",
        item.year || "N/A"
    ]);

    dataTable = $('#dataTable').DataTable({
        data: tableData,
        columns: [
            { title: "PMID" },
            { title: "PMCID" },
            { title: "Title" },
            { title: "Journal" },
            { title: "Authors" },
            { title: "Year" }
        ],
        scrollY: "300px", // 👈 내부 스크롤 높이 설정 (수직 스크롤 가능)
        scrollCollapse: true,
        paging: false, // 👈 페이지네이션 제거하여 모든 데이터 표시
        scrollX: false, // 👈 수평 스크롤 방지
        autoWidth: false, // 👈 컬럼 너비 고정
        createdRow: function (row) {
            $('td', row).css({
                "font-size": "12px",  // 👈 셀 내부 폰트 크기 줄임
                "padding": "4px",  // 👈 셀 내부 패딩 최소화
                "white-space": "normal",  // 👈 자동 줄바꿈 적용
                "word-break": "break-word"  // 👈 너무 긴 텍스트 줄바꿈 적용
            });
        }
    });
}
/**
 * DataTables에서 특정 연도의 행을 강조
 * @param {string} year - 강조할 연도
 */
function highlightRows(year) {
    // 기존 강조된 행 색상 초기화
    if (lastSelectedYear !== null) {
        $('#dataTable tbody tr').each(function() {
            let rowData = dataTable.row(this).data();
            if (rowData && rowData[5] == lastSelectedYear) {
                $(this).css("background-color", "");
            }
        });
    }

    // 새로운 연도의 행을 강조
    $('#dataTable tbody tr').each(function() {
        let rowData = dataTable.row(this).data();
        if (rowData && rowData[5] == year) {
            $(this).css("background-color", "#ffff99"); // 노란색 강조
        }
    });

    // 마지막 선택한 연도 업데이트
    lastSelectedYear = year;
}
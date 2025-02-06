let dataTable; // DataTable 인스턴스 저장
let lastSelectedYear = null; // 마지막 선택된 연도 저장
let yearChart; // Chart.js 인스턴스 저장

$(document).ready(function() {
    loadData();
});

/**
 * JSON 데이터를 불러와 DataTables 및 Chart.js 초기화
 */
function loadData() {
    $.getJSON("./test.json", function(data) {
        if (data.length === 0) {
            alert("No data available");
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
 * Chart.js를 생성하고 클릭 이벤트 추가
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
            //maintainAspectRatio: false,
            //aspectRatio: 2,
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
 * DataTables를 생성 및 초기화
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
        ]
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
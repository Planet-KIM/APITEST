let dataTable; // DataTable 인스턴스 저장
let lastSelectedYear = null; // 마지막 선택된 연도 저장
let yearChart; // Chart.js 인스턴스 저장

/**
 * UI의 기본 구조를 생성 (차트, 테이블 등)
 */
function setupUI(appid="app", chartid="yearChart", tableid="dataTable") {
    let app = document.getElementById(appid);
    app.innerHTML = `
        <div class="card shadow mt-4">
            <div class="card-header text-center">
                <h4>Research Summary</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <!-- 그래프 영역 -->
                    <div class="col-md-6 d-flex flex-column align-items-center" style="height: 400px;">
                        <h5>Publication Count by Year</h5>
                        <canvas id="` + chartid +`" class="w-100 h-100"></canvas>
                    </div>
                    <!-- 테이블 영역 -->
                    <div class="col-md-6">
                        <h5 class="text-center">Research Articles</h5>
                        <div class="table-responsive" style="height: 400px; overflow-y: auto; overflow-x: hidden;">
                            <table id="`+ tableid + `" class="table table-striped table-bordered"
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
    `;
}

// 아래 함수들은 기존 loadData()에서 사용한 함수들과 동일합니다.
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

function createChart(yearCounts, chartid="yearChart") {
    let sortedYears = Object.keys(yearCounts).sort((a, b) => a - b);
    let counts = sortedYears.map(year => yearCounts[year]);

    let ctx = document.getElementById(chartid).getContext("2d");
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
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, precision: 0 }
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

function createTable(data, tableid="dataTable") {
    let tableData = data.map(item => [
        item.pmid || "N/A",
        item.pmcid || "N/A",
        item.title || "No Title",
        item.journal || "No Journal",
        item.authors ? item.authors.join(", ") : "No Authors",
        item.year || "N/A"
    ]);
    
    dataTable = $('#'+ tableid).DataTable({
        data: tableData,
        columns: [
            { title: "PMID" },
            { title: "PMCID" },
            { title: "Title" },
            { title: "Journal" },
            { title: "Authors" },
            { title: "Year" }
        ],
        scrollY: "300px",
        scrollCollapse: true,
        paging: false,
        scrollX: false,
        autoWidth: false,
        createdRow: function (row) {
            $('td', row).css({
                "font-size": "12px",
                "padding": "4px",
                "white-space": "normal",
                "word-break": "break-word"
            });
        }
    });
}

function highlightRows(year, tableid="dataTable") {
    if (lastSelectedYear !== null) {
        $('#'+ tableid + ' tbody tr').each(function() {
            let rowData = dataTable.row(this).data();
            if (rowData && rowData[5] == lastSelectedYear) {
                $(this).css("background-color", "");
            }
        });
    }
    $('#' + tableid + ' tbody tr').each(function() {
        let rowData = dataTable.row(this).data();
        if (rowData && rowData[5] == year) {
            $(this).css("background-color", "#ffff99");
        }
    });
    lastSelectedYear = year;
}
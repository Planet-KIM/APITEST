document.addEventListener('DOMContentLoaded', function () {
    let collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');

    collapseButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            collapseButtons.forEach(function(innerButton) {
                if (innerButton !== button) {
                    let collapseElement = document.querySelector(innerButton.getAttribute('href') || innerButton.getAttribute('data-bs-target'));
                    if (collapseElement && collapseElement.classList.contains('show')) {
                        let collapseInstance = new bootstrap.Collapse(collapseElement, {toggle: false});
                        collapseInstance.hide();
                    }
                }
            });
        });
    });
});

/*document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.querySelector(".fixed-buttons a");
    toggleButton.addEventListener("click", function() {
        if (toggleButton.textContent === "Include Exon Range") {
            toggleButton.textContent = "Only acceptor sites or donor sites";
        } else {
            toggleButton.textContent = "Include Exon Range";
        }
    });
});*/



function showInputGroup(group) {
	if (group === 'acceptor') {
		document.getElementById('acceptor-group').style.display = 'contents';
		document.getElementById('donor-group').style.display = 'none';
	} else if (group === 'donor') {
		document.getElementById('donor-group').style.display = 'contents';
		document.getElementById('acceptor-group').style.display = 'none';
	} 
	/*else if (group === 'both') {
		document.getElementById('acceptor-group').style.display = 'contents';
		document.getElementById('donor-group').style.display = 'contents';
	}*/
}

// Execute on page load
document.addEventListener('DOMContentLoaded', function() {
	var selectedOption = document.querySelector('input[name="options-site"]:checked').id;
	showInputGroup(selectedOption);
});

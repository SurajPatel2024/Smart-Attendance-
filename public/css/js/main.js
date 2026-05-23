/* LIVE DATE */

function updateDate() {

    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("liveDate").innerHTML =
        now.toLocaleDateString("en-IN", options);
}

updateDate();

setInterval(updateDate, 1000);

/* POPUP */

const popup = document.getElementById("popup");

if (popup) {

    setTimeout(() => {

        popup.classList.remove("show");

        const url = new URL(window.location);

        url.searchParams.delete("message");
        url.searchParams.delete("type");

        window.history.replaceState({}, document.title, url);

    }, 3000);
}

/* BACK PROBLEM FIX */

window.history.pushState(null, null, window.location.href);

window.onpopstate = function () {

    window.history.pushState(null, null, window.location.href);
};

/* LOCAL STORAGE FOR CLASS FILTER */

const classSelect = document.querySelector('select[name="class"]');

if (classSelect) {

    /* OLD CLASS LOAD */

    const savedClass = localStorage.getItem("selectedClass");

    if (savedClass && classSelect.value !== savedClass) {

        classSelect.value = savedClass;

        const url = new URL(window.location);

        url.searchParams.set("class", savedClass);

        window.location.href = url.toString();
    }

    /* SAVE CLASS */

    classSelect.addEventListener("change", function () {

        localStorage.setItem(
            "selectedClass",
            this.value
        );
    });
}

 

const modal =
    document.getElementById("editModal");

/* OPEN MODAL */

document.querySelectorAll(".edit-btn")
.forEach(button => {

    button.addEventListener("click", function(){

        modal.style.display = "block";

        document.getElementById("editCls").value =
            this.dataset.cls;

        document.getElementById("editRoll").value =
            this.dataset.roll;

        document.getElementById("editName").value =
            this.dataset.name;

        document.getElementById("editPhone").value =
            this.dataset.phone;

        document.getElementById("editForm").action =
            "/edit/" + this.dataset.id;

        document.getElementById("deleteForm").action =
            "/delete/" + this.dataset.id;
    });

});

/* CLOSE MODAL */

function closeModal(){

    modal.style.display = "none";
}

/* OUTSIDE CLICK */

window.addEventListener("click", function(e){

    if(e.target === modal){

        closeModal();
    }
});
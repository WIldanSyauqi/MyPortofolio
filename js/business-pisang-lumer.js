/* =========================
           MOBILE MENU
        ========================== */

        const menuBtn = document.getElementById("menuBtn");
        const navLinks = document.getElementById("navLinks");

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });


        /* Close mobile menu after click */

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });

        });


        /* =========================
           YEAR
        ========================== */

        document.getElementById("year").textContent =
            new Date().getFullYear();


        /* =========================
           SCROLL REVEAL
        ========================== */

        const revealElements =
            document.querySelectorAll(".reveal");

        function revealOnScroll() {

            const windowHeight =
                window.innerHeight;

            revealElements.forEach(element => {

                const elementTop =
                    element.getBoundingClientRect().top;

                if (elementTop < windowHeight - 80) {

                    element.classList.add("active");

                }

            });

        }

        window.addEventListener(
            "scroll",
            revealOnScroll
        );

        revealOnScroll();


        /* =========================
           BEP CALCULATOR
        ========================== */

        function formatRupiah(number) {

            return new Intl.NumberFormat(
                "id-ID",
                {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                }
            ).format(number);

        }


        function calculateBEP() {

            const fixedCost =
                Number(
                    document.getElementById("fixedCost").value
                );

            const price =
                Number(
                    document.getElementById("price").value
                );

            const variableCost =
                Number(
                    document.getElementById("variableCost").value
                );


            const margin =
                price - variableCost;


            const result =
                document.getElementById("result");


            if (
                fixedCost <= 0 ||
                price <= 0 ||
                variableCost < 0
            ) {

                alert(
                    "Silakan masukkan angka yang valid."
                );

                return;

            }


            if (margin <= 0) {

                alert(
                    "Harga jual harus lebih besar daripada biaya variabel."
                );

                return;

            }


            const bepUnit =
                Math.ceil(
                    fixedCost / margin
                );


            const bepRupiah =
                bepUnit * price;


            document.getElementById(
                "bepUnit"
            ).textContent =
                bepUnit.toLocaleString("id-ID");


            document.getElementById(
                "bepRupiah"
            ).textContent =
                formatRupiah(bepRupiah);


            document.getElementById(
                "margin"
            ).textContent =
                formatRupiah(margin);


            result.style.display =
                "block";

        }

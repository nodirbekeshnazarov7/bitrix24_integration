$(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper_next",
            prevEl: ".swiper_prev",
        },
        simulateTouch: false, // Surish (drag) funksiyasini o'chirish
        on: {
            slideChange: function () {
                // Swiperni ekranning yuqorisiga ko'tarish
                window.scrollTo({
                    top: document.querySelector('.swiper_box').offsetTop, // Swiper box topi
                    behavior: 'smooth'
                });

                // H1 elementini pastga siljitish uchun swiper_box'ga sinf qo'shish
                document.querySelector('.swiper_box').classList.add('scrolled');
            }
        }
    });


    const modal = $("#callback-modal");
    const openModalBtn = $(".callback-button");
    const closeModalBtn = $(".close-btn");
    const body = $("body");

    // Modalni ochish
    openModalBtn.on("click", function () {
        modal.fadeIn();
        body.css("overflow", "hidden");
    });

    // Modalni yopish
    closeModalBtn.on("click", function () {
        modal.fadeOut();
        body.css("overflow", "");
    });

    // Modalni tashqarisiga bosilgan holatni tekshirish
    $(window).on("click", function (event) {
        if ($(event.target).is(modal)) {
            modal.fadeOut();
            body.css("overflow", "");
        }
    });



    $.fn.WBslider = function () {
        return this.each(function () {
            var $_this = $(this),
                $_input = $('input[type="range"]', $_this),
                $_current_value = $('.current-value', $_this),
                $_min_value = parseInt($('.min-value', $_this).text(), 10),
                $_max_value = parseInt($('.max-value', $_this).text(), 10),
                thumbWidth = 38; // Thumb kengligi

            // Min va Max qiymatlarni o'rnatish
            $_input.attr({
                min: $_min_value,
                max: $_max_value,
                step: 1,
            });

            // Slider qiymatini yangilash funksiyasi
            function updateSlider() {
                var val = parseInt($_input.val(), 10) || $_min_value;

                // Hozirgi qiymatni yangilash
                $_current_value.text(val);

                // Thumb pozitsiyasini hisoblash
                var sliderWidth = $_input[0].getBoundingClientRect().width; // Slider kengligi
                var pos = (val - $_min_value) / ($_max_value - $_min_value); // Thumb pozitsiyasi (0-1 oralig'ida)
                var offset = pos * (sliderWidth - thumbWidth) + thumbWidth / 2; // Thumbning markaziy pozitsiyasi

                // `current-value` ni markazlash va aniqlikni yaxshilash
                var currentWidth = $_current_value.outerWidth();
                var minOffset = thumbWidth / 2 - currentWidth / 2; // Min pozitsiya uchun hisob-kitob
                var maxOffset = sliderWidth - thumbWidth / 2 - currentWidth / 2; // Max pozitsiya uchun hisob-kitob
                var centeredOffset = Math.max(minOffset, Math.min(offset - currentWidth / 2, maxOffset)); // Cheklangan diapazon

                $_current_value.css({ left: `${centeredOffset}px` });

                // Track to'ldirishni yangilash
                var gradPos = Math.round(pos * 100); // Thumb pozitsiyasini foizga aylantirish
                var grad = `linear-gradient(90deg, rgb(56, 56, 56) ${gradPos}%, rgb(204, 204, 204) ${gradPos}%)`;
                $_input.css({ background: grad });
            }

            // Input qiymati o'zgarganda
            $_input.on('input change keyup', updateSlider);

            // Oyna qayta o'lchamlanganda
            $(window).on('resize', updateSlider);

            // Boshlang'ich holatni yangilash
            updateSlider();
        });
    };


    // Xatoliklar bilan modalni ko'rsatish
    function showCustomErrorModal(errors) {
        let errorList = $("#customErrorList");
        errorList.empty(); // Xatoliklarni tozalash

        // Har bir xatolikni ro'yxatga qo'shish
        errors.forEach(function (error) {
            errorList.append(`<li>${error}</li>`);
        });

        // Modalni ko'rsatish
        $("#customModalBackground, #customErrorModal").fadeIn();
    }

    // Form yuborish hodisasi
    $("#swpiper_submit_btn").on("click", function (e) {
        e.preventDefault(); // Form yuborilishini oldini olish

        // ma'lumotlarni yig'ish
        let data = []
        let question1 = "Сколько человек будет проживать и пользоваться канализацией?";
        let humansValue = $("#human_number").val();
        let isNotHumanVlaue = $("#agree_check1").val();
        let question1checkbox = "Есть ли у вас предпочтение по производителям септиков? (Можете выбрать несколько вариантов)";
        let question1checkboxVal1 = $("#custom-checkbox1").val();
        let question1checkboxVal2 = $("#custom-checkbox2").val();
        let question1checkboxVal3 = $("#custom-checkbox3").val();
        let question1checkboxVal4 = $("#custom-checkbox4").val();
        let question1checkboxVal5 = $("#custom-checkbox5").val();
        let question1checkboxVal6 = $("#custom-checkbox6").val();
        let question1checkboxVal7 = $("#custom-checkbox7").val();
        let question1checkboxVal8 = $("#custom-checkbox8").val();
        let question1checkboxVal9 = $("#custom-checkbox9").val();
        let question1checkboxVal10 = $("#custom-checkbox10").val();
        let question1checkboxVal11 = $("#custom-checkbox11").val();
        let question1checkboxVal12 = $("#custom-checkbox12").val();
        let question1checkboxVal13 = $("#custom-checkbox13").val();
        let question1checkboxVal14 = $("#custom-checkbox14").val();
        let question1checkboxVal15 = $("#custom-checkbox15").val();
        let question1checkboxVal16 = $("#custom-checkbox16").val();
        let septik_tanks = []

        // Checkboxlarni tekshirib, tanlanganlarini qiymatini olib, massivga qo'shamiz
        $(".button_checkboxs input[type='checkbox']:checked").each(function () {
            septik_tanks.push($(this).val());
        });

        // console.log(selectedValues);


        let question2 = "Укажите количество сантехнических точек?";
        let moyka = $("#moyka_number").val();
        let vanna = $("#vanna_number").val();
        let unitaz = $("#unitaz_number").val();
        let dishwasher_number = $("#dishwasher_number").val();
        let isNotMoykaVannaUnitaz = $("#agree_check2").val();

        let question3 = "Какой уровень грунтовых вод на вашем участке?";
        let question3radio = "Уровень грунтовых вод";
        let question3radioVal = $("input[name='question3']:checked").val();

        let question4 = "Планируете использовать канализацию круглогодично?";
        let question4radio = "Использование дома";
        let question4radioVal = $("input[name='question4']:checked").val();

        let question5 = "Куда будем отводить переработанные стоки?";
        let question5radio = "Отвод стока";
        let question5radioVal = $("input[name='question5']:checked").val();

        let question6 = "Когда установка септика?";
        let question6radio = "Когда установка";
        let question6radioVal = $("input[name='question6']:checked").val();

        let question7 = "Когда установка септика?";

        let question7radio = "Куда отправить";
        let question7radioVal = $("input[name='question7']:checked").val();
        let price1 = $("#price-checkbox1").val();
        let price2 = $("#price-checkbox2").val();
        let price3 = $("#price-checkbox3").val();
        let price4 = $("#price-checkbox4").val();
        let prices = []
        // Checkboxlarni tekshirib, tanlanganlarini qiymatini olib, massivga qo'shamiz
        $(".price-checkbox-group input[type='checkbox']:checked").each(function () {
            prices.push($(this).val());
        });

        // Telefon yoki messendjer maydoni tekshiruvi
        let title = $("#customer_name").val();
        let phone = $("#customer_phone").val();
        let name = $("#customer_name").val();
        data.push({
            question1: {
                humansNumber: humansValue ? humansValue : isNotHumanVlaue,
                septik_tank: septik_tanks
            }
        })
        data.push({
            question2: {
                washing: moyka || vanna || unitaz || dishwasher_number ? moyka : isNotMoykaVannaUnitaz,
                bath: moyka || vanna || unitaz || dishwasher_number ? vanna : isNotMoykaVannaUnitaz,
                toilet: moyka || vanna || unitaz || dishwasher_number ? unitaz : isNotMoykaVannaUnitaz,
                dishwasher: moyka || vanna || unitaz || dishwasher_number ? unitaz : dishwasher_number,
            }
        })
        data.push({
            question3: {
                groundwater_level: question3radioVal,
            }
        })
        data.push({
            question4: {
                home_use: question4radioVal
            }
        })
        data.push({
            question5: {
                drainage: question5radioVal
            }
        })
        data.push({
            question6: {
                installation_time: question6radioVal
            }
        })
        data.push({
            question7: {
                send_where: question7radioVal,
                price: prices
            }
        })
        let message = `
        Кол-во человек: ${data[0].question1.humansNumber};\n
        Есть ли у вас предпочтение по производителям септиков? (Можете выбрать несколько вариантов): ${data[0].question1.septik_tank};\n
        Раковина / мойка (шт.): ${data[1].question2.washing};\n
        Ванна, (шт.): ${data[1].question2.washing};\n
        Унитаз, (шт.): ${data[1].question2.toilet};\n
        Душ, (шт.): ${data[1].question2.bath};\n
        Стиральная / посудомойка (шт.): ${data[1].question2.dishwasher};\n
        Уровень грунтовых вод: ${data[2].question3.groundwater_level}; \n
        Использование дома: ${data[3].question4.home_use}; \n
        Отвод стока: ${data[4].question5.drainage}; \n
        Когда установка: ${data[5].question6.installation_time}; \n
        Выберите подарки: ${data[6].question7.price}; \n \n
        Куда отправить: *${data[6].question7.send_where}; \n
        Номер мессенджера или телефона *: ${phone};
        `
        let leadData = {
            TITLE: title,  // Custom title
            NAME: name,
            PHONE: phone,
            SEND_WHERE: question7radioVal,
            MESSAGE: message,
        }
        console.log('leadData:', leadData.TITLE, leadData.NAME, leadData.PHONE, leadData.MESSAGE);
        
        // xatolarni yi'g'ish
        let hasErrors = false;
        let errors = [];

        // "Куда отправить" maydoni tekshiruvi
        let destination = $("input[name='question7']:checked").val();
        if (!destination) {
            hasErrors = true;
            errors.push("Поле «Куда отправить:» обязательно для заполнения.");
        }


        if (!phone || !name) {
            hasErrors = true;
            errors.push("Поле «Номер мессенджера или телефона» обязательно для заполнения.");
        }
        // Xatoliklar bo'lsa, modal oynani ko'rsatish
        if (hasErrors) {
            showCustomErrorModal(errors);

            // Modalni ko'rsatish
            $("#modalBackground, #errorModal").fadeIn();
        } else {
            console.log("data", data);
            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: '/bitrix.php', // to'g'ri URLni ishlatish
                data: leadData,
                success: function (response) {
                    console.log('Natija:', response);  // PHP tomonidan qaytgan natija
                    alert('Lead yaratildi: ' + JSON.stringify(response));  // Natijani alert orqali ko'rsatish
                },
                error: function (xhr, status, error) {
                    console.error('Xatolik:', error);  // Xatolik haqida konsolda batafsil ma'lumot
                    console.log('Status:', status);    // Statusni konsolga chiqarish
                    console.log('Xatolik matni:', xhr.responseText);  // PHP tomonidan yuborilgan xatolik matnini ko'rsatish
                }
            });


            // window.location.href = "../../success.html";
        }
    });

    // Modalni yopish
    $("#customConfirmButton, #customModalBackground").on("click", function () {
        $("#customModalBackground, #customErrorModal").fadeOut();
    });

    // Sliderni boshlash
    $(function () {
        $('.slider').WBslider();
    });
});